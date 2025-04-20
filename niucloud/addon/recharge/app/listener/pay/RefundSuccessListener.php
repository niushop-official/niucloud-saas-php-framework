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

namespace addon\recharge\app\listener\pay;

use addon\recharge\app\service\core\CoreRechargeRefundService;

/**
 * 退款成功事件
 */
class RefundSuccessListener
{
    public function handle(array $refund_info)
    {
        //交易单据处理
        $trade_type = $refund_info[ 'trade_type' ] ?? '';
        if ($trade_type == 'recharge') {
            ( new CoreRechargeRefundService() )->refundComplete($refund_info[ 'refund_no' ]);
        }

    }
}
