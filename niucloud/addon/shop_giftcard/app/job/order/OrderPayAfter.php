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
namespace addon\shop_giftcard\app\job\order;

use core\base\BaseJob;

/**
 * 订单支付后事件
 */
class OrderPayAfter extends BaseJob
{

    public function doJob($data)
    {
        try {
            event('AfterShopGiftcardOrderPay', $data);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
