<?php

namespace addon\vipcard\app\listener\notice_template;

use addon\vipcard\app\model\Order;
use app\listener\notice_template\BaseNoticeTemplate;

class OrderAutoClose extends BaseNoticeTemplate
{

    private $key = 'vipcard_order_auto_close';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
            $order = (new Order())->where([['order_id', '=', $params['data']['order_id']]])->findOrEmpty();
            if (!$order->isEmpty()) {
                return $this->toReturn(
                    [
                        '__wechat_page' => get_wap_domain($order['site_id']) . '/addon/pages/vipcard/order/detail?order_id=' . $order['order_id'],//模板消息链接
                        '__weapp_page' => 'addon/pages/vipcard/order/detail?order_id=' . $order['order_id'],//小程序链接
                        'goods_name' => str_sub($order['order_name']),
                        'order_no' => $order['order_no'],
                        'order_money' => $order['order_money'], //交易流水号
                        'create_time' => $order['create_time'],//创建时间
                        'close_time' => $order['close_time'], //关闭时间
                    ],
                    [
                        'member_id' => $order['member_id']
                    ]
                );
            }
        }
    }
}
