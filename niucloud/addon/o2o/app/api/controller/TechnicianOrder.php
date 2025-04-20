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

use addon\o2o\app\service\api\technician\TechnicianOrderService;
use core\base\BaseApiController;

/**
 * 订单控制器
 * Class GoodsController
 * @package app\adminapi\controller
 */
class TechnicianOrder extends BaseApiController
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
        return success('SUCCESS', (new TechnicianOrderService())->getPage($data));
    }

    /**
     * 获取订单详情
     * @param int $id
     * @return \think\Response
     */
    public function detail(int $id)
    {
        return success('SUCCESS', (new TechnicianOrderService())->getDetail($id));
    }

    /**
     * 订单状态
     * @return \think\Response
     */
    public function status()
    {
        return success('SUCCESS', (new TechnicianOrderService())->getStatus());
    }

    /**
     * 订单转单
     * @return \think\Response
     */
    public function transfer()
    {
        $data = $this->request->params([
            ['order_id', ''],
        ]);
        return success('SUCCESS', (new TechnicianOrderService())->orderTransfer($data));
    }

    /**
     * 开始服务
     * @return \think\Response
     */
    public function orderService()
    {
        $data = $this->request->params([
            ['order_id', ''],
            ['check_code', ''],
        ]);
        $this->validate($data, 'addon\o2o\app\validate\TechnicianOrder.orderService');
        return success('SUCCESS', (new TechnicianOrderService())->orderService($data));
    }

    /**
     * 添加服务项目
     * @return \think\Response
     */
    public function addItem()
    {
        $data = $this->request->params([
            ['order_id', ''],
            ['item_name', ''],
            ['item_images', ''],
            ['price', ''],
        ]);
        $this->validate($data, 'addon\o2o\app\validate\TechnicianOrder.addItem');
        return success('SUCCESS', (new TechnicianOrderService())->orderAddItem($data));
    }

    /**
     * 编辑服务项目
     * @return \think\Response
     */
    public function editItem()
    {
        $data = $this->request->params([
            ['order_item_id', ''],
            ['item_name', ''],
            ['item_images', ''],
            ['price', ''],
        ]);
        $this->validate($data, 'addon\o2o\app\validate\TechnicianOrder.editItem');
        return success('SUCCESS', (new TechnicianOrderService())->orderEditItem($data));
    }
    /**
     * 删除服务项目
     * @return \think\Response
     */
    public function delItem(int $id)
    {
        return success('SUCCESS', (new TechnicianOrderService())->orderDelItem(['order_item_id' => $id]));
    }

    /**
     * 完成
     * @return \think\Response
     */
    public function finish()
    {
        $data = $this->request->params([
            ['order_id', ''],
        ]);
        return success('SUCCESS', (new TechnicianOrderService())->orderServiceFinish($data));
    }

    /**
     * 订单数量
     * @return \think\Response
     */
    public function stat()
    {
        return success('SUCCESS', (new TechnicianOrderService())->stat());
    }


}
