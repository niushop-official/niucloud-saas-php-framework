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

namespace addon\shop_fenxiao\app\dict\fenxiao;

/**
 * 分销商品
 */
class FenxiaoGoodsDict
{
    //计算方式
    const CALCULATE_TYPE_RATE = 1;//按照比率计算
    const CALCULATE_TYPE_MONEY = 2;//固定金额

    //商品是否赠品(0:否 1:是)
    const IS_GIFT = 1;
    const NOT_IS_GIFT = 0;

    /**
     * 计算方式
     * @param $type
     * @return array|mixed|string
     */
    public static function getCalculateType($type = ''){
        $list = [
            self::CALCULATE_TYPE_RATE => get_lang('dict_shop_fenxiao_goods_calculate_type.rate'),
            self::CALCULATE_TYPE_MONEY => get_lang('dict_shop_fenxiao_goods_calculate_type.money'),
        ];
        if (!$type) return $list;
        return $list[$type] ?? '';
    }
}
