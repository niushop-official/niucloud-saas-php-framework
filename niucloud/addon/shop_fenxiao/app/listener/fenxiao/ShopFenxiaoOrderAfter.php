<?php
declare (strict_types = 1);

namespace addon\shop_fenxiao\app\listener\fenxiao;


/**
 * 分销商累加业绩之后
 */
class ShopFenxiaoOrderAfter
{
    public function handle($data){
        $site_id = $data['site_id'];
        $fenxiao = $data['fenxiao'];
        $order_data = $data['data'];
    }
}
