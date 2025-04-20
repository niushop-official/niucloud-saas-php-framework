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

use app\service\core\notice\NoticeService;
use core\base\BaseJob;

/**
 * 队列异步调用支付定时未支付恢复
 */
class OrderUseRemind extends BaseJob
{
    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob(int $site_id, int $order_id)
    {
        try {
            // 发送订单使用提醒通知
            (new NoticeService())->send($site_id, 'tourism_order_use_remind', ['order_id' => $order_id ]);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}