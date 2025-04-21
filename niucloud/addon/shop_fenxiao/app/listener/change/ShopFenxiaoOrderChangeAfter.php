<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\change;


use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoLevelService;
use addon\shop_fenxiao\app\service\core\stat\CoreStatService;

/**
 * 分销商累加订单销售额和销售量之后
 */
class ShopFenxiaoOrderChangeAfter
{
    public function handle($data){
        $site_id = $data['site_id'];
        $member_id = $data['member_id'];
        $order_data = $data['data'];
        //todo 累加分销商统计
        (new CoreStatService())->set($site_id, $member_id, [
            'order_money' => $order_data['order_money'],
            'order_num' => $order_data['order_num']
        ]);

        //todo 尝试分销商升级
        (new CoreFenxiaoLevelService())->fenxiaoUpgrade($site_id, $member_id);
    }
}
