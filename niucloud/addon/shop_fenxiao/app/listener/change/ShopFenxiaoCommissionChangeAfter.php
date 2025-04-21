<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\change;


use addon\shop_fenxiao\app\service\core\stat\CoreStatService;

/**
 * 分销商佣金发生变化
 */
class ShopFenxiaoCommissionChangeAfter
{
    public function handle($data){
        $site_id = $data['site_id'];
        $member_id = $data['member_id'];

        //todo 累加分销商统计
        (new CoreStatService())->set($site_id, $member_id,$data['data']);
        return true;
    }
}
