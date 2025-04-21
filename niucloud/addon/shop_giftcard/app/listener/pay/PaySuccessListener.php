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

namespace addon\shop_giftcard\app\listener\pay;

use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\service\core\order\CoreOrderPayService;

/**
 * 支付异步回调事件
 */
class PaySuccessListener
{
    public function handle(array $pay_info)
    {
        $trade_type = $pay_info['trade_type'] ?? '';
        if ($trade_type == OrderDict::TYPE) {
            (new CoreOrderPayService())->pay($pay_info);
        }
    }
}