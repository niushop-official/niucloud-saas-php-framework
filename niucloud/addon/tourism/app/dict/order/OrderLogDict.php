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

/**
 * 订单日志相关字典类
 * Class HotelOrderDict
 * @package app\dict\order
 */
class OrderLogDict
{
    const ORDER_CREATE = 'order_create';
    const ORDER_PAY = 'order_pay';
    const ORDER_OVERTIME = 'order_overtime';
    const ORDER_CANCEL = 'order_cancel';
    const ORDER_VERIFY = 'order_verify';
    const ORDER_OVERSOLD = 'order_oversold';

    public static function getLogAction(string $action) {
        $actions = [
            self::ORDER_CREATE => get_lang('dict_tourism_order_log.order_create'),
            self::ORDER_PAY => get_lang('dict_tourism_order_log.order_pay'),
            self::ORDER_OVERTIME => get_lang('dict_tourism_order_log.order_overtime'),
            self::ORDER_CANCEL => get_lang('dict_tourism_order_log.order_cancel'),
            self::ORDER_VERIFY => get_lang('dict_tourism_order_log.order_verify'),
            self::ORDER_OVERSOLD => get_lang('dict_tourism_order_log.order_oversold')
        ];
        return $actions[ $action ] ?? '';
    }
}
