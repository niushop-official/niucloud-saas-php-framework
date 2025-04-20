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

namespace addon\tk_vip\app\api\controller\order;

use core\base\BaseApiController;
use addon\tk_vip\app\service\api\OrderService;


/**
 * VIP订单控制器
 * Class Order
 * @package addon\tk_vip\app\adminapi\controller\order
 */
class Order extends BaseApiController
{
   /**
    * 获取VIP订单列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["member_id",""],
             ["order_from",""],
             ["order_id",""],
             ["body",""],
             ["level_id",""],
             ["status",""],
             ["out_trade_no",""],
             ["update_time",["",""]]
        ]);
        return success((new OrderService())->getPage($data));
    }

    /**
     * VIP订单详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new OrderService())->getInfo($id));
    }

    /**
     * 添加VIP订单
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["level_id",0],
             ["sku_info",""],
             ["level_index",""],
             ["sku_index",""]
        ]);
        $this->validate($data, 'addon\tk_vip\app\validate\order\Order.add');
        return success('ADD_SUCCESS', (new OrderService())->add($data));
    }

    /**
     * VIP订单编辑
     * @param $id  VIP订单id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["member_id",0],
             ["order_from",""],
             ["order_id",""],
             ["body",""],
             ["level_id",0],
             ["sku_id",""],
             ["day",0],
             ["status",""],
             ["out_trade_no",""],
             ["pay_time",0],
             ["close_time",0],
             ["close_reason",""],
             ["remark",""],
             ["refund_status",""],

        ]);
        $this->validate($data, 'addon\tk_vip\app\validate\order\Order.edit');
        (new OrderService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * VIP订单删除
     * @param $id  VIP订单id
     * @return \think\Response
     */
    public function del(int $id){
        (new OrderService())->del($id);
        return success('DELETE_SUCCESS');
    }

    
    public function getMemberAll(){
         return success(( new OrderService())->getMemberAll());
    }

    public function getMemberLevelAll(){
         return success(( new OrderService())->getMemberLevelAll());
    }

}
