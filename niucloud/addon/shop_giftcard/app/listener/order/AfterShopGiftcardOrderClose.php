<?php
declare (strict_types=1);

namespace addon\shop_giftcard\app\listener\order;

use think\facade\Log;

/**
 * 订单关闭后操作
 */
class AfterShopGiftcardOrderClose
{

    public function handle($data)
    {
        Log::write('订单AfterShopOrderClose' . json_encode($data));
        try {
            $order_data = $data['order_data'];

        } catch ( \Exception $e ) {
            Log::write('订单AfterShopOrderClose失败' . $e->getMessage() . $e->getFile() . $e->getLine());
        }
    }
}
