<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\fenxiao;


use addon\shop_fenxiao\app\service\core\stat\CoreStatService;

/**
 * 分销商累加退款之后
 */
class ShopFenxiaoOrderRefundAfter
{
    public function handle($data){
        $site_id = $data['site_id'];
        $fenxiao = $data['fenxiao'];
        $order_data = $data['data'];
        //todo  销售奖励累计

        //todo 任务奖励累计


        //todo 累加分销商统计
        //累加分销商统计业绩
        (new CoreStatService())->refund($site_id, $fenxiao, [
            'refund_money' => $order_data['order_money'],
            'refund_num' => 1
        ]);

    }
}
