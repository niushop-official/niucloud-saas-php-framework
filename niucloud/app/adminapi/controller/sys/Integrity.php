<?php
declare(strict_types=1);

namespace app\adminapi\controller\sys;

use app\service\admin\sys\IntegrityService;
use core\base\BaseAdminController;
use think\Response;
use Throwable;

/**
 * 代码完整性检测
 *
 * @package app\adminapi\controller\sys
 */
class Integrity extends BaseAdminController
{
    /** 客户端断线后的重连间隔秒数（下发给浏览器的 retry 指令，与站内信推送保持一致） */
    const SSE_RETRY = 3;

    /**
     * 目标列表（含版本与清单状态）
     */
    public function targets(): Response
    {
        return success((new IntegrityService())->getTargets(
            $this->paramString('algorithm'),
            $this->paramBool('is_bom'),
            $this->paramBool('is_crlf_lf')
        ));
    }

    /**
     * 可选算法
     */
    public function algorithms(): Response
    {
        return success((new IntegrityService())->getAlgorithms());
    }

    /**
     * 页面配置（默认算法 / 分片大小 / 产品 / 版本 / 清单根目录 / 当前规则）
     */
    public function config(): Response
    {
        return success((new IntegrityService())->getConfig());
    }

    /**
     * 单个目标的清单状态
     */
    public function baselineStatus(): Response
    {
        $target = (string) $this->request->param('target', '');

        return success((new IntegrityService())->getBaselineStatus(
            $target,
            $this->paramString('algorithm'),
            $this->paramBool('is_bom'),
            $this->paramBool('is_crlf_lf')
        ));
    }

    /**
     * 分片检测
     */
    public function check(): Response
    {
        $path = (string) $this->request->param('path', '');

        return success((new IntegrityService())->check(
            (string) $this->request->param('target', ''),
            $path !== '' ? $path : null,
            $this->paramString('algorithm'),
            $this->paramBool('is_bom'),
            $this->paramBool('is_crlf_lf'),
            (int) $this->request->param('cursor', 0)
        ));
    }

    /**
     * 流式检测（SSE）
     *
     * 参数与 check() 完全一致，区别是结果变成「一条流」：检测过程中陆续下发进度、
     * 执行记录、差异明细，最后下发 done。前端用 EventSource 连接，打开弹框就能看到
     * 进度在走；连不上或拿不到首帧时，前端会自动退回 check() 分片模式（见 getIntegrityStreamUrl 的调用处）。
     *
     * 注意：EventSource 不能自定义请求头，token / site-id 通过 query 传递
     * （Request::adminToken() / Request::adminSiteId() 已支持 query 回退）。
     *
     * @return void
     */
    public function stream()
    {
        // SSE 响应头（与 notice/message/stream 同一套写法）
        header('Content-Type: text/event-stream; charset=utf-8');
        header('Cache-Control: no-cache');
        header('Connection: keep-alive');
        // 关闭 nginx 缓冲，否则数据会被代理层攒着不下发
        header('X-Accel-Buffering: no');

        // 关闭压缩与输出缓冲：二者都会引入额外缓冲，导致进度无法实时下发
        @ini_set('zlib.output_compression', 'Off');
        @ini_set('output_buffering', 'Off');
        @ini_set('implicit_flush', 1);

        // 清空框架或插件可能已开启的输出缓冲。
        // 加计数上限：若存在不可移除的缓冲区，ob_end_clean() 会一直失败，
        // 无上限的 while 会让请求卡死在这里。
        $guard = 0;
        while (ob_get_level() > 0 && $guard++ < 20) {
            @ob_end_clean();
        }

        // 全量检测（框架目标可能上万文件）耗时较长，不能受脚本超时限制
        if (function_exists('set_time_limit')) {
            @set_time_limit(0);
        }

        echo 'retry: ' . (self::SSE_RETRY * 1000) . "\n\n";

        // 首帧填充：用注释行（以冒号开头，SSE 规范里客户端会忽略）撑开缓冲。
        //
        // 这一帧同时是前端「链路是否可用」的判据：收不到就降级走分片接口。
        // 填充量按 Apache + mod_fcgid 的输出缓冲上限（FcgidOutputBufferSize 默认 64KB）
        // 之上留余量 —— 该环境不认 X-Accel-Buffering（nginx 专用），填充不足时
        // 响应会被攒到脚本结束才下发，浏览器侧表现为 0 B 且一直 pending。
        echo ': ' . str_repeat(' ', 70 * 1024) . "\n\n";
        @ob_flush();
        @flush();

        $path = (string) $this->request->param('path', '');

        try {
            (new IntegrityService())->stream(
                (string) $this->request->param('target', ''),
                $path !== '' ? $path : null,
                $this->paramString('algorithm'),
                $this->paramBool('is_bom'),
                $this->paramBool('is_crlf_lf'),
                // 推帧回调返回「连接是否还在」：客户端关掉弹框就立刻停手
                fn (string $event, array $data): bool => $this->ssePush($event, $data)
            );
        } catch (Throwable $e) {
            // 任何异常都必须让前端知道「这轮结束了、为什么结束」，否则它会一直等下去
            $this->ssePush('failed', ['message' => $e->getMessage()]);
        }

        // SSE 直接结束输出，不走框架响应（避免被包装成 JSON）
        exit;
    }

    /**
     * 向 SSE 连接写入一帧数据
     *
     * @return bool 连接是否仍然存活（false = 客户端已断开，调用方应停止后续工作）
     */
    private function ssePush(string $event, array $data): bool
    {
        echo "event: {$event}\n";
        echo 'data: ' . json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES) . "\n\n";

        @ob_flush();
        @flush();

        return !connection_aborted();
    }

    /**
     * 单个文件的文本比对（官方 vs 本地）
     */
    public function fileDiff(): Response
    {
        return success((new IntegrityService())->getFileDiff(
            (string) $this->request->param('target', ''),
            (string) $this->request->param('file', ''),
            $this->paramString('algorithm'),
            $this->paramBool('is_bom'),
            $this->paramBool('is_crlf_lf')
        ));
    }

    /**
     * 用官方内容写回本地文件（覆盖前逐文件备份）
     */
    public function restore(): Response
    {
        $files = $this->request->param('files', []);

        return success((new IntegrityService())->restoreFiles(
            (string) $this->request->param('target', ''),
            is_array($files) ? $files : [],
            $this->paramString('algorithm'),
            $this->paramBool('is_bom'),
            $this->paramBool('is_crlf_lf')
        ));
    }

    /**
     * 取字符串参数；空字符串视为「没传」
     */
    private function paramString(string $name): ?string
    {
        $value = $this->request->param($name, '');

        return ($value === null || trim((string) $value) === '') ? null : trim((string) $value);
    }

    /**
     * 取布尔参数；没传返回 null（交给服务层用配置默认值）
     * 前端传 1/0、"1"/"0"、true/false 都按这个规则归一
     */
    private function paramBool(string $name): ?bool
    {
        $value = $this->request->param($name, null);

        if ($value === null || $value === '') {
            return null;
        }

        return (bool) (int) $value;
    }
}
