<?php
declare ( strict_types = 1 );

namespace addon\shop_giftcard\app\listener\order;

use addon\shop\app\service\core\order\CoreOrderConfigService;
use addon\shop_giftcard\app\job\order\OrderClose;
use think\facade\Log;

/**
 * 订单创建后操作
 */
class AfterShopGiftcardOrderCreate
{

    public function handle($data)
    {
        Log::write('订单AfterShopOrderCreate' . json_encode($data));
        try {
            $basic = $data[ 'basic' ];
            $order_data = $data[ 'order_data' ];
            $site_id = $order_data[ 'site_id' ];

            //创建定时关闭任务
            $core_order_config_service = new CoreOrderConfigService();
            $order_config = $core_order_config_service->orderClose($site_id);
            if($order_config && $order_config['is_close'] == 1){
                if($order_config['close_length'] > 0){
                    OrderClose::dispatch(['order_id' => $order_data['order_id'] ], secs: $order_config['close_length'] * 60);
                }
            }

        } catch (\Exception $e) {
            Log::write('订单AfterShopOrderCreate失败' . $e->getMessage() . $e->getFile() . $e->getLine());
        }
    }
}
