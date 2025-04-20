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

namespace addon\o2o\app\api\controller;

use addon\o2o\app\service\api\OrderService;
use core\base\BaseApiController;

/**
 * 订单控制器
 * Class GoodsController
 * @package app\adminapi\controller
 */
class Order extends BaseApiController
{
    /**
     * 获取订单列表
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['order_status', ''],
        ]);
        return success('SUCCESS', (new OrderService())->getPage($data));
    }

    /**
     * 获取订单详情
     * @param $order_id
     * @return \think\Response
     */
    public function detail($order_id)
    {
        return success('SUCCESS', (new OrderService())->getDetail($order_id));
    }

    /**
     * 订单状态
     * @return \think\Response
     */
    public function status()
    {
        return success('SUCCESS', (new OrderService())->getStatus());
    }

    /**
     * 取消订单
     * @param int $order_id
     * @return \think\Response
     */
    public function cancel(int $order_id)
    {
        return success('SUCCESS', (new OrderService())->cancel($order_id));
    }

    /**
     * 删除订单
     * @param int $order_id
     * @return \think\Response
     */
    public function delete(int $order_id)
    {
        return success('DELETE_SUCCESS', (new OrderService())->delete($order_id));
    }

    /**
     * 订单确认
     * @return \think\Response
     */
    public function confirm()
    {
        $data = $this->request->params([
            ['sku', '[]'],
        ]);
        $data['sku'] = json_decode($data['sku'], true);
        $this->validate($data, 'addon\o2o\app\validate\Order.confirm');
        return success('SUCCESS', (new OrderService())->confirm($data));
    }

    /**
     * 订单计算
     * @return void
     */
    public function calculate()
    {
        $data = $this->request->params([
            ['sku', '[]'],
            ['delivery', []],
            ['technician_id', ''],
            ['reserve_service_time', '']
        ]);
        $data['sku'] = json_decode($data['sku'], true);
        $this->validate($data, 'addon\o2o\app\validate\Order.calculate');
        return success('SUCCESS',  (new OrderService())->calculate($data));
    }

    /**
     * 订单创建
     * @return void
     */
    public function create()
    {
        $data = $this->request->params([
            ['order_key', ''],
            ['member_remark', ''],
            ['technician_id', ''],
            ['reserve_service_time', ''],
            ['reserve_service_time_stamp','']
        ]);
        $this->validate($data, 'addon\o2o\app\validate\Order.create');
        return success('SUCCESS', (new OrderService())->create($data));
    }

    /**
     * 获取订单数量
     * @return \think\Response
     */
    public function getNum()
    {
        return success(( new OrderService() )->num());
    }
}
