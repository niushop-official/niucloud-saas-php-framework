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

namespace addon\o2o\app\listener\pay;

use addon\o2o\app\service\core\CoreOrderRefundService;

/**
 * 退款异步回调事件
 */
class RefundSuccessListener
{
    public function handle(array $params)
    {
        if($params['trade_type'] == 'o2o'){

            $res = (new CoreOrderRefundService())->refundSuccess($params['refund_no']);
            return true;
        }
    }
}