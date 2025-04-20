<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\recharge\app\dict\member;


/**
 * 会员账户类型
 * Class MemberAccountTypeDict
 * @package app\dict\member
 */
class MemberAccountTypeDict
{
    //会员积分
    public const POINT = 'point';
    //会员余额
    public const BALANCE = 'balance';

    public static function getType($type = '')
    {
        $data = [
            self::POINT => get_lang('dict_member.account_point'),
            self::BALANCE => get_lang('dict_member.account_balance'),
        ];
        if (empty($type)) {
            return $data;
        }
        return $data[$type] ?? '';
    }

}
