<?php
declare (strict_types = 1);

namespace addon\shop\app\listener\notice_template;

use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\service\core\order\CoreOrderService;
use app\listener\notice_template\BaseNoticeTemplate;

/**
 * 订单催付通知
 */
class OrderPayRemind extends BaseNoticeTemplate
{
    private $key = 'shop_order_pay_remind';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
            $order = (new CoreOrderService())->getInfo($params['data']['order_id']);
            if (!empty($order) && $order['status'] == OrderDict::WAIT_PAY) {
                $wap_domain = get_wap_domain($order['site_id']);
                return $this->toReturn(
                    [
                        '__wechat_page' => $wap_domain . '/addon/shop/pages/order/detail?order_id=' . $order['order_id'],//模板消息链接
                        '__weapp_page' => 'addon/shop/pages/order/detail?order_id=' . $order['order_id'],//小程序链接
                        'body' => $order['body'],
                        'order_no' => $order['order_no'],
                        'order_money' => $order['order_money'], //交易流水号
                        'timeout' => $order['timeout'],
                        'url' => $wap_domain . '/addon/shop/pages/order/detail?order_id=' . $order['order_id']
                    ],
                    [
                        'member_id' => $order['member_id']
                    ]
                );
            }
        }
    }
}
