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

namespace addon\shop\app\dict\goods;

class StatisticsDict
{

    // 统计类型 access_num=访问次数（浏览量） cart_num=>加入购物车数量 sale_num=商品销量（下单数）pay_num=支付件数 collect_num=收藏数量 pay_money=支付总金额
    const ACCESS_NUM = 'access_num';
    const CART_NUM = 'cart_num';
    const SALE_NUM = 'sale_num';
    const PAY_NUM = 'pay_num';
    const COLLECT_NUM = 'collect_num';
    const PAY_MONEY = 'pay_money';
    const GOODS_VISIT_MEMBER_COUNT = 'goods_visit_member_count';

    /**
     * 排行周期
     * @param $type
     * @return array|mixed|string
     */
    public static function getType($type = '')
    {
        $data = [
            self::ACCESS_NUM => get_lang('dict_shop_goods_statistics_type.access_num'), // 访问次数（浏览量）
            self::GOODS_VISIT_MEMBER_COUNT => get_lang('dict_shop_goods_statistics_type.goods_visit_member_count'), // 访客数
            self::CART_NUM => get_lang('dict_shop_goods_statistics_type.cart_num'), // 加入购物车数量
            self::SALE_NUM => get_lang('dict_shop_goods_statistics_type.sale_num'), // 商品销量（下单数）
            self::PAY_NUM => get_lang('dict_shop_goods_statistics_type.pay_num'), // 支付件数
            self::PAY_MONEY => get_lang('dict_shop_goods_statistics_type.pay_money'), // 支付总金额
            self::COLLECT_NUM => get_lang('dict_shop_goods_statistics_type.collect_num'), // 收藏数量
        ];
        if (!$type) {
            return $data;
        }
        return $data[ $type ] ?? '';
    }

}
