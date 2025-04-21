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

namespace addon\tourism\app\service\core\order\hotel;

use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\service\core\hotel\CoreHotelConfigService;
use addon\tourism\app\service\core\order\CoreOrderRefundService;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 订单维权流程
 * Class CoreRechargeOrderService
 * @package app\service\core\order
 */
class CoreHotelRefundService extends BaseCoreService
{
    /**
     * 申请退款
     * @param array $order
     * @return true
     */
    public function apply(array $order) {
        $hotel_config = (new CoreHotelConfigService())->getConfig($order['site_id']);

        $money = round($order['pay_money'] * ((100 - $hotel_config['refund_rate']) / 100), 2);
        if ($money <= 0) throw new CommonException('REFUND_MONEY_ERROR');

        $create_res = (new CoreOrderRefundService())->create([
            'site_id' => $order['site_id'],
            'order_id' => $order['order_id'],
            'out_trade_no' => $order['out_trade_no'],
            'member_id' => $order['member_id'],
            'money' => $money,
            'commission' => round($order['pay_money'] - $money),
            'order_type' => $order['order_type'],
            'source' => 'member',
        ]);

        return $create_res;
    }

    /**
     * 退款成功
     * @param array $refund_info
     * @return void
     */
    public function refundSuccess(array $refund_info) {
        $order = (new TourismOrder())->where([ ['order_id', '=', $refund_info['order_id'] ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');

        (new CoreHotelOrderService())->close($order);

        return true;
    }
}

