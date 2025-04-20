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

namespace addon\transfer\app\adminapi\controller\order;

use core\base\BaseAdminController;
use addon\transfer\app\service\admin\order\OrderService;


/**
 * 转赠支付订单控制器
 * Class Order
 * @package addon\transfer\app\adminapi\controller\order
 */
class Order extends BaseAdminController
{
   /**
    * 获取转赠支付订单列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["order_no",""],
             ["order_from",""],
             ["out_trade_no",""],
             ["order_status",""],
             ["member_id",""],
             ["ip",""],
             ["order_money",""],
             ["create_time",""],
             ["pay_time",""],
             ["close_time",""],
             ["log_id",""],
             ["order_type",""]
        ]);
        return success((new OrderService())->getPage($data));
    }

    /**
     * 转赠支付订单详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new OrderService())->getInfo($id));
    }

    /**
     * 添加转赠支付订单
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["order_no",""],
             ["order_from",""],
             ["out_trade_no",""],
             ["order_status",0],
             ["member_id",0],
             ["ip",""],
             ["order_money",0.00],
             ["pay_time",0],
             ["close_time",0],
             ["log_id",0],
             ["order_type",""]
        ]);
        $this->validate($data, 'addon\transfer\app\validate\order\Order.add');
        $id = (new OrderService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 转赠支付订单编辑
     * @param $id  转赠支付订单id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["order_no",""],
             ["order_from",""],
             ["out_trade_no",""],
             ["order_status",0],
             ["member_id",0],
             ["ip",""],
             ["order_money",0.00],
             ["pay_time",0],
             ["close_time",0],
             ["log_id",0],
             ["order_type",""]
        ]);
        $this->validate($data, 'addon\transfer\app\validate\order\Order.edit');
        (new OrderService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 转赠支付订单删除
     * @param $id  转赠支付订单id
     * @return \think\Response
     */
    public function del(int $id){
        (new OrderService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
}
