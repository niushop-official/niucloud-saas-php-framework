<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\order;

use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoApplyService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoDataService;
use addon\shop_fenxiao\app\service\core\settlement\CoreOrderSettlementService;

/**
 * 订单收货完成后事件
 * Class AfterShopOrderFinish
 * @package addon\shop_fenxiao\app\listener\order
 */
class AfterShopOrderFinish
{

    public function handle($data)
    {
        $order_data = $data['order_data'];
        $site_id = $order_data['site_id'];
        $member_id = $order_data['member_id'];
        //结算佣金
        (new CoreOrderSettlementService())->settlement($data);

        //分销商累加销售量和销售额
        (new CoreFenxiaoDataService())->orderDataInc($data);

        //todo  居于最底部尝试成为分销商
        (new CoreFenxiaoApplyService())->autoToFenxiao($site_id, $member_id);
    }
}
