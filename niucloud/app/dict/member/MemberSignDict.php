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

namespace app\dict\member;

/**
 * 会员签到状态枚举类
 * Class MemberDict
 */
class MemberSignDict
{

    const NOT_SIGN = 0;
    const SIGNED = 1;

    /**
     * 签到类型
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::NOT_SIGN => get_lang('dict_member_sign.status_not_sign'),//未签到
            self::SIGNED => get_lang('dict_member_sign.status_signed'),//已签到
        ];
    }
}