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

namespace addon\shop_replace_buy\app\listener;

use addon\shop_replace_buy\app\dict\order\OrderFromDict;

/**
 * 订单来源监听
 */
class OrderFromListener
{
    public function handle($params = [])
    {
        return OrderFromDict::getOrderFrom();
    }
}
