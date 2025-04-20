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
namespace addon\shop_giftcard\app\job\order;

use addon\shop_giftcard\app\service\core\order\CoreOrderService;
use core\base\BaseJob;

/**
 * 订单自动关闭
 */
class OrderClose extends BaseJob
{
    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob(int $order_id)
    {
        try {
            (new CoreOrderService())->autoClose($order_id);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
