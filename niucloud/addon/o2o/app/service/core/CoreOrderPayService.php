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

namespace addon\o2o\app\service\core;

use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\dict\order\OrderLogDict;
use addon\o2o\app\model\Order;
use addon\o2o\app\model\OrderItem;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 *  订单支付服务层
 */
class CoreOrderPayService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 订单已支付操作
     * @param $order_id
     * @return void
     */
    public function pay(array $data)
    {
        $order_id = $data['trade_id'];
        $where = [
            [
                'order_id', '=', $order_id
            ]
        ];
        $order = $this->model->where($where)->findOrEmpty();
        if ($order->isEmpty())
            throw new CommonException('O2O_ORDER_NOT_FOUND');//订单不存在

        // 状态判断
        if (!in_array($order->order_status, [OrderDict::WAIT_PAY, OrderDict::CLOSE])) throw new CommonException('O2O_ORDER_IS_PAY_FINISH');//订单支付
        $out_trade_no = $data['out_trade_no'] ?? '';
        $is_enable_refund = (new CoreOrderService())->checkOrderIsEnableRefund($order_id, 1);

        //订单状态变成已支付
        $order_data = array(
            'order_status' => OrderDict::DISPATCH,
            'pay_time' => time(),
            'out_trade_no' => $out_trade_no,
            'is_enable_refund' => $is_enable_refund,
            'check_code' => mt_rand(1000, 9999),
        );
        if($order->technician_id) {
            $order_data['dispatch_time'] = time();
            $order_data['order_status'] = OrderDict::WAIT_SERVICE;
        }

        $this->model->where($where)->update($order_data);
        //订单到达待派单状态
        $this->orderGoodsPay(['order_id' => $order_id, 'out_trade_no' => $out_trade_no]);

        $data['order_data'] = $order->toArray();
        $data['order_id'] = $order_id;
        //订单支付后操作
        event('AfterO2oOrderPay', $data);
        return true;
    }


    /**
     * 支付后订单操作
     * @param $data
     * @return true
     */
    public function orderGoodsPay($data)
    {
        //指定技师直接为待服务，否则为待派单
        $order_id = $data['order_id'];
        $is_enable_refund = (new CoreOrderService())->checkOrderIsEnableRefund($order_id, 1);
        $update_data = array(
            'is_enable_refund' => $is_enable_refund,
            'out_trade_no' => $data['out_trade_no'],
            'pay_time' => time()
        );

        $where = array(
            ['order_id', '=', $order_id],
        );
        (new OrderItem())->where($where)->update($update_data);

        return true;
    }


    /**
     * 订单项已支付操作
     * @param $order_id
     * @return void
     */
    public function itemPay(array $data)
    {
        $order_item_id = $data['trade_id'];
        $where = [
            [
                'order_item_id', '=', $order_item_id
            ]
        ];
        $order = (new OrderItem())->where($where)->findOrEmpty();
        if ($order->isEmpty())
            throw new CommonException('O2O_ORDER_NOT_FOUND');//订单不存在

        if ($order->pay_time > 0) throw new CommonException('O2O_ORDER_IS_PAY_FINISH');//订单支付
        $out_trade_no = $data['out_trade_no'] ?? '';

        //订单状态变成已支付
        $order_data = array(
            'pay_time' => time(),
            'out_trade_no' => $out_trade_no,
        );
        (new OrderItem())->where($where)->update($order_data);

        (new CoreOrderLogService())->addLog($order->site_id, $order->order_id, OrderLogDict::ORDER_ITEM_PAY, 'member', $order->member_id, OrderDict::getStatus(OrderDict::IN_SERVICE));

        CoreStatService::addStat($order->site_id, ['item_order_num' => 1, 'item_order_money' => $order->item_money ?? 0 ]);

        return true;
    }

}
