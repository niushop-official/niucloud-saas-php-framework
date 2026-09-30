<?php
/**
 * 站内信模板
 *
 * 每个键对应 app/dict/notice/notice.php（或插件 addon/{key}/app/dict/notice/notice.php）中的消息模板 key。
 * 只有当该模板在后台开启了「站内信」开关（sys_notice.is_message）时才会写入站内信。
 * 分类取值见 NoticeMessageDict。
 *
 * 业务插件可新增 addon/{key}/app/dict/notice/message.php 自动并入（core\dict\Notice 会扫描合并）。
 */
return [
    // 示例：
    // 'member_verify_code' => [
    //     'title' => '验证码通知',
    //     'content' => '您的验证码为：{code}',
    //     'category' => NoticeMessageDict::OTHER,
    //     'sub_category' => NoticeMessageDict::ACCOUNT_NOTICE,
    // ],
];
