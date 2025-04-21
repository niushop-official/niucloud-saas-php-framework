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
namespace addon\o2o\app\job;

use addon\o2o\app\service\core\CoreOrderService;
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
