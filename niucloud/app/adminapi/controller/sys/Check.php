<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\adminapi\controller\sys;

use app\service\core\check\CoreCheckService;
use core\base\BaseAdminController;
use think\Response;
use Throwable;

/**
 * 通用校验（场景化）
 *
 * 场景与校验项由 CheckSceneDict 定义，业务方只需带上 scene + params：
 * - stream：SSE 实时推送校验过程（首选）
 * - run   ：一次性返回结果（SSE 不可用时的降级通道）
 *
 * 注意：EventSource 不能自定义请求头，token / site-id 通过 query 传递
 * （Request::adminToken() / Request::adminSiteId() 已支持 query 回退）。
 *
 * @package app\adminapi\controller\sys
 */
class Check extends BaseAdminController
{
    /** 客户端断线后的重连间隔秒数（与站内信推送保持一致） */
    const SSE_RETRY = 3;

    /**
     * 场景校验清单（不执行检测）
     *
     * 供前端在连接 SSE 之前先渲染出完整的待校验列表，随后逐项点亮检测结果。
     * @return Response
     */
    public function meta(): Response
    {
        return success(( new CoreCheckService() )->meta($this->scene()));
    }

    /**
     * 一次性校验（降级通道）
     * @return Response
     */
    public function run(): Response
    {
        return success(( new CoreCheckService() )->run($this->scene(), $this->checkParams()));
    }

    /**
     * 流式校验（SSE）
     *
     * 事件约定：
     * - meta：校验清单（title / tip / items）
     * - item：单项状态（running / passed / failed，含 message、details）
     * - done：整体结果（passed、failed）
     * - failed：校验中断（异常信息）
     *
     * @return void
     */
    public function stream()
    {
        header('Content-Type: text/event-stream; charset=utf-8');
        header('Cache-Control: no-cache');
        header('Connection: keep-alive');
        // 关闭 nginx 缓冲，否则数据会被代理层攒着不下发
        header('X-Accel-Buffering: no');

        // 关闭压缩与输出缓冲：二者都会引入额外缓冲，导致校验过程无法实时下发
        @ini_set('zlib.output_compression', 'Off');
        @ini_set('output_buffering', 'Off');
        @ini_set('implicit_flush', 1);

        // 清空框架或插件可能已开启的输出缓冲（带计数上限，避免不可移除的缓冲导致卡死）
        $guard = 0;
        while (ob_get_level() > 0 && $guard++ < 20) {
            @ob_end_clean();
        }

        if (function_exists('set_time_limit')) {
            @set_time_limit(0);
        }

        echo 'retry: ' . ( self::SSE_RETRY * 1000 ) . "\n\n";

        // 首帧填充：用注释行撑开缓冲，同时作为前端「链路是否可用」的判据。
        //
        // 填充量说明：nginx 靠上面的 X-Accel-Buffering: no 即可实时下发，2KB 足够；
        // 但 Apache + mod_fcgid 不认该响应头，且其输出缓冲上限默认为 64KB
        // （FcgidOutputBufferSize），填充不足时整段响应会被攒到脚本结束才下发 ——
        // 浏览器侧表现为 0 B、一直 pending，最后被前端超时关闭（canceled）。
        // 故这里按 64KB 之上留余量填充，强制 mod_fcgid 溢出发送首帧。
        echo ': ' . str_repeat(' ', 70 * 1024) . "\n\n";
        @ob_flush();
        @flush();

        try {
            ( new CoreCheckService() )->stream(
                $this->scene(),
                $this->checkParams(),
                // 推帧回调返回「连接是否还在」：客户端关闭后立即停止后续校验
                fn (string $event, array $data): bool => $this->ssePush($event, $data)
            );
        } catch (Throwable $e) {
            // 任何异常都要让前端知道「这轮结束了、为什么结束」
            $this->ssePush('failed', [ 'message' => $e->getMessage() ]);
        }

        // SSE 直接结束输出，不走框架响应（避免被包装成 JSON）
        exit;
    }

    /**
     * 向 SSE 连接写入一帧数据
     * @return bool 连接是否仍然存活
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
     * 校验场景
     * @return string
     */
    private function scene(): string
    {
        return (string) $this->request->param('scene', '');
    }

    /**
     * 校验业务参数
     *
     * SSE 只能通过 query 传参，因此 params 允许是 JSON 字符串；普通请求也可直接传数组。
     * @return array
     */
    private function checkParams(): array
    {
        $raw = $this->request->param('params', []);
        if (is_array($raw)) return $raw;

        if (is_string($raw) && $raw !== '') {
            $decoded = json_decode($raw, true);
            return is_array($decoded) ? $decoded : [];
        }

        return [];
    }
}
