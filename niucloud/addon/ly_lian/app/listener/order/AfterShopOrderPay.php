<?php
declare (strict_types = 1);

namespace addon\ly_lian\app\listener\order;


use addon\ly_lian\app\model\LianMember;
use addon\ly_lian\app\service\core\CoreConfigService;
use addon\ly_lian\app\service\core\member\CoreLianDataService;
use addon\ly_lian\app\service\core\member\CoreLianLevelService;
use addon\ly_lian\app\service\core\member\CoreLianMemberAttrService;
use addon\ly_lian\app\service\core\member\CoreLianMemberService;
use addon\ly_lian\app\service\core\order\CoreLianRewardService;
use addon\ly_lian\app\service\core\settlement\CoreOrderCalculateService;
use app\model\member\Member;
use think\facade\Log;

/**
 * 订单支付完成后事件  计算佣金
 * Class AfterShopOrderPay
 * @package addon\ly_lian\app\listener\order
 */
class AfterShopOrderPay
{
    public function handle($data){
        Log::write('==========================ly_lian===========================');
        $order_data = $data['order_data'];
        $site_id = $order_data['site_id'];
        $member_id = $order_data['member_id'];

        $config = (new CoreConfigService())->getLianConfig($site_id);
        $member = (new Member())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();
        $lian_member = (new LianMember())->where('site_id', $site_id)->where('member_id', $member_id)->findOrEmpty();

        if($config['up_way'] == 0){
            if($lian_member->isEmpty()){

                (new CoreLianLevelService())->lianMemberUpgrade($site_id, $member); //成为链动会员

                (new CoreLianMemberService())->bindChildMember($site_id, $member_id, $order_data);  //绑定链动关系

                (new CoreLianRewardService())->handleReward($site_id, $order_data); //计算佣金

            }else{  
                (new CoreLianRewardService())->handleReward($site_id, $order_data); //计算佣金
            }
        }
        

        return true;
    }
}
