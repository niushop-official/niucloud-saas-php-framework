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

namespace app\adminapi\controller\notice;

use app\service\admin\notice\NoticeMessageService;
use app\service\core\notice\CoreNoticeMessageService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 站内信控制层
 * Class NoticeMessage
 * @package app\adminapi\controller\notice
 */
class NoticeMessage extends BaseAdminController
{
    /** SSE 单条连接最长存活秒数，到期后服务端关闭，客户端自动重连 */
    const SSE_MAX_ALIVE = 300;

    /** SSE 心跳间隔秒数：保活，并让客户端判断链路是否正常 */
    const SSE_HEARTBEAT = 15;

    /** 客户端断线后的重连间隔秒数（下发给浏览器的 retry 指令） */
    const SSE_RETRY = 3;

    /**
     * 消息分类树
     * @return Response
     */
    public function category()
    {
        return success(data: (new NoticeMessageService())->getCategoryTree());
    }

    /**
     * 消息列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['category', ''],
            ['sub_category', ''],
            ['is_read', ''],
            ['level', ''],
            ['title', ''],
        ]);
        return success(data: (new NoticeMessageService())->getPage($data));
    }

    /**
     * 消息详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success(data: (new NoticeMessageService())->getInfo($id));
    }

    /**
     * 各分类未读数量
     * @return Response
     */
    public function unreadCount()
    {
        return success(data: (new NoticeMessageService())->getUnreadCount());
    }

    /**
     * 标记已读（ids 为空表示全部已读）
     * @return Response
     */
    public function markRead()
    {
        $data = $this->request->params([
            ['ids', []],
        ]);
        (new NoticeMessageService())->markRead($data['ids']);
        return success('SUCCESS');
    }

    /**
     * 删除消息
     * @return Response
     */
    public function del()
    {
        $data = $this->request->params([
            ['ids', []],
        ]);
        (new NoticeMessageService())->del($data['ids']);
        return success('SUCCESS');
    }

    /**
     * 长轮询监听消息变化
     *
     * 请求参数：version（上次返回的版本号，首次为空）
     * 返回：changed 为 true 时携带最新未读数与消息快照，false 表示本轮无变化
     *
     * @return Response
     */
    public function listen()
    {
        $data = $this->request->params([
            ['version', ''],
        ]);
        $res = (new NoticeMessageService())->listen((string)$data['version']);
        return success(data: $res);
    }

    /**
     * SSE 消息推送流（首选方案）
     *
     * 客户端使用 EventSource 连接，服务端保持连接并在消息版本变化时主动下发快照。
     * 注意：EventSource 无法自定义请求头，token 与 site-id 通过 query 参数传递
     * （Request::adminToken() / Request::adminSiteId() 已支持 query 回退）。
     *
     * @return void
     */
    public function stream()
    {
        // SSE 响应头
        header('Content-Type: text/event-stream; charset=utf-8');
        header('Cache-Control: no-cache');
        header('Connection: keep-alive');
        // 关闭 nginx 缓冲，否则数据会被代理层攒着不下发
        header('X-Accel-Buffering: no');

        // 关闭压缩与输出缓冲：二者都会引入额外缓冲，导致数据无法实时下发
        @ini_set('zlib.output_compression', 'Off');
        @ini_set('output_buffering', 'Off');
        @ini_set('implicit_flush', 1);

        // 清空框架或插件可能已开启的输出缓冲。
        // 加计数上限：若存在不可移除的缓冲区，ob_end_clean() 会一直失败，
        // 无上限的 while 会让请求卡死在这里（外部表现同样是 nginx 60 秒读超时）。
        $guard = 0;
        while (ob_get_level() > 0 && $guard++ < 20) {
            @ob_end_clean();
        }

        // 长连接不限制执行时间（需确认 set_time_limit 未被 disable_functions 禁用）
        if (function_exists('set_time_limit')) {
            @set_time_limit(0);
        }

        $service = new NoticeMessageService();

        // 断线重连间隔（毫秒），浏览器 EventSource 自动重连时使用
        echo 'retry: ' . (self::SSE_RETRY * 1000) . "\n\n";

        // 首帧填充：用注释行（以冒号开头，SSE 规范中客户端会忽略）撑开缓冲。
        //
        // 填充量按 Apache + mod_fcgid 的输出缓冲上限（FcgidOutputBufferSize 默认 64KB）
        // 之上留余量 —— 该环境不认 X-Accel-Buffering（nginx 专用），填充不足时
        // 响应会被攒到脚本结束才下发，浏览器侧表现为 0 B 且一直 pending。
        echo ': ' . str_repeat(' ', 70 * 1024) . "\n\n";
        @ob_flush();
        @flush();

        $deadline = time() + self::SSE_MAX_ALIVE;
        $last_version = '';
        $ticks = 0;

        while (true) {
            // 客户端断开（关闭页面 / 网络中断）时立即释放 FPM 进程
            if (connection_aborted()) {
                break;
            }
            // 到期主动关闭，由客户端重连，避免长连接长期占用与内存累积
            if (time() >= $deadline) {
                break;
            }

            $version = $service->getVersion();

            if ($version !== $last_version) {
                $last_version = $version;
                $this->ssePush('message', $service->getSnapshot());
                $ticks = 0;
            } elseif (++$ticks >= self::SSE_HEARTBEAT) {
                // 心跳：保持连接存活，并让客户端据此判断链路是否正常
                $ticks = 0;
                $this->ssePush('ping', ['server_time' => time()]);
            }

            sleep(CoreNoticeMessageService::LISTEN_INTERVAL);
        }

        // SSE 直接结束输出，不走框架响应（避免被包装成 JSON）
        exit;
    }

    /**
     * 向 SSE 连接写入一帧数据
     * @param string $event
     * @param array|string $data
     * @return void
     */
    private function ssePush(string $event, array|string $data): void
    {
        $payload = is_array($data)
            ? json_encode($data, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES)
            : (string)$data;

        echo "event: {$event}\n";
        echo 'data: ' . str_replace("\n", "\ndata: ", $payload) . "\n\n";

        @ob_flush();
        @flush();
    }
}
