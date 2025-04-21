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

namespace addon\shop\app\service\core\order;

use addon\shop\app\dict\order\OrderDeliveryDict;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
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
     * @param array $data
     * @return void
     */
    public function pay(array $data)
    {
        $order_id = $data[ 'trade_id' ];
        $where = [
            [
                'order_id', '=', $order_id
            ]
        ];
        $order = $this->model->where($where)->findOrEmpty();
        if ($order->isEmpty())
            throw new CommonException('SHOP_ORDER_NOT_FOUND');//订单不存在

        //todo 状态判断
        if (!in_array($order[ 'status' ], [ OrderDict::WAIT_PAY, OrderDict::CLOSE ])) throw new CommonException('SHOP_ORDER_IS_PAY_FINISH');//订单支付
        $out_trade_no = $data[ 'out_trade_no' ] ?? '';
        //订单状态变成已支付
        $order_data = array(
            'status' => OrderDict::WAIT_DELIVERY,
            'pay_time' => time(),
            'timeout' => 0,
            'out_trade_no' => $out_trade_no,
            'is_enable_refund' => 1,
        );
        $this->model->where($where)->update($order_data);

        //订单到达待发货状态
        $this->orderGoodsPay([ 'order_id' => $order_id, 'site_id' => $order[ 'site_id' ] ]);

        $data[ 'order_data' ] = $order->toArray();
        $data[ 'order_id' ] = $order_id;

//        event('AfterShopOrderPay', $data);
        //订单支付操作
        CoreOrderEventService::orderPay($data);
        //订单支付后操作
        CoreOrderEventService::orderPayAfter($data);
        return true;
    }


    /**
     * 订单项支付操作
     * @param $data
     * @return true
     */
    public function orderGoodsPay($data)
    {
        $order_id = $data[ 'order_id' ];
        $site_id = $data[ 'site_id' ];
        $update_data = [
            'delivery_status' => OrderDeliveryDict::WAIT_DELIVERY,
            'is_enable_refund' => 1
        ];
        $where = [
            [ 'order_id', '=', $order_id ]
        ];
        ( new OrderGoods() )->where($where)->update($update_data);
        return true;
    }

    /**
     * to待配送状态
     * @param $data
     * @return void
     */
    public function toDelivery($data)
    {
        //todo 根据订单项类判断各个商品的配送操作

    }
}
