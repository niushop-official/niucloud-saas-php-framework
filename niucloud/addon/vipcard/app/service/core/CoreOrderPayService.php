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

namespace addon\vipcard\app\service\core;

use addon\vipcard\app\dict\order\OrderDict;
use addon\vipcard\app\model\Order;
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
            throw new CommonException('VIPCARD_ORDER_NOT_EXIST');//订单不存在

        if (!in_array($order[ 'order_status' ], [ OrderDict::WAIT_PAY, OrderDict::CLOSE ])) throw new CommonException('VIPCARD_ORDER_IS_PAY_FINISH');//订单支付
        $out_trade_no = $data[ 'out_trade_no' ] ?? '';

        //订单状态变成已支付
        $order_data = array(
            'order_status' => OrderDict::FINISH,
            'pay_time' => time(),
            'out_trade_no' => $out_trade_no
        );
       $this->model->where($where)->update($order_data);
       return true;
    }

}
