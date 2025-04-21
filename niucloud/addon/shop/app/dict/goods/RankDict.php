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

class RankDict
{

    // 排行周期 day=天，week=周，month=月, quarter=季度
    const DAY = 'day';
    const WEEK = 'week';
    const MONTH = 'month';
    const QUARTER = 'quarter';

    // 来源类型 all=全部，goods=指定商品，category=指定分类，brand=指定品牌, label=指定标签
    const ALL = 'all';
    const GOODS = 'goods';
    const CATEGORY = 'category';
    const BRAND = 'brand';
    const LABEL = 'label';

    // 排序规则 sale=按照销量，collect=按收藏数，evaluate=按评价数, access=按照浏览量
    const SALE = 'sale';
    const COLLECT = 'collect';
    const EVALUATE = 'evaluate';
    const ACCESS = 'access';

    // 状态（0：关闭，1：开启）
    const ON = 1;
    const OFF = 0;


    /**
     * 排行周期
     * @param $type
     * @return array|mixed|string
     */
    public static function getRankType($type = '')
    {
        $data = [
            self::DAY => get_lang('dict_shop_goods_rank_rank_type.day'), // 天
            self::WEEK => get_lang('dict_shop_goods_rank_rank_type.week'), // 周
            self::MONTH => get_lang('dict_shop_goods_rank_rank_type.month'), // 月
            self::QUARTER => get_lang('dict_shop_goods_rank_rank_type.quarter'), // 季度
        ];
        if (!$type) {
            return $data;
        }
        return $data[ $type ] ?? '';
    }

    /**
     * 来源类型
     * @param $type
     * @return array|mixed|string
     */
    public static function getGoodsSource($type = '')
    {
        $data = [
            self::ALL => get_lang('dict_shop_goods_rank_goods_source.all'), // 全部
            self::GOODS => get_lang('dict_shop_goods_rank_goods_source.goods'), // 指定商品
            self::CATEGORY => get_lang('dict_shop_goods_rank_goods_source.category'), // 指定分类
            self::BRAND => get_lang('dict_shop_goods_rank_goods_source.brand'), // 指定品牌
            self::LABEL => get_lang('dict_shop_goods_rank_goods_source.label'), // 指定标签
        ];
        if (!$type) {
            return $data;
        }
        return $data[ $type ] ?? '';
    }

    /**
     * 排序规则
     * @param $type
     * @return array|mixed|string
     */
    public static function getRuleType($type = '')
    {
        $data = [
            self::SALE => get_lang('dict_shop_goods_rank_rule_type.sale'), // 按销量
            self::COLLECT => get_lang('dict_shop_goods_rank_rule_type.collect'), // 按收藏数
            self::EVALUATE => get_lang('dict_shop_goods_rank_rule_type.evaluate'), // 按评价数
            self::ACCESS => get_lang('dict_shop_goods_rank_rule_type.access'), // 按浏览量
        ];
        if (!$type) {
            return $data;
        }
        return $data[ $type ] ?? '';
    }
}
