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

namespace addon\o2o\app\listener\pay;

use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\service\core\CoreOrderService;
use app\dict\pay\PayDict;
use core\exception\CommonException;

/**
 * 支付创建事件
 */
class PayCreateListener
{
    public function handle(array $params)
    {
        $trade_type = $params['trade_type'] ?? '';
        if (in_array($trade_type, [ OrderDict::ORDER_TYPE_ORDER])) {
            $order_info = (new CoreOrderService())->orderInfo($params['site_id'], $params['trade_id']);
            if ($order_info['order_status'] != OrderDict::WAIT_PAY) throw new CommonException('O2O_ONLY_WAIT_PAY_CAN_BE_PAY');
            //添加订单支付表
            return [
                'main_type' => PayDict::MEMBER,
                'main_id' => $order_info['member_id'],//买家id
                'money' => $order_info['order_money'],//订单金额
                'trade_type' => $trade_type,//业务类型
                'trade_id' => $params['trade_id'],
                'body' => $order_info['order_name'],
            ];
        }

        if (in_array($trade_type, [ OrderDict::ORDER_TYPE_ITEM])) {
            $item_info = (new CoreOrderService())->orderItemInfo($params['site_id'], $params['trade_id']);
            if (empty($item_info) || $item_info['pay_time'] > 0) throw new CommonException('O2O_ONLY_WAIT_PAY_CAN_BE_PAY');
            //添加订单支付表
            return [
                'main_type' => PayDict::MEMBER,
                'main_id' => $item_info['member_id'],//买家id
                'money' => $item_info['item_money'],//订单金额
                'trade_type' => $trade_type,//业务类型
                'trade_id' => $params['trade_id'],
                'body' => $item_info['item_name'],
            ];
        }

    }
}
