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

namespace addon\vipcard\app\adminapi\controller;

use addon\vipcard\app\service\admin\OrderService;
use core\base\BaseAdminController;

class Order extends BaseAdminController
{
    /**
     * 订单列表
     * @return void
     */
    public function lists(){
        $data = $this->request->params([
            ['order_no', ''],
            ['order_status', ''],
            ['order_from', ''],
            ['create_time', []],
            ['pay_time', []],
            ['member_id', ''],
        ]);
        return success((new OrderService())->getPage($data));
    }

    /**
     * 订单详情
     * @param int $order_id
     * @return void
     */
    public function detail(int $order_id) {
        return success((new OrderService())->getDetail($order_id));
    }

    /**
     * 订单状态
     * @return void
     */
    public function status() {
        return success((new OrderService())->getStatus());
    }
}