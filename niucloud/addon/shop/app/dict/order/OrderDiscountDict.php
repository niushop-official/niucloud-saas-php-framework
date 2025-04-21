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

namespace addon\shop\app\dict\order;


/**
 * 订单优惠相关枚举类
 */
class OrderDiscountDict
{
    //优惠
    const DISCOUNT = 'discount';
    //礼品
    const GIFT = 'gift';
    const COUPON = 'coupon';
    const POINT = 'point';

    /**
     * 订单优惠类型
     * @return array
     */
    public static function getType()
    {
        return [
            self::DISCOUNT => get_lang('dict_shop_order_discount.type_discount'),//优惠
            self::GIFT => get_lang('dict_shop_order_discount.type_gift'),//礼物
        ];
    }

    /**
     * 优惠类型
     * @return array
     */
    public static function getDiscountType()
    {
        return [
            self::COUPON => get_lang('dict_shop_order_discount.discount_type_coupon'),//优惠券
            self::POINT => get_lang('dict_shop_order_discount.discount_type_point'),//积分
        ];
    }

}
