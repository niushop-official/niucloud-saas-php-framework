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

namespace addon\vipcard\app\listener;

use addon\vipcard\app\dict\order\OrderDict;
use addon\vipcard\app\service\core\CoreOrderService;
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
        if ($trade_type == 'vipcard') {
            $order_info = (new CoreOrderService())->orderInfo($params['site_id'], $params['trade_id']);
            if ($order_info['order_status'] != OrderDict::WAIT_PAY && $order_info['order_money'] != 0) throw new CommonException('ONLY_PAYING_CAN_PAY');
            //添加订单支付表
            $return_data = [
                'status'=>'',
                'site_id' => $params['site_id'],
                'main_type' => PayDict::MEMBER,
                'main_id' => $order_info['member_id'],//买家id
                'money' => $order_info['pay_money'],//订单金额
                'trade_type' => $trade_type,//业务类型
                'trade_id' => $params['trade_id'],
                'body' => $order_info['order_name']
            ];
            if ($order_info['order_money'] != 0){
                $return_data['status'] = PayDict::STATUS_FINISH;
            }
            return $return_data;
        }
    }
}