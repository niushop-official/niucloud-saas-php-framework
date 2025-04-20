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

namespace addon\shop_fenxiao\app\dict\sale;

/**
 * 任务
 */
class SaleDict
{
    //活动状态（待开始）
    const MONTH = 'month';
    //活动状态（进行中）
    const QUARTER = 'quarter';
    //活动状态（完成）
    const YEAR = 'year';

    /**
     * 结算周期
     * @param $type
     * @return array|mixed|string
     */
    public static function getPeriodType($type = ''){
        $list = [
            self::MONTH => get_lang('dict_shop_fenxiao_sale_period_type.month'),
            self::QUARTER => get_lang('dict_shop_fenxiao_sale_period_type.quarter'),
            self::YEAR => get_lang('dict_shop_fenxiao_sale_period_type.year'),
        ];
        if (!$type) return $list;
        return $list[$type] ?? '';
    }

    const ACTIVE = 'active';//手动发放
    const AUTO = 'auto';//自动发放

    /**
     * 结算方式
     * @param $type
     * @return array|mixed|string
     */
    public static function getSendType($type = ''){
        $list = [
            self::ACTIVE => get_lang('dict_shop_fenxiao_sale_send_type.active'),
            self::AUTO => get_lang('dict_shop_fenxiao_sale_send_type.auto'),
        ];
        if (!$type) return $list;
        return $list[$type] ?? '';
    }

}
