<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\refund;


use addon\shop_fenxiao\app\service\core\settlement\CoreOrderSettlementService;

/**
 * 退款完成后操作,重新计算佣金
 */
class AfterShopOrderRefundFinish
{

    public function handle($data){

        //将已生成的带结算佣金记录设置为已退款
        (new CoreOrderSettlementService())->refund($data);
    }
}
