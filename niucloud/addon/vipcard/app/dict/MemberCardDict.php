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

namespace addon\vipcard\app\dict;

/**
 * 会员卡项相关字典类
 * Class MemberCardDict
 */
class MemberCardDict
{
    CONST WAIT_USE = 'wait_use';

    CONST USED = 'used';

    const REFUNDED = 'refunded';

    public static function getStatus($status = '')
    {
        $data = [
            self::WAIT_USE => [
                'name' => get_lang('dict_vipcard_membercard_status.wait_use'),
                'status' => self::WAIT_USE,
            ],
            self::USED => [
                'name' => get_lang('dict_vipcard_membercard_status.used'),
                'status' => self::USED,
            ],
            self::REFUNDED => [
                'name' => get_lang('dict_vipcard_membercard_status.refunded'),
                'status' => self::REFUNDED,
            ]
        ];

        if ($status == '') {
            return $data;
        }
        return $data[ $status ] ?? '';
    }
}