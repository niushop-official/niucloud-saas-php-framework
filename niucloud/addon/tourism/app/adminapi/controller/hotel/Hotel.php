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

use addon\tourism\app\dict\hotel\HotelTagDict;
use core\base\BaseAdminController;
use addon\tourism\app\service\admin\hotel\HotelService;


/**
 * 酒店控制器
 * Class TourismHotelController
 * @package app\adminapi\controller\tourism_hotel
 */
class Hotel extends BaseAdminController
{
    /**
     * 获取酒店列表
     * @return \think\Response
     */
    public function lists(){
        $data = $this->request->params([
            ["hotel_name",""],
            ['create_time', []],
            ["hotel_status", '']
        ]);
        return success((new HotelService())->getPage($data));
    }

    /**
     * 酒店详情
     * @param int $hotel_id
     * @return \think\Response
     */
    public function info(int $hotel_id){
        return success((new HotelService())->getInfo($hotel_id));
    }

    /**
     * 添加酒店
     * @return \think\Response
     */
    public function add(){
        $data = $this->request->params([
            ["hotel_name",""],
            ["hotel_star", 1],
            ['hotel_tag', ""],
            ["hotel_cover",""],
            ["hotel_images",""],
            ["hotel_attribute",""],
            ["province_id",''],
            ["city_id",''],
            ["district_id",''],
            ["address",""],
            ["latitude", ''],
            ["longitude", ''],
            ["poster_id", 0],
            ["hotel_desc", '', false],
            ["around_traffic", '', false],
            ["around_food", '', false],
        ]);
        $address = $this->request->params([
            ["province_name", ""],
            ["city_name", ""],
            ["district_name", ""]
        ]);

        $this->validate($data, 'addon\tourism\app\validate\hotel\Hotel.add');
        $id = (new HotelService())->add($data, $address);
        return success('ADD_SUCCESS', ['id' => $id]);
    }

    /**
     * 酒店编辑
     * @param $hotel_id  酒店id
     * @return \think\Response
     */
    public function edit($hotel_id){
        $data = $this->request->params([
            ["hotel_name",""],
            ["hotel_star", 1],
            ['hotel_tag', ""],
            ["hotel_cover",""],
            ["hotel_images",""],
            ["hotel_attribute",""],
            ["province_id",''],
            ["city_id",''],
            ["district_id",''],
            ["address",""],
            ["latitude", ''],
            ["longitude", ''],
            ["hotel_desc", '', false],
            ["around_traffic", '', false],
            ["around_food", '', false],
            ["poster_id", 0],
        ]);
        $address = $this->request->params([
            ["province_name", ""],
            ["city_name", ""],
            ["district_name", ""]
        ]);
        $this->validate($data, 'addon\tourism\app\validate\hotel\Hotel.edit');
        (new HotelService())->edit($hotel_id, $data, $address);
        return success('EDIT_SUCCESS');
    }


    /**
     * 获取酒店周边，基础设施
     */
    public function getPeriphery(){
        return success((new HotelService())->hotelPeriphery());
    }

    /**
     * 获取酒店状态
     */
    public function getHotelStatus(){
        return success('', HotelTagDict::getStatus());
    }

    /**
     * 修改酒店状态
     */
    public function editStatus($hotel_id){
        $data = $this->request->params([
            ["hotel_status",""],
        ]);
        (new HotelService())->editStatus($hotel_id, $data);
        return success();
    }

    /**
     * 获取选择酒店列表
     * @return \think\Response
     */
    public function select(){
        $data = $this->request->params([
            ["hotel_name",""],
            ['create_time', []],
        ]);
        return success((new HotelService())->getSelectPage($data));
    }

}
