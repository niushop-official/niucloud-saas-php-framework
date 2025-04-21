<?php

namespace addon\tourism\app\listener\notice_template;

use addon\tourism\app\dict\order\OrderDict;
use addon\tourism\app\model\TourismOrder;
use app\listener\notice_template\BaseNoticeTemplate;

class OrderUseRemind extends BaseNoticeTemplate
{

    private $key = 'tourism_order_use_remind';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
            $order = (new TourismOrder())->where([['order_id', '=', $params['data']['order_id']]])->findOrEmpty();
            if (!$order->isEmpty() || $order['order_status'] == OrderDict::WAIT_USE) {
                return $this->toReturn(
                    [
                        '__wechat_page' => get_wap_domain($order['site_id']) . '/addon/pages/tourism/order/detail?order_id=' . $order['order_id'],//模板消息链接
                        '__weapp_page' => 'addon/pages/tourism/order/detail?order_id=' . $order['order_id'],//小程序链接
                        'goods_name' => str_sub($order['full_goods_name']),
                        'start_time' => $order['start_time'],
                        'mobile' => $order['mobile']
                    ],
                    [
                        'member_id' => $order['member_id'],
                        'mobile' => $order['mobile']
                    ]
                );
            }
        }
    }
}
