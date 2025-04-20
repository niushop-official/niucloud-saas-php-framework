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

namespace addon\ttcard\app\adminapi\controller\order;

use core\base\BaseAdminController;
use addon\ttcard\app\service\admin\order\OrderService;


/**
 * 订单管理控制器
 * Class Order
 * @package addon\ttcard\app\adminapi\controller\order
 */
class Order extends BaseAdminController
{
   /**
    * 获取订单管理列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["order_num",""],
             ["pay_status",""],
             ["user_id",""],
             ["authentication_id",""],
             ["ordertype_id",""],
             ["ordertype_viptype",""],
             ["order_type_diyname",""],
             ["paytime",""],
             ["create_time",""]
        ]);
        return success((new OrderService())->getPage($data));
    }

    /**
     * 订单管理详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new OrderService())->getInfo($id));
    }

    /**
     * 添加订单管理
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["order_num",""],
             ["pay_status",""],
             ["price",0.00],
             ["total_price",0.00],
             ["buy_num",0],
             ["address_id",0],
             ["user_id",0],
             ["authentication_id",0],
             ["product_id",0],
             ["ordertype_id",0],
             ["ordertype_viptype",""],
             ["order_type_diyname",""],
             ["paytime",0],
             ["create_time",0],

        ]);
        $this->validate($data, 'addon\ttcard\app\validate\order\Order.add');
        $id = (new OrderService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 订单管理编辑
     * @param $id  订单管理id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["order_num",""],
             ["pay_status",""],
             ["price",0.00],
             ["total_price",0.00],
             ["buy_num",0],
             ["address_id",0],
             ["user_id",0],
             ["authentication_id",0],
             ["product_id",0],
             ["ordertype_id",0],
             ["ordertype_viptype",""],
             ["order_type_diyname",""],
        ]);
        $this->validate($data, 'addon\ttcard\app\validate\order\Order.edit');
        (new OrderService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 订单管理删除
     * @param $id  订单管理id
     * @return \think\Response
     */
    public function del(int $id){
        (new OrderService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getUserAll(){
         return success(( new OrderService())->getUserAll());
    }

    public function getOrdertypeAll(){
         return success(( new OrderService())->getOrdertypeAll());
    }

}
