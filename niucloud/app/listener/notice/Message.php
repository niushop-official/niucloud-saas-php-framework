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

namespace app\listener\notice;

use app\dict\notice\NoticeMessageDict;
use app\dict\notice\NoticeTypeDict;
use app\service\core\notice\CoreNoticeLogService;
use app\service\core\notice\CoreNoticeMessageService;
use core\exception\NoticeException;

/**
 * 站内信通道：监听 Notice 事件，把开启站内信的模板写入 sys_notice_message
 */
class Message
{

    public function handle(array $data)
    {
        $site_id = (int)($data['site_id'] ?? 0);
        $template = $data['template'];//模板
        $vars = $data['vars'];//模板变量
        $key = $data['key'];
        $to = $data['to'];//发送对象

        if (empty($template['is_message'])) {
            return true;
        }
        if (empty($template['message'])) {
            return true;
        }

        $title = $template['message']['title'] ?? '';
        $content = $template['message']['content'] ?? '';
        foreach ($vars as $k => $v) {
            $content = str_replace("{{$k}}", $v, $content);
            $title = str_replace("{{$k}}", $v, $title);
        }

        // 接收主体：默认按站点推导（平台端 admin/0，站点端 site/site_id），
        // 模板监听器可通过 to.main_id / to.main_type 指定其它主体（如会员端）
        $main_id = (int)($to['main_id'] ?? $site_id);
        $main_type = (string)($to['main_type'] ?? ($site_id > 0 ? NoticeMessageDict::SITE : NoticeMessageDict::ADMIN));

        $nickname = $to['nickname'] ?? '';

        $log_data = [
            'key' => $key,
            'notice_type' => NoticeTypeDict::MESSAGE,
            'uid' => $to['uid'] ?? 0,
            'member_id' => $to['member_id'] ?? 0,
            'nickname' => $nickname,
            'receiver' => $main_id,
            'params' => $vars,
            'content' => $content,
            'result' => ''
        ];

        try {
            (new CoreNoticeMessageService())->add([
                'main_id' => $main_id,
                'main_type' => $main_type,
                'category' => $template['message']['category'] ?? NoticeMessageDict::OTHER,
                'sub_category' => $template['message']['sub_category'] ?? NoticeMessageDict::SYSTEM_NOTICE,
                'key' => $key,
                'title' => $title,
                'content' => $content,
                'level' => $template['message']['level'] ?? NoticeMessageDict::LEVEL_INFO,
                'params' => $vars,
                'trade_id' => $vars['trade_id'] ?? 0,
                'trade_type' => $vars['trade_type'] ?? ''
            ]);
            (new CoreNoticeLogService())->add($site_id, $log_data);
        } catch (NoticeException $e) {
            $log_data['result'] = $e->getMessage();
            (new CoreNoticeLogService())->add($site_id, $log_data);
            // 同步发送的场景需要把异常抛给调用方
            if (empty($template['async'])) {
                throw new NoticeException($e->getMessage());
            }
        }

        return true;
    }
}
