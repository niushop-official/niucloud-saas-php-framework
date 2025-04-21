<?php
declare ( strict_types = 1 );

namespace addon\recharge\app\listener\order;

use addon\recharge\app\model\RechargeOrder;
use addon\recharge\app\service\core\CoreRechargeConfigService;
use think\facade\Log;

/**
 * 订单创建后操作
 */
class AfterRechargeOrderCreate
{

    public function handle($data)
    {
        Log::write('订单AfterRechargeOrderCreate' . json_encode($data));
        try {
            $order_data = $data[ 'order_data' ];
            $site_id = $order_data[ 'site_id' ];
            $order_id = $data[ 'order_id' ];
            //添加超时时间
            $core_order_config_service = new CoreRechargeConfigService();
            $order_config = $core_order_config_service->getRechargeConfig($site_id);
            if ($order_config[ 'close_length' ] > 0) {
                ( new RechargeOrder() )->where([ [ 'order_id', '=', $order_id ] ])->update([
                    'timeout' => $data[ 'time' ] + $order_config[ 'close_length' ] * 60
                ]);
            }

        } catch (\Exception $e) {
            Log::write('订单AfterRechargeOrderCreate失败' . $e->getMessage() . $e->getFile() . $e->getLine());
        }
    }
}
