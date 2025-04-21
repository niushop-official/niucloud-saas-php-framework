<?php
declare (strict_types=1);

namespace addon\shop\app\listener\point_exchange;


use think\facade\Log;
use app\service\core\member\CoreMemberAccountService;
use core\exception\CommonException;

class ShopOrderDiscountCreate
{

    public function handle($data)
    {
        Log::write('订单ShopOrderDiscountCreate' . json_encode($data));
        try {
            //积分商城兑换积分扣除业务
            if (isset($data['data']) && isset($data['data']['discount_type']) && isset($data['order_object']) && $data['data']['discount_type'] == 'exchange') {
                (new CoreMemberAccountService())->addLog($data['order_object']->site_id, $data['order_object']->member_id, 'point', -$data['order_object']->basic['point_sum'], 'account_point_exchange_order', '积分商城消费扣款积分');
            }
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }
}
