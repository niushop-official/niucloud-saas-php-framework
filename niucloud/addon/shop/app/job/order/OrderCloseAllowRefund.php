<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------
namespace addon\shop\app\job\order;

use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\dict\order\OrderLogDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use addon\shop\app\service\core\order\CoreOrderLogService;
use core\base\BaseJob;

/**
 * 订单允许售后自动关闭
 */
class OrderCloseAllowRefund extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        try {
            $main_type = OrderLogDict::SYSTEM;
            $main_id = 0;
            $list = ( new Order() )->where([
                [ 'status', '=', OrderDict::FINISH ],
                [ 'timeout', '<=', time() ],
                [ 'is_enable_refund', '=', 1 ]
            ])->select();
            if (!$list->isEmpty()) {
                //订单设置
                $list->update([ 'is_enable_refund' => 0, 'timeout' => 0 ]);
                $order_ids = array_column($list->toArray(), 'order_id');
                //订单项设置
                ( new OrderGoods() )->where([
                    [ 'order_id', 'in', $order_ids ]
                ])->update([ 'is_enable_refund' => 0 ]);
                //写日志
                $log_data = [];
                $lot_template = [
                    'status' => OrderDict::FINISH,
                    'main_type' => $main_type,//todo  可以是传入的
                    'main_id' => $main_id,
                    'type' => OrderDict::ORDER_CLOSE_ALLOW_REFUND_ACTION,
                    'content' => '',
                    'create_time' => time()
                ];
                foreach ($list as $v) {
                    $lot_template[ 'order_id' ] = $v[ 'order_id' ];
                    $log_data[] = $lot_template;
                }
                ( new CoreOrderLogService() )->addAll($log_data);
            }

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
