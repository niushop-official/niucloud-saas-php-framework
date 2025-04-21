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

namespace addon\huodong\app\adminapi\controller\order;

use core\base\BaseAdminController;
use addon\huodong\app\service\admin\order\OrderService;


/**
 * 报名记录控制器
 * Class Order
 * @package addon\huodong\app\adminapi\controller\order
 */
class Order extends BaseAdminController
{
   /**
    * 获取报名记录列表
    * @return \think\Response
    */
    public function lists(){
        $data = $this->request->params([
             ["order_no",""],
             ["order_from",""],
             ["out_trade_no",""],
             ["order_status",""],
             ["refund_status",""],
             ["member_id",""],
            ["act_id",""],
            ["order_money",""],
             ["create_time",""],
            ['pid','']
        ]);
        return success((new OrderService())->getPage($data));
    }

    /**
     * 报名记录详情
     * @param int $id
     * @return \think\Response
     */
    public function info(int $id){
        return success((new OrderService())->getInfo($id));
    }

    /**
     * 添加报名记录
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
             ["order_no",""],
             ["order_from",""],
             ["out_trade_no",""],
             ["order_status",0],
             ["refund_status",0],
             ["ip",""],
             ["order_money",0.00],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\order\Order.add');
        $id = (new OrderService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 报名记录编辑
     * @param $id  报名记录id
     * @return \think\Response
     */
    public function edit(int $id){
        $data = $this->request->params([
             ["order_no",""],
             ["order_from",""],
             ["out_trade_no",""],
             ["order_status",0],
             ["refund_status",0],
             ["ip",""],
             ["order_money",0.00],

        ]);
        $this->validate($data, 'addon\huodong\app\validate\order\Order.edit');
        (new OrderService())->edit($id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 报名记录删除
     * @param $id  报名记录id
     * @return \think\Response
     */
    public function del(int $id){
        (new OrderService())->del($id);
        return success('DELETE_SUCCESS');
    }
    public function status()
    {
        return success(( new OrderService() )->getStatus());
    }
    
    public function getMemberAll(){
         return success(( new OrderService())->getMemberAll());
    }
    public function hexiao(){
        (new OrderService())->hexiao();
        return success('核销成功');
    }
}
