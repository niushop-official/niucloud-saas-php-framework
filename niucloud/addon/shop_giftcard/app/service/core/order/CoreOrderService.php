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

use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\model\order\Order;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 订单服务层
 */
class CoreOrderService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 订单自动关闭
     * @param int $order_id
     * @return bool
     */
    public function autoClose($order_id) {
        $order = $this->model->where([ ['order_id', '=', $order_id ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('GIFTCARD_ORDER_NOT_EXIST');
        if ($order->status != OrderDict::WAIT_PAY) return true;

        try {
            $order->status = OrderDict::CLOSE;
            $order->close_time = time();
            $order->save();

            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }

}
