<?php

namespace addon\tourism\app\listener\notice_template;

use addon\tourism\app\model\TourismOrderRefund;
use app\listener\notice_template\BaseNoticeTemplate;

class RefundSuccess extends BaseNoticeTemplate
{

    private $key = 'tourism_refund_success';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
            $refund = (new TourismOrderRefund())->where([['refund_id', '=', $params['data']['refund_id']]])->with(['tourism_order' => function ($query) {
                $query->field('order_id,full_goods_name,mobile,order_no');
            }])->findOrEmpty();

            if (!$refund->isEmpty()) {
                return $this->toReturn(
                    [
                        '__wechat_page' => get_wap_domain($refund['site_id']) . '/addon/pages/tourism/order/detail?order_id=' . $refund['tourism_order']['order_id'],//模板消息链接
                        '__weapp_page' => 'addon/pages/tourism/order/detail?order_id=' . $refund['tourism_order']['order_id'],//小程序链接
                        'goods_name' => str_sub($refund['tourism_order']['full_goods_name']),
                        'order_no' => $refund['tourism_order']['order_no'],
                        'money' => $refund['money']
                    ],
                    [
                        'member_id' => $refund['member_id'],
                        'mobile' => $refund['tourism_order']['mobile']
                    ]
                );
            }
        }
    }
}
