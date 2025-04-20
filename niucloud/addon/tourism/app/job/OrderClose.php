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
namespace addon\tourism\app\job;

use addon\tourism\app\dict\order\HotelOrderDict;
use addon\tourism\app\dict\order\ScenicOrderDict;
use addon\tourism\app\dict\order\WayOrderDict;
use addon\tourism\app\service\core\order\hotel\CoreHotelOrderService;
use addon\tourism\app\service\core\order\scenic\CoreScenicOrderService;
use addon\tourism\app\service\core\order\way\CoreWayOrderService;
use core\base\BaseJob;

/**
 * 队列异步调用支付定时未支付恢复
 */
class OrderClose extends BaseJob
{
    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob(int $order_id, string $order_type)
    {
        try {
            switch ($order_type) {
                case HotelOrderDict::TYPE:
                    (new CoreHotelOrderService())->autoClose($order_id);
                    break;
                case ScenicOrderDict::TYPE:
                    (new CoreScenicOrderService())->autoClose($order_id);
                    break;
                case WayOrderDict::TYPE:
                    (new CoreWayOrderService())->autoClose($order_id);
                    break;
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
