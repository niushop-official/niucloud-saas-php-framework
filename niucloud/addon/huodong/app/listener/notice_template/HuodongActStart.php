<?php

namespace addon\huodong\app\listener\notice_template;

use addon\huodong\app\service\core\order\CoreOrderService;
use app\listener\notice_template\BaseNoticeTemplate;


class HuodongActStart extends BaseNoticeTemplate
{
    private $key = 'huodong_act_start';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
            $order = (new CoreOrderService())->getInfo($params['data']['order_id']);
            if (!empty($order)) {
                $wap_domain = get_wap_domain($order['site_id']);
                return $this->toReturn(
                    [
                        '__wechat_page' => $wap_domain . '/addon/huodong/pages/order/detail?id=' . $order['order_id'],//模板消息链接
                        '__weapp_page' => '/addon/huodong/pages/order/detail?id=' . $order['order_id'],//小程序链接
                        'act_name' => str_sub($order['act_name']),
                        'act_address' => str_sub($order['act_address']),
                        'member_name' => str_sub($order['member_name']),
                        'create_time' => $order['create_time'],
                        'url' => $wap_domain . '/addon/huodong/pages/order/detail?id=' . $order['order_id']
                    ],
                    [
                        'member_id' => $order['member_id']
                    ]
                );
            }
        }
    }
}
