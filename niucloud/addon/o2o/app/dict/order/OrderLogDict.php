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

namespace addon\o2o\app\dict\order;

/**
 * 订单日志相关字典类
 * Class OrderLogDict
 * @package app\dict\order
 */
class OrderLogDict
{
    const ORDER_CREATE = 'order_create';
    const ORDER_PAY = 'order_pay';
    const ORDER_OVERTIME = 'order_overtime';
    const ORDER_CANCEL = 'order_cancel';
    const ORDER_DISPATCH = 'order_dispatch';
    const ORDER_SERVICE = 'order_service';
    const ORDER_TRANSFER = 'order_transfer';
    const ORDER_ADD_PAY = 'order_add_pay';
    const ORDER_DEL_PAY = 'order_del_pay';
    const ORDER_EDIT_PAY = 'order_edit_pay';
    const ORDER_ITEM_PAY = 'order_item_pay';
    const ORDER_FINISH = 'order_status_finish';
    const ORDER_REFUND = 'order_refund';

    public static function getLogAction(string $action) {
        $actions = [
            self::ORDER_CREATE => get_lang('dict_o2o_order_log.order_create'),
            self::ORDER_PAY => get_lang('dict_o2o_order_log.order_pay'),
            self::ORDER_OVERTIME => get_lang('dict_o2o_order_log.order_overtime'),
            self::ORDER_CANCEL => get_lang('dict_o2o_order_log.order_cancel'),
            self::ORDER_DISPATCH => get_lang('dict_o2o_order_log.order_dispatch'),
            self::ORDER_SERVICE => get_lang('dict_o2o_order_log.order_service'),
            self::ORDER_TRANSFER => get_lang('dict_o2o_order_log.order_transfer'),
            self::ORDER_ADD_PAY => get_lang('dict_o2o_order_log.order_add_pay'),
            self::ORDER_DEL_PAY => get_lang('dict_o2o_order_log.order_del_pay'),
            self::ORDER_EDIT_PAY => get_lang('dict_o2o_order_log.order_edit_pay'),
            self::ORDER_ITEM_PAY => get_lang('dict_o2o_order_log.order_item_pay'),
            self::ORDER_FINISH => get_lang('dict_o2o_order_log.order_status_finish'),
            self::ORDER_REFUND => get_lang('dict_o2o_order_log.order_refund'),
        ];
        return $actions[ $action ] ?? '';
    }
}
