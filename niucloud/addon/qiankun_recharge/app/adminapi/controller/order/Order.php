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

namespace addon\qiankun_recharge\app\adminapi\controller\order;

use core\base\BaseAdminController;
use addon\qiankun_recharge\app\service\admin\order\OrderService;


/**
 * 充值订单控制器
 * Class Order
 * @package addon\qiankun_recharge\app\adminapi\controller\order
 */
class Order extends BaseAdminController
{
   /**
    * 获取充值订单列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["order_no",""],
             ["order_from",""],
             ["member_id",""],
             ["recharge_id",""],
             ["paid",""],
             ["pay_time",""],
             ["refund_status",""],
             ["create_time",""]
        ]);
        return success((new OrderService())->getPage($data));
    }

    /**
     * 充值订单详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new OrderService())->getInfo($id));
    }

    /**
     * 添加充值订单
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["order_no",""],
             ["order_from",""],
             ["order_type",""],
             ["out_trade_no",""],
             ["member_id",0],
             ["recharge_id",0],
             ["give_coupon",""],
             ["give_integral",0],
             ["give_price",0.00],
             ["paid",0],
             ["pay_time",0],
             ["refund_status",0],

        ]);
        $this->validate($data, 'addon\qiankun_recharge\app\validate\order\Order.add');
        $id = (new OrderService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 充值订单编辑
     * @param $id  充值订单id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["order_no",""],
             ["order_from",""],
             ["order_type",""],
             ["out_trade_no",""],
             ["member_id",0],
             ["recharge_id",0],
             ["give_coupon",""],
             ["give_integral",0],
             ["give_price",0.00],
             ["paid",0],
             ["pay_time",0],
             ["refund_status",0],

        ]);
        $this->validate($data, 'addon\qiankun_recharge\app\validate\order\Order.edit');
        (new OrderService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 充值订单删除
     * @param $id  充值订单id
     * @return \think\Response
     */
    public function del(int $id){
        (new OrderService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new OrderService())->getMemberAll());
    }

    public function getOptionsAll(){
         return success(( new OrderService())->getOptionsAll());
    }

}
