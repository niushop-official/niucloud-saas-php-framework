<?php
declare (strict_types = 1);

namespace addon\ly_area\app\listener\order;

use addon\ly_area\app\service\core\CoreAreaConfigService;
use addon\ly_area\app\service\core\order\CoreAreaRewardService;
use app\model\member\Member;
use think\facade\Log;

/**
 * 订单支付完成后事件  计算佣金
 * Class AfterShopOrderPay
 * @package addon\ly_area\app\listener\order
 */
class AfterShopOrderPay
{
    public function handle($data){
        Log::write('==========================ly_area===========================');
        $order_data = $data['order_data'];
        $site_id = $order_data['site_id'];
        $member_id = $order_data['member_id'];

        $config = (new CoreAreaConfigService())->getAreaConfig($site_id);
        $member = (new Member())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();

        if($config['is_open'] == 0) return;

        if($config['count_way'] == 0){
            (new CoreAreaRewardService())->handleReward($site_id, $order_data);
        }
        

        return true;
    }
}
