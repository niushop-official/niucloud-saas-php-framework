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

namespace addon\recharge\app\listener\pay;

use addon\recharge\app\dict\RechargeOrderDict;
use app\dict\pay\PayDict;
use core\exception\CommonException;
use addon\recharge\app\service\core\CoreRechargeOrderService;

/**
 * 支付单据创建事件
 */
class PayCreateListener
{
    public function handle(array $params)
    {
        $trade_type = $params[ 'trade_type' ] ?? '';
        if ($trade_type == 'recharge') {
            $trade_id = $params[ 'trade_id' ];
            $order_info = ( new CoreRechargeOrderService() )->orderInfo($trade_id);
            if ($order_info[ 'order_status' ] != RechargeOrderDict::WAIT_PAY) throw new CommonException('ONLY_PAYING_CAN_PAY');
            //添加订单支付表
            return [
                'main_type' => PayDict::MEMBER,
                'main_id' => $order_info[ 'member_id' ],//买家id
                'money' => $order_info[ 'order_money' ],//订单金额
                'trade_type' => 'recharge',//业务类型
                'trade_id' => $trade_id,
                'body' => get_lang("dict_order.trade_type_recharge")
            ];
        }

    }
}
