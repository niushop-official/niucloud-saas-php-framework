<?php
declare ( strict_types = 1 );

namespace addon\shop\app\listener\refund;

use addon\shop\app\dict\order\OrderRefundDict;
use addon\shop\app\service\core\refund\CoreRefundLogService;
use addon\shop\app\service\core\refund\CoreRefundService;
use app\service\core\notice\NoticeService;

/**
 * 商家主动退款后操作
 */
class AfterShopOrderRefundActiveCreate
{

    public function handle($data)
    {
        $main_type = $data[ 'main_type' ];
        $main_id = $data[ 'main_id' ];
        $refund_data = $data[ 'refund_data' ];
        $order_goods_info = $data[ 'order_goods_data' ];
        //日志
        ( new CoreRefundLogService() )->add([
            'order_refund_no' => $refund_data[ 'order_refund_no' ],
            'status' => $refund_data[ 'status' ],
            'main_type' => $main_type,//todo  可以是传入的
            'main_id' => $main_id,
            'type' => OrderRefundDict::SHOP_ACTIVE_REFUND_ACTION,
            'content' => '商品【'.$order_goods_info['goods_name'].' '.$order_goods_info['sku_name'].'】商家主动退款，退款金额：'.$refund_data['money'].'元，退款说明：'.$refund_data['remark']
        ]);

        //todo 消息发送

        if ($refund_data[ 'status' ] == OrderRefundDict::STORE_AGREE_REFUND_WAIT_TRANSFER) {
            if ($refund_data['money'] > 0) {
                //订单到达待付款
                (new CoreRefundService())->toTransfer($refund_data, $main_type, $main_id);
            } else {
                (new CoreRefundService())->finish([
                    'order_refund_no' => $refund_data['order_refund_no'],
                    'main_type' => $main_type,
                    'main_id' => $main_id
                ]);
            }
        }
    }
}
