<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\change;


use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoLevelService;
use addon\shop_fenxiao\app\service\core\stat\CoreStatService;
use addon\shop_fenxiao\app\service\core\task\CoreTaskMemberService;

/**
 * 分销商累加订单销售额和销售量之后
 */
class ShopFenxiaoChildMemberChangeAfter
{
    public function handle($data){
        $site_id = $data['site_id'];
        $member_id = $data['member_id'];
        $child_num = $data['data']['child_num'] ?? 0;
        //todo  减少推广数 任务奖励或销售业绩奖励不减少
        if($child_num > 0){
            //todo  累加任务奖励
            (new CoreTaskMemberService())->set($site_id, $member_id, [
                'child_num' => $child_num,
            ]);

            //todo 尝试分销商升级
            (new CoreFenxiaoLevelService())->fenxiaoUpgrade($site_id, $member_id);
        }
        //todo 累加分销商统计
        (new CoreStatService())->set($site_id, $member_id, [
            'child_num' => $child_num
        ]);
        return true;
    }
}
