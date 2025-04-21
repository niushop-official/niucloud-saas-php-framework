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

namespace addon\shop_giftcard\app\service\core\order;

use addon\shop_giftcard\app\job\order\OrderCloseAfter;
use addon\shop_giftcard\app\job\order\OrderCreateAfter;
use addon\shop_giftcard\app\job\order\OrderPayAfter;
use addon\shop_giftcard\app\model\order\Order;
use core\base\BaseCoreService;

/**
 * 订单关闭服务层
 */
class CoreOrderEventService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 订单创建后事件
     * @param $data
     * @return true
     */
    public static function orderCreateAfter($data){
        OrderCreateAfter::dispatch(['data' => $data]);
        return true;
    }

    /**
     * 订单支付后事件
     * @param $data
     * @return true
     */
    public static function orderPayAfter($data){
        OrderPayAfter::dispatch(['data' => $data]);
        return true;
    }

    /**
     * 订单关闭后事件
     * @param $data
     * @return true
     */
    public static function orderCloseAfter($data){
        OrderCloseAfter::dispatch(['data' => $data]);
        return true;
    }

}
