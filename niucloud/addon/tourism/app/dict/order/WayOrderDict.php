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

namespace addon\tourism\app\dict\order;

use app\dict\pay\PayDict;

/**
 * 线路订单相关字典类
 * Class WayOrderDict
 * @package app\dict\order
 */
class WayOrderDict
{
    //订单类型
    const TYPE = 'way';

    /**
     * 订单类型以及名称
     * @return array
     */
    public static function getOrderType()
    {
        return [
            'type' => self::TYPE,
            'name' => get_lang('dict_tourism_order.order_type_way')
        ];
    }

}
