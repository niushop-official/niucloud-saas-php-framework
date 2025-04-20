<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\change;


use addon\shop_fenxiao\app\service\core\sale\CoreSaleService;
use addon\shop_fenxiao\app\service\core\stat\CoreStatService;
use addon\shop_fenxiao\app\service\core\task\CoreTaskMemberService;

/**
 * 分销商累加团队订单销售额和团队销售量之后
 */
class ShopFenxiaoTeamOrderChangeAfter
{
    public function handle($data){
        $site_id = $data['site_id'];
        $member_id = $data['member_id'];
        $order_data = $data['data'];

        //todo  累加任务奖励
        (new CoreTaskMemberService())->set($site_id, $member_id, [
            'order_money' => $order_data['order_money'],
            'order_num' => $order_data['order_num']
        ]);
        //todo  累加销售统计
        (new CoreSaleService())->set($site_id, $member_id, [
            'order_money' => $order_data['order_money'],
//            'order_num' => $order_data['order_num']
        ]);
        //todo 累加分销商团队业绩统计
        (new CoreStatService())->set($site_id, $member_id, [
            'team_order_money' => $order_data['order_money'],
            'team_order_num' => $order_data['order_num']
        ]);

    }
}
