<?php
declare (strict_types = 1);

namespace addon\shop\app\listener\refund;

use addon\shop\app\dict\order\OrderRefundDict;
use addon\shop\app\dict\order\OrderRefundLogDict;
use addon\shop\app\service\core\refund\CoreRefundLogService;

/**
 * 退款修改后操作
 */
class AfterShopOrderRefundEdit
{

    public function handle($data){

        $refund_data = $data['refund_data'];
        $main_type = $data['main_type'] ?? OrderRefundLogDict::MEMBER;
        $main_id = $data['main_id'] ?? $refund_data['member_id'];
        //日志
        (new CoreRefundLogService())->add([
            'order_refund_no' => $refund_data['order_refund_no'],
            'status' => $refund_data['status'],
            'main_type' => $main_type,
            'main_id' => $main_id,
            'type' => OrderRefundDict::EDIT_APPLY_ACTION,
            'content' => ''
        ]);
        //消息发送
    }
}
