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

namespace addon\tourism\app\adminapi\controller\scenic;

use core\base\BaseAdminController;
use addon\tourism\app\service\admin\scenic\TicketService;
use addon\tourism\app\service\admin\goods\GoodsDayService;

/**
 * 门票控制器
 * Class TourismGoodsController
 * @package app\adminapi\controller\tourism_goods
 */
class Ticket extends BaseAdminController
{
    /**
     * 获取门票列表
     * @return \think\Response
     */
    public function lists(){
        $data = $this->request->params([
            ["goods_name",""],
            ["scenic_id", 0],
            ['create_time', []]
        ]);
        return success((new TicketService())->getPage($data));
    }

    /**
     * 门票详情
     * @param int $goods_id
     * @return \think\Response
     */
    public function info(int $goods_id){
        return success((new TicketService())->getInfo($goods_id));
    }

    /**
     * 添加门票
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
            ["goods_name",""],
            ["scenic_id",0],
            ["goods_content",""],
            ["price",0.00],
            ["stock",0],
            ["member_discount",''],
            ["buy_info", ""]
        ]);
        $this->validate($data, 'addon\tourism\app\validate\scenic\Ticket.add');
        $id = (new TicketService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 门票编辑
     * @param $goods_id  商品表id
     * @return \think\Response
     */
    public function edit($goods_id){
        $data = $this->request->params([
            ["goods_name",""],
            ["goods_content",""],
            ["price",0.00],
            ["stock",0],
            ["member_discount",''],
            ["buy_info", ""]
        ]);
        $this->validate($data, 'addon\tourism\app\validate\scenic\Ticket.edit');
        (new TicketService())->edit($goods_id, $data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 门票删除
     * @param $goods_id  商品表id
     * @return \think\Response
     */
    public function del(int $goods_id){
        (new TicketService())->del($goods_id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 修改状态
     */
    public function editStatus($id){
        $data = $this->request->params([
            ["status",""],
        ]);
        (new TicketService())->editStatus($id, $data);
        return success();
    }

    /**
     * 添加价格日历
     */
    public function addDatePrice(){
        $data = $this->request->params([
            [ "is_set",1 ],
            [ "price",0.00 ],
            [ "goods_id",""],
            [ "start_date",""],
            [ "end_date",""],
            [ "member_price",""]
        ]);
        (new GoodsDayService())->addDatePrice($data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 查找价格日历
     */
    public function getDatePrice($id){
        return success((new GoodsDayService())->getInfo($id));
    }

    /**
     * 获取门票日历列表
     * @return \think\Response
     */
    public function datePriceLists(){
        $data = $this->request->params([
            ["goods_id",""],
        ]);
        return success((new GoodsDayService())->getPage($data['goods_id']));
    }
}
