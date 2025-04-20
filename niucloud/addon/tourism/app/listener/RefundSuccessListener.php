<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tourism\app\listener;

use addon\tourism\app\service\core\order\CoreOrderRefundService;

/**
 * 退款异步回调事件
 */
class RefundSuccessListener
{
    public function handle(array $params)
    {
        (new CoreOrderRefundService())->refundSuccess($params['refund_no']);
    }
}