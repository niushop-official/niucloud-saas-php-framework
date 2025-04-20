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

namespace addon\shop\app\listener\pay;


use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\service\core\order\CoreOrderService;
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
        if (in_array($trade_type, [ OrderDict::TYPE ])) {
            $order_info = (new CoreOrderService())->getInfo($params['trade_id']);
            if ($order_info['status'] != OrderDict::WAIT_PAY) throw new CommonException('SHOP_ONLY_WAIT_PAY_CAN_BE_PAY');
            //添加订单支付表
            return [
                'main_type' => PayDict::MEMBER,
                'main_id' => $order_info['member_id'],//买家id
                'money' => $order_info['order_money'],//订单金额
                'trade_type' => $trade_type,//业务类型
                'trade_id' => $params['trade_id'],
                'body' => $order_info['body'],
            ];
        }
    }
}
