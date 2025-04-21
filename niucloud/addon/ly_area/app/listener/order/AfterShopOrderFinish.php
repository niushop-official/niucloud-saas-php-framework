<?php
declare (strict_types = 1);

namespace addon\ly_area\app\listener\order;

use addon\ly_area\app\model\AreaAgent;
use addon\ly_area\app\service\core\level\CoreAreaLevelService;
use addon\ly_area\app\service\core\order\CoreAreaRewardService;
use app\model\member\Member;
use app\service\core\sys\CoreConfigService;
use think\facade\Log;

/**
 * 订单收货完成后事件
 * Class AfterShopOrderFinish
 * @package addon\ly_area\app\listener\order
 */
class AfterShopOrderFinish
{

    public function handle($data)
    {
        Log::write('==================ly_area' . '===========区域分红=======', 'DEBUG');

        $order_data = $data['order_data'];
        $site_id = $order_data['site_id'];
        $member_id = $order_data['member_id'];

        $config = (new CoreConfigService())->getConfigValue($site_id, 'LY_AREA_CONFIG');
        $member = (new Member())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();
        $area_agent = (new AreaAgent())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();
  
        if($area_agent->isEmpty()){
            (new CoreAreaLevelService())->autoToAreaAgents($site_id, $member);
        }else{
            if($config['become_many'] == 1){
                (new CoreAreaLevelService())->autoToAreaAgents($site_id, $member);
            }
        }

        //发放分红
        (new CoreAreaRewardService())->handleReward($site_id, $order_data);

    }
}
