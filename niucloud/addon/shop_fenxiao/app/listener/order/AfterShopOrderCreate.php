<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\order;

use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoMemberService;

class AfterShopOrderCreate
{

    public function handle($data)
    {
//        $basic = $data['basic'];
//        $order_data = $data['order_data'];
//        $member_id = $order_data['member_id'];
//        $order_goods_data = $data['order_goods_data'] ?? [];
//        $site_id = $order_data['site_id'];
//        //订单支付后绑定会员
//        (new CoreFenxiaoMemberService())->orderCreate($site_id, $member_id);
        return true;
    }
}
