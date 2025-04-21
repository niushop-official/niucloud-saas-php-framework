<?php
declare (strict_types=1);

namespace addon\shop\app\listener\order;

use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\dict\order\OrderLogDict;
use addon\shop\app\service\core\order\CoreOrderLogService;
use think\facade\Log;

class AfterShopOrderEditPrice
{

    public function handle($data)
    {
        Log::write('订单AfterShopOrderEditPrice' . json_encode($data));
        try {
            $order_data = $data['order_data'];
            $order_goods_data = $data['order_goods_data'];
            $content = '运费：' . '从' . $order_data['old_delivery_money'] . '元' . '调整为' . number_format($order_data['delivery_money'], 2, '.', '') . '元 ';
            foreach ($order_goods_data as $order_goods) {
                $content .= $order_goods['goods_name'] . '：' . '从原价' . $order_goods['old_goods_money'] . '元' . '调价为' . number_format($order_goods['goods_money'], 2, '.', '') . '元 ';
            }
            //日志
            $main_type = $data['main_type'] ?? OrderLogDict::SYSTEM;
            $main_id = $data['main_id'] ?? 0;
            (new CoreOrderLogService())->add([
                'order_id' => $order_data['order_id'],
                'status' => OrderDict::WAIT_PAY,
                'main_type' => $main_type,
                'main_id' => $main_id,
                'type' => OrderDict::ORDER_EDIT_PRICE_ACTION,
                'content' => $content
            ]);

            //todo  发送消息提醒.....
        } catch ( \Exception $e ) {
            Log::write('订单AfterShopOrderEditPrice失败' . $e->getMessage() . $e->getFile() . $e->getLine());
        }
    }
}
