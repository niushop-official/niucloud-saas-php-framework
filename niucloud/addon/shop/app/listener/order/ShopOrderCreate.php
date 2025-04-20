<?php
declare ( strict_types = 1 );

namespace addon\shop\app\listener\order;

use addon\shop\app\model\order\Order;
use addon\shop\app\service\core\marketing\CoreManjianService;
use addon\shop\app\service\core\order\CoreOrderConfigService;
use think\facade\Log;

class ShopOrderCreate
{

    public function handle($data)
    {
        Log::write('订单ShopOrderCreate' . json_encode($data));
        $basic = $data[ 'basic' ];
        $order_data = $data[ 'order_data' ];
        $order_goods_data = $data[ 'order_goods_data' ] ?? [];
        $site_id = $order_data[ 'site_id' ];

        //创建定时关闭任务
        $core_order_config_service = new CoreOrderConfigService();
        $order_config = $core_order_config_service->orderClose($site_id);
        if ($order_config[ 'is_close' ] == 1) {
            if ($order_config[ 'close_length' ] > 0) {
                ( new Order() )->where([ [ 'order_id', '=', $order_data[ 'order_id' ] ] ])->update([
                    'timeout' => $data[ 'time' ] + $order_config[ 'close_length' ] * 60
                ]);
//                OrderClose::dispatch(['order_id' => $order_data['order_id'] ], secs: $order_config['close_length'] * 60);
            }
        }

        //满减赠送记录
        ( new CoreManjianService() )->addGiveRecords($data);
    }
}
