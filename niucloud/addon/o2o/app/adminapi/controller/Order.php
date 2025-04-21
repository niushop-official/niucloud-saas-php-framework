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

namespace addon\o2o\app\adminapi\controller;

use addon\o2o\app\service\admin\OrderService;
use core\base\BaseAdminController;

class Order extends BaseAdminController
{
    /**
     * 订单列表
     * @return void
     */
    public function lists()
    {
        $data = $this->request->params([
            ['order_no', ''],
            ['order_status', ''],
            ['order_from', ''],
            ['create_time', []],
            ['pay_time', []],
            ['member_id', ''],
            ['order_name', ''],
            ['member_search_text', ''],
            ['technician_search_text', ''],
        ]);
        return success((new OrderService())->getPage($data));
    }

    /**
     * 订单详情
     * @param int $order_id
     * @return void
     */
    public function detail(int $order_id)
    {
        return success((new OrderService())->getDetail($order_id));
    }

    /**
     * 订单状态
     * @return void
     */
    public function status()
    {
        return success((new OrderService())->getStatus());
    }

    /**
     * 订单派单
     * @return void
     */
    public function dispatch()
    {
        $data = $this->request->params([
            ['order_id', 0],
            ['technician_id', 0],
        ]);
        return success('SUCCESS', (new OrderService())->orderDispatch($data));
    }


    /**
     * 订单预约看板
     * @return void
     */
    public function reserveByWeek()
    {
        $data = $this->request->params([
            ['order_no', ''],
            ['order_status', ''],
            ['order_from', ''],
            ['create_time', []],
            ['pay_time', []],
            ['member_id', ''],
            ['order_name', ''],
            ["length", 0],
            ['member_search_text', ''],
            ['technician_search_text', ''],
        ]);
        return success((new OrderService())->reserveByWeek($data));
    }

}