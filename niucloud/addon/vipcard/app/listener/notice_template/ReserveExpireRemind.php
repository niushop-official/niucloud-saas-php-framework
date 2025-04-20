<?php

namespace addon\vipcard\app\listener\notice_template;

use addon\vipcard\app\model\Reserve;
use app\listener\notice_template\BaseNoticeTemplate;

class ReserveExpireRemind extends BaseNoticeTemplate
{

    private $key = 'vipcard_reserve_expire_remind';

    public function handle(array $params)
    {
        if ($this->key == $params['key']) {
            $reserve = (new Reserve())->where([['reserve_id', '=', $params['data']['reserve_id']]])->with(['technician' => function($query){
                $query->field('id,name');
            }, 'goods' => function($query){
                $query->field('goods_id,goods_name');
            }])->findOrEmpty();

            if (!$reserve->isEmpty()) {
                return $this->toReturn(
                    [
                        '__wechat_page' => '', // get_wap_domain($refund['site_id']) . '/addon/pages/vipcard/order/detail?order_id=' . $refund['main_order']['order_id'],//模板消息链接
                        '__weapp_page' => '', //'addon/pages/vipcard/order/detail?order_id=' . $refund['main_order']['order_id'],//小程序链接
                        'reserve_time' => $reserve['reserve_time'],
                        'technician' => $reserve['technician']['name'],
                        'service' => str_sub($reserve['goods']['goods_name']),
                        'mobile' => $reserve['mobile'],
                        'tips' => '您有一条新的预约即将过期请及时到店消费'
                    ],
                    [
                        'member_id' => $reserve['member_id'],
                        'mobile' => $reserve['mobile']
                    ]
                );
            }
        }
    }
}
