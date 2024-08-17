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
 * 会员签到类型枚举类
 * Class MemberDict
 */
class MemberSignTypeDict
{

    const DAY = 1;
    const CONTINUE = 2;

    /**
     * 签到类型
     * @return array
     */
    public static function getType()
    {
        return [
            self::DAY => get_lang('dict_member_sign_award.type_day'),//日签
            self::CONTINUE => get_lang('dict_member_sign_award.type_continue'),//连签
        ];
    }
}