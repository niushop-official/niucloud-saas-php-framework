<?php
declare (strict_types = 1);

namespace addon\o2o\app\listener\notice_template;

use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\model\Order;
use app\listener\notice_template\BaseNoticeTemplate;

/**
 * 订单催付通知
 */
class OrderPayRemind  extends BaseNoticeTemplate
{
    private $key = 'o2o_order_pay_remind';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
            $order = (new Order())->where([['order_id', '=', $params['data']['order_id']]])->findOrEmpty()->toArray();
            if (!empty($order) && $order['status'] == OrderDict::WAIT_PAY) {
                $wap_domain = !empty(env("system.wap_domain")) ? preg_replace('#/$#', '', env("system.wap_domain")) : request()->domain();
                return $this->toReturn(
                    [
                        '__wechat_page' =>'/addon/o2o/pages/order/detail?order_id=' . $order['order_id'],//模板消息链接
                        '__weapp_page' => 'addon/o2o/pages/order/detail?order_id=' . $order['order_id'],//小程序链接
                        'body' => $order['body'],
                        'order_no' => $order['order_no'],
                        'order_money' => $order['order_money'], //交易流水号
                        'timeout' => $order['timeout'],
                        'url' => $wap_domain . '/addon/o2o/pages/order/detail?order_id=' . $order['order_id']
                    ],
                    [
                        'member_id' => $order['member_id']
                    ]
                );
            }
        }
    }
}
