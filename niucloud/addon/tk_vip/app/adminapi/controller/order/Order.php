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

namespace addon\tk_vip\app\adminapi\controller\order;

use app\service\admin\member\MemberService;
use core\base\BaseAdminController;
use addon\tk_vip\app\service\admin\order\OrderService;


/**
 * VIP订单控制器
 * Class Order
 * @package addon\tk_vip\app\adminapi\controller\order
 */
class Order extends BaseAdminController
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
        $this->validate($data, 'addon\tk_vip\app\validate\order\Order.add');
        $id = (new OrderService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
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
        $data = $this->request->params([
            ['keyword', ''],
            ['register_type', ''],
            ['register_channel', ''],
            ['create_time', []],
            ['member_label', 0],
            ['member_level', 0],
        ]);
        return success((new MemberService())->getPage($data));
    }

    public function getMemberLevelAll(){
         return success(( new OrderService())->getMemberLevelAll());
    }

}
