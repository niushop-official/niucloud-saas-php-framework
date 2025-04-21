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

namespace addon\tourism\app\adminapi\controller\hotel;

use addon\tourism\app\service\admin\goods\GoodsService;
use core\base\BaseAdminController;
use addon\tourism\app\service\admin\hotel\RoomService;
use addon\tourism\app\service\admin\goods\GoodsDayService;

/**
 * 商品表控制器
 * Class TourismGoodsController
 * @package app\adminapi\controller\tourism_goods
 */
class Room extends BaseAdminController
{
    /**
     * 获取房型列表
     * @return \think\Response
     */
    public function lists(){
        $data = $this->request->params([
            ["goods_name",""],
            ["hotel_id", 0],
            ['create_time', []]
        ]);
        return success((new RoomService())->getPage($data));
    }

    /**
     * 房型详情
     * @param int $room_id
     * @return \think\Response
     */
    public function info(int $room_id){
        return success((new RoomService())->getInfo($room_id));
    }

    /**
     * 添加房型
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
            ["goods_name",''],
            ["hotel_id",0],
            ["goods_cover",''],
            ["goods_image",''],
            ["goods_attribute", ''],
            ["goods_content",''],
            ["price", 0.00],
            ["stock",0],
            ["room_bed", ''],
            ["room_area", ''],
            ["room_stay", ''],
            ["room_floor", ''],
            ["member_discount", ''],
            ["buy_info", '']
        ]);
        $this->validate($data, 'addon\tourism\app\validate\hotel\Room.add');
        $id = (new RoomService())->add($data);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 房型编辑
     * @param $room_id
     * @return \think\Response
     */
    public function edit($room_id){
        $data = $this->request->params([
            ["goods_name",''],
            ["goods_cover",''],
            ["goods_image",''],
            ["goods_attribute", ''],
            ["goods_content",''],
            ["price", 0.00],
            ["stock",0],
            ["room_bed", ''],
            ["room_area", ''],
            ["room_stay", ''],
            ["room_floor", ''],
            ["member_discount", ''],
            ["buy_info", '']
        ]);
        $this->validate($data, 'addon\tourism\app\validate\hotel\Room.edit');
        (new RoomService())->edit($room_id, $data);
        return success('EDIT_SUCCESS', ['id' => $room_id]);
    }

    /**
     * 房型删除
     * @param $room_id  商品表id
     * @return \think\Response
     */
    public function del(int $room_id){
        (new RoomService())->del($room_id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 添加价格日历
     */
    public function addDatePrice(){
        $data = $this->request->params([
            [ "price",0.00 ],
            [ "goods_id",""],
            [ "start_date",""],
            [ "end_date",""],
            [ "member_price",0],
            [ "is_set", 1]
        ]);
        (new GoodsDayService())->addDatePrice($data);
        return success('EDIT_SUCCESS');
    }

    /**
     * 获取门票列表
     * @return \think\Response
     */
    public function datePriceLists(){
        $data = $this->request->params([
            ["goods_id",""],
        ]);
        return success((new GoodsDayService())->getPage($data['goods_id']));
    }

    /**
     * 获取酒店周边，基础设施
     */
    public function getPeriphery(){
        return success((new RoomService())->roomPeriphery());
    }

    /**
     * 修改房型排序号
     * @return \think\Response
     */
    public function editSort($id)
    {
        $data = $this->request->params([
            [ 'sort', '' ],
        ]);
        ( new RoomService() )->editSort($id,$data);
        return success('SUCCESS');
    }

    /**
     * 修改房型状态
     */
    public function editStatus($id){
        $data = $this->request->params([
            ["status",""],
        ]);
        (new RoomService())->editStatus($id, $data);
        return success();
    }

    /**
     * 获取上架房型数量
     */
    public function getRoomCount($hotel_id){
        return success('', (new RoomService())->roomCount($hotel_id));
    }

    /**
     * 查询商品用于选择
     * @return \think\Response
     * @throws \think\db\exception\DbException
     */
    public function getListOfSelect(){
        $data = $this->request->params([
            ["goods_type",""],
            ["create_time", []],
            ['goods_name', '']
        ]);
        return success((new GoodsService())->getListOfSelect($data));
    }

}
