<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\order;


use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoApplyService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoMemberService;
use addon\shop_fenxiao\app\service\core\settlement\CoreOrderCalculateService;

/**
 * 订单支付完成后事件  计算佣金
 * Class AfterShopOrderPay
 * @package addon\shop_fenxiao\app\listener\order
 */
class AfterShopOrderPay
{
    public function handle($data){
        $order_data = $data['order_data'];
        $site_id = $order_data['site_id'];
        $member_id = $order_data['member_id'];
        //1. 先处理支付后绑定上下级  2. 计算佣金
        (new CoreFenxiaoMemberService())->orderPay($site_id, $member_id);
        //计算佣金
        (new CoreOrderCalculateService())->calculate($data);
        //todo  可能成为分销商,居于最后
        //尝试成为分销商
        (new CoreFenxiaoApplyService())->autoToFenxiao($site_id, $member_id);
        return true;
    }
}
