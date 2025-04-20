<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\change;


use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoLevelService;
use addon\shop_fenxiao\app\service\core\stat\CoreStatService;

/**
 * 分销商累加订单销售额和销售量之后
 */
class ShopFenxiaoChildFenxiaoChangeAfter
{
    public function handle($data){
        $site_id = $data['site_id'];
        $member_id = $data['member_id'];
        $child_fenxiao_num = $data['data']['child_fenxiao_num'] ?? 0;
        if($child_fenxiao_num > 0){

            //todo 尝试分销商升级
            (new CoreFenxiaoLevelService())->fenxiaoUpgrade($site_id, $member_id);
        }
        //todo 累加分销商统计
        (new CoreStatService())->set($site_id, $member_id, [
            'child_fenxiao_num' => $child_fenxiao_num
        ]);
        return true;
    }
}
