<?php
declare (strict_types = 1);

namespace addon\shop_giftcard\app\listener\notice_template;

use addon\shop_giftcard\app\model\order\Order;
use app\listener\notice_template\BaseNoticeTemplate;

/**
 * 礼品卡订单支付通知
 */
class GiftcardOrderPay extends BaseNoticeTemplate
{
    private $key = 'shop_giftcard_order_pay';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
            $field = 'order_id,site_id,member_id,body,order_no,order_money,create_time,pay_time';
            $order = (new Order())->field($field)->where(['order_id' => $params['data']['order_id']])->findOrEmpty()->toArray();
            if (!empty($order)) {
                $wap_domain = get_wap_domain($order['site_id']);
                return $this->toReturn(
                    [
                        '__wechat_page' => $wap_domain . '/addon/shop_giftcard/pages/order_detail?order_id=' . $order['order_id'], // 模板消息链接
                        '__weapp_page' => 'addon/shop_giftcard/pages/order_detail?order_id=' . $order['order_id'], // 小程序链接
                        'body' => str_sub($order['body']),
                        'order_no' => $order['order_no'],
                        'order_money' => $order['order_money'],
                        'create_time' => $order['create_time'],
                        'pay_time' => $order['pay_time'],
                        'url' => $wap_domain . '/addon/shop_giftcard/pages/order_detail?order_id=' . $order['order_id']
                    ],
                    [
                        'member_id' => $order['member_id']
                    ]
                );
            }
        }
    }
}
