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
namespace addon\shop\app\job\stat;

use addon\shop\app\model\order\Order;
use app\service\core\stat\CoreStatService;
use core\base\BaseJob;

/**
 * 订单自动关闭
 */
class ShopStatJob extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob(int $site_id, $key, $addon)
    {
        if (method_exists($this, $key)) $this->$key($site_id, $addon);
        return true;
    }

    /**
     * 订单统计
     * @param $site_id
     * @param $addon
     * @return void
     */
    public function shopOrder($site_id, $addon)
    {
//        ['addon' =>, 'date' => ['year' => , 'month'=> , 'day' => , 'hour' => ], 'data' => ['shop_order_money' => 12, 'member' => 12]]
        $orderModel = new Order();
        $order_money = $orderModel->where([ [ 'site_id', '=', $site_id ], [ 'status', '>', 0 ] ])->sum('order_money');
        $param = [
            'addon' => $addon,
            'date' => [
                'year' => date('Y'),
                'month' => date('m'),
                'day' => date('d'),
                'hour' => date('H'),
            ],
            'data' => [
                'order_money' => $order_money
            ]
        ];
        ( new CoreStatService() )->add($site_id, $param);

    }

    /**
     * @param $site_id
     * @param $addon
     * @return void
     */
    public function shopRechargeOrder($site_id, $addon)
    {

    }

}
