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

namespace addon\shop\app\dict\coupon;

class CouponMemberDict
{
    //待使用
    const WAIT_USE = 1;
    //已使用
    const USED = 2;
    //已过期
    const EXPIRE = 3;
    //已失效
    const INVALID = 4;


    /**
     * 会员优惠券状态
     * @param $status
     * @return array|mixed|string
     */
    public static function getStatus($status = ''){
        $list = [
            self::WAIT_USE => get_lang('dict_shop_member_coupon.wait_use'),
            self::USED => get_lang('dict_shop_member_coupon.used'),
            self::EXPIRE => get_lang('dict_shop_member_coupon.expire'),
            self::INVALID => get_lang('dict_shop_member_coupon.invalid'),
        ];
        if ($status == '') return $list;
        return $list[$status] ?? '';
    }
}
