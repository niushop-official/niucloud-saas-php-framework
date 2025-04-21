<?php

namespace addon\qiankun_vip_card\app\listener\pay;


use addon\qiankun_vip_card\app\service\admin\card\CardService;
use addon\tk_vip\app\dict\order\OrderDict;
use addon\tk_vip\app\model\order\Order;
use app\model\member\MemberLevel;
use core\exception\CommonException;
use think\db\exception\DbException;

/**
 * 支付异步回调事件
 */
class PaySuccessListener
{
    /**
     * @param array $pay_info
     * @return void
     * @throws DbException
     */
    public function handle(array $pay_info)
    {
        $trade_type = $pay_info['trade_type'] ?? '';
        $trade_id = $pay_info['trade_id'] ?? 0;
        if ($trade_type == OrderDict::getOrderType()['type']) {
            $order_model = new Order();
            $order_info = $order_model->where([['site_id', '=', $pay_info['site_id']], ['id', '=', $trade_id]])->findOrEmpty();
            if (empty($order_info)) {
                throw new CommonException('ORDER_NOT_EXIST');
            }
            $levelInfo = (new MemberLevel())->where(['site_id' => $order_info['site_id'], 'level_id' => $order_info['level_id']])->findOrEmpty();
            $service = app()->make(CardService::class);
            if (isset($levelInfo['level_benefits']['qiiankun_vip_card']['give_config'])) {
                foreach ($levelInfo['level_benefits']['qiiankun_vip_card']['give_config'] as $v) {
                    $service->giveMemberCard($order_info, $v['level_id'], $v['number'], $levelInfo['level_benefits']['qiiankun_vip_card']['card_number_type'], intval($levelInfo['level_benefits']['qiiankun_vip_card']['card_number_length'] ?? 0));
                }
            }
        }
    }
}