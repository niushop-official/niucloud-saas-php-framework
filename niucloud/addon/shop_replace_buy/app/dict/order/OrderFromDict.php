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

namespace addon\shop_replace_buy\app\dict\order;


/**
 * 订单来源枚举类
 */
class OrderFromDict
{

    const REPLACE_BUY = 'replace_buy';

    /**
     * 获取订单来源
     * @param string $type
     * @return array|array[]|string
     */
    public static function getOrderFrom(string $type = '')
    {
        $data = [
            self::REPLACE_BUY => get_lang('order_from.replace_buy'),//'代客下单'
        ];
        if (!$type) {
            return $data;
        }
        return $data[$type] ?? '';
    }

}
