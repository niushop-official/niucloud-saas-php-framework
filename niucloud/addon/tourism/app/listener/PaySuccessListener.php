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

use addon\tourism\app\dict\order\HotelOrderDict;
use addon\tourism\app\dict\order\ScenicOrderDict;
use addon\tourism\app\dict\order\WayOrderDict;
use addon\tourism\app\service\core\order\hotel\CoreHotelOrderService;
use addon\tourism\app\service\core\order\scenic\CoreScenicOrderService;
use addon\tourism\app\service\core\order\way\CoreWayOrderService;

/**
 * 支付异步回调事件
 */
class PaySuccessListener
{
    public function handle(array $pay_info)
    {
        $trade_type = $pay_info['trade_type'] ?? '';
        switch ($trade_type) {
            case HotelOrderDict::TYPE:
                (new CoreHotelOrderService())->pay($pay_info);
                break;
            case ScenicOrderDict::TYPE:
                (new CoreScenicOrderService())->pay($pay_info);
                break;
            case WayOrderDict::TYPE:
                (new CoreWayOrderService())->pay($pay_info);
                break;
        }
    }
}