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


use app\dict\pay\PayDict;

/**
 * 支付异步回调事件
 */
class PayTypeByTrade
{
    public function handle(array $pay_info)
    {
        $trade_type = $pay_info[ 'trade_type' ] ?? '';
        $pay_type_list = $pay_info[ 'pay_type_list' ] ?? '';
        //充值订单不支持余额支付
        if (!empty($pay_type_list) && $trade_type == 'recharge') {
            unset($pay_type_list[ PayDict::BALANCEPAY ]);
        }
        return $pay_type_list;
    }
}
