<?php
declare (strict_types = 1);

namespace addon\ly_lian\app\listener\order;

use addon\ly_lian\app\model\LianMember;
use addon\ly_lian\app\service\core\CoreConfigService;
use addon\ly_lian\app\service\core\member\CoreLianDataService;
use addon\ly_lian\app\service\core\member\CoreLianLevelService;
use addon\ly_lian\app\service\core\member\CoreLianMemberService;
use addon\ly_lian\app\service\core\order\CoreLianRewardService;
use app\model\member\Member;

/**
 * 订单收货完成后事件
 * Class AfterShopOrderFinish
 * @package addon\ly_lian\app\listener\order
 */
class AfterShopOrderFinish
{

    public function handle($data)
    {
        $order_data = $data['order_data'];
        $site_id = $order_data['site_id'];
        $member_id = $order_data['member_id'];

        $config = (new CoreConfigService())->getLianConfig($site_id);
        $member = (new Member())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();
        $lian_member = (new LianMember())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();


        if($config['up_way'] == 1){//升级方式为订单完成后
            if($lian_member->isEmpty()){
                (new CoreLianLevelService())->lianMemberUpgrade($site_id, $member);
                (new CoreLianMemberService())->bindChildMember($site_id, $member_id, $order_data);

                (new CoreLianRewardService())->handleReward($site_id, $order_data);
                // (new CoreLianDataService())->handleQueue($order_data);

            }else{

                (new CoreLianRewardService())->handleReward($site_id, $order_data); //计算佣金
                // (new CoreLianDataService())->handleQueue($order_data); //检验绩效任务
            }
        }
    }
}
