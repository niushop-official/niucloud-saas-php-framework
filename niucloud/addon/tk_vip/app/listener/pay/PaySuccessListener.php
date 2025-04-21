<?php

// +----------------------------------------------------------------------
// | Author: addon888
// +----------------------------------------------------------------------

namespace addon\tk_vip\app\listener\pay;


use addon\tk_vip\app\dict\order\OrderDict;
use addon\tk_vip\app\service\api\OrderService;

/**
 * 支付异步回调事件
 */
class PaySuccessListener
{
    public function handle(array $pay_info)
    {
        $trade_type = $pay_info['trade_type'] ?? '';
        if ($trade_type == OrderDict::getOrderType()['type']) {
            (new OrderService())->paySuccess($pay_info);
        }
    }
}