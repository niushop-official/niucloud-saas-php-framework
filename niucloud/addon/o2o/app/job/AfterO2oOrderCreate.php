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
namespace addon\o2o\app\job;

use core\base\BaseJob;

/**
 * 订单创建后调用
 */
class AfterO2oOrderCreate extends BaseJob
{
    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob(int $site_id, int $order_id, array $order_data, array $order_goods_data,array $cart_ids,int $time)
    {
        try {
            event('AfterO2oOrderCreate', ['site_id' => $site_id, 'order_id' => $order_id, 'order_data' => $order_data, 'order_goods_data' => $order_goods_data, 'cart_ids' => $cart_ids, 'time' => $time]);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
