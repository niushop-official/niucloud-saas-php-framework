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

namespace addon\tourism\app\service\admin\hotel;

use addon\tourism\app\dict\hotel\RoomTagDict;
use addon\tourism\app\model\Goods;
use addon\tourism\app\service\admin\goods\GoodsDayService;
use core\base\BaseAdminService;
use core\exception\AdminException;

/**
 * 房型
 * Class TourismGoodsService
 * @package app\service\admin\tourism_goods
 */
class RoomService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 获取房型列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'site_id,hotel_id,goods_id,member_discount,fixed_discount,goods_name,goods_type,hotel_id,goods_cover,goods_image,goods_content,goods_attribute,status,sort,price,sale_price,cost_price,create_time,stock,sell_type,buy_info';
        $order = '';
        $search_model = $this->model->where([['site_id', '=', $this->site_id],['hotel_id', '=', $where['hotel_id']],['goods_type', '=', "room"]])->withSearch(["goods_name","create_time"], $where)->field($field)->order($order)->append(['status_name','cover_thumb_small']);

        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取房型信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'site_id,goods_name,stock,member_discount,fixed_discount,goods_type,hotel_id,goods_cover,goods_image,goods_content,goods_attribute,status,sort,price,create_time,room_bed,room_area,room_stay,room_floor,buy_info';

        return $this->model->field($field)->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->append(['image_thumb_small','cover_thumb_small'])->findOrEmpty()->toArray();
    }

    /**
     * 添加房型
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $data['create_time'] = time();
        $data['goods_type'] = "room";
        $info = $this->model->where([['hotel_id', '=', $data['hotel_id']], ['is_default', '=', 1]])->field("goods_id")->findOrEmpty();
        if($info->isEmpty()) $data['is_default'] = 1;

        $res = $this->model->create($data);
        return $res->goods_id;
    }

    /**
     * 房型编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        //更新价格日历总库存
        if(isset($data['stock'])){
            (new GoodsDayService())->editGoodsDayStock($id, $data['stock']);
        }
        return true;
    }

    /**
     * 删除房型
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $info = $this->model->where([['goods_id', '=', $id]])->field("hotel_id,is_default,status")->findOrEmpty()->toArray();
        $count = $this->model->where([['goods_id', '<>', $id], ['hotel_id', '=', $info['hotel_id']], ['site_id', '=', $this->site_id], ['status', '=', 1]])->count();
        $hotel = (new HotelService())->getInfo($info['hotel_id']);
        if($info['status'] == 1 && $hotel['hotel_status'] == 1 && $count < 1){
            throw new AdminException('LAST_ROOM_NOT_DELETE');
        }

        if($info['is_default'] == 1){
            $other_info = $this->model->where([['goods_id', '<>', $id], ['status', '=', 1], ['hotel_id', '=', $info['hotel_id']]])->field("goods_id")->order("price asc")->findOrEmpty();
            if($other_info) $this->model->where([['goods_id', '=', $other_info['goods_id']], ['site_id', '=', $this->site_id]])->update(['is_default' => 1]);
        }

        $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update(['delete_time' => time(), 'is_default' => 0]);
        return true;
    }

    /**
     * 获取酒店周边，基础设施
     */
    public function roomPeriphery(){
        return RoomTagDict::getTag();
    }

    /**
     * 修改房型排序号
     * @param int $id
     * @param array $data
     * @return Goods|bool
     */
    public function editSort($id, $data)
    {
        return $this->model->where([ [ 'goods_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update([ 'sort' => $data[ 'sort' ] ]);
    }

    /**
     * 修改房型状态
     */
    public function editStatus(int $id, array $data){
        $info = $this->model->where([['goods_id', '=', $id]])->field("hotel_id,is_default,status")->findOrEmpty()->toArray();

        //房型下架的时候验证
        $hotel = (new HotelService())->getInfo($info['hotel_id']);
        //如果当前酒店上架中并且没有其他上架的房型，当前房型不允许下架
        if($hotel['hotel_status'] == 1 && $info['status'] == 1){
            $res = $this->model->where([['hotel_id', '=', $info['hotel_id']], ['status', '=', 1]])->count();
            if($res <= 1){
                throw new AdminException('ROOM_NOT_ALLOW_DOWN');
            }
        }

        //下架的时候 如果是默认酒店 则取消当前酒店默认，重新设置新的
        if($info['status'] == 1 && $info['is_default'] == 1){
            $data['is_default'] = 0;
            $info = $this->model->where([['goods_id', '<>', $id], ['status', '=', 1], ['hotel_id', '=', $info['hotel_id']]])->field("goods_id")->order("price asc")->findOrEmpty();

            if($info) $this->model->where([['goods_id', '=', $info['goods_id']], ['site_id', '=', $this->site_id]])->update(['is_default' => 1]);
        }

        //房型上架的时候验证存不存在默认酒店，不存在设置当前为默认

        if($info['status'] == 0){
            $info = $this->model->where([['is_default', '=', 1], ['hotel_id', '=', $info['hotel_id']]])->field("goods_id")->findOrEmpty();
            if($info->isEmpty()) $data['is_default'] = 1;
        }


        $this->model->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 获取酒店上架房型数量
     */
    public function roomCount($hotel_id){
        $res = $this->model->where([['hotel_id', '=', $hotel_id], ['status', '=', 1]])->select()->count();
        return $res;
    }

}
