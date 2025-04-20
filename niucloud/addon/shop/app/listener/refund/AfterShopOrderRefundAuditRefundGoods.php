<?php
declare (strict_types = 1);

namespace addon\shop\app\listener\refund;

use addon\shop\app\dict\order\OrderRefundDict;
use addon\shop\app\service\core\refund\CoreRefundLogService;
use addon\shop\app\service\core\refund\CoreRefundService;

/**
 * 退款完成后操作
 */
class AfterShopOrderRefundAuditRefundGoods
{

    public function handle($data){

        $refund_data = $data['refund_data'];
        $main_type = $data['main_type'];
        $main_id = $data['main_id'];
        //日志
        if(in_array($refund_data['status'], [OrderRefundDict::STORE_AGREE_REFUND_WAIT_TRANSFER])){
            $log_type = OrderRefundDict::AGREE_AUDIT_REFUND_GOODS_ACTION;
        }else{
            $log_type = OrderRefundDict::REFUSE_AUDIT_REFUND_GOODS_ACTION;
        }
        //日志
        (new CoreRefundLogService())->add([
            'order_refund_no' => $refund_data['order_refund_no'],
            'status' => $refund_data['status'],
            'main_type' => $main_type,//todo  可以是传入的
            'main_id' => $main_id,
            'type' => $log_type,
            'content' => ''
        ]);
        //消息发送

        if($refund_data['status'] == OrderRefundDict::STORE_AGREE_REFUND_WAIT_TRANSFER){
            if($refund_data['money'] > 0){
                //订单到达待付款
                (new CoreRefundService())->toTransfer($refund_data, $main_type, $main_id);
            }else{
                (new CoreRefundService())->finish([
                    'order_refund_no' => $refund_data['order_refund_no'],
                    'main_type' => $main_type,
                    'main_id' => $main_id
                ]);
            }
        }

    }
}
