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

use addon\tourism\app\dict\goods\GoodsDict;
use addon\tourism\app\model\Hotel;
use addon\tourism\app\service\admin\goods\GoodsService;
use app\service\core\sys\CoreAreaService;
use core\base\BaseAdminService;
use app\service\admin\sys\AreaService;
use addon\tourism\app\dict\hotel\HotelTagDict;
use core\exception\AdminException;

/**
 * 酒店服务层
 * Class TourismHotelService
 * @package app\service\admin\tourism_hotel
 */
class HotelService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Hotel();
    }

    /**
     * 获取酒店列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = ['site_id', '=', $this->site_id];
        $field = 'hotel_id,hotel_name,site_id,hotel_star,hotel_tag, hotel_cover,hotel_images,hotel_attribute,create_time,full_address,hotel_status';
        $order = 'create_time desc';

        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(["hotel_name","create_time","hotel_status"], $where)->field($field)->order($order)->append(['hotel_status_name','cover_thumb_small']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取酒店信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'site_id,hotel_name,poster_id,hotel_star,hotel_tag,hotel_desc,hotel_cover,hotel_images,hotel_attribute,create_time,province_id,city_id,district_id,address,full_address,longitude,latitude,hotel_status';
        $info = $this->model->field($field)->where([['hotel_id', '=', $id], ['site_id', '=', $this->site_id]])->append(['image_thumb_small','cover_thumb_small'])->findOrEmpty()->toArray();
        $info['province_name'] = (new AreaService())->getAreaName($info['province_id']);
        $info['city_name'] = (new AreaService())->getAreaName($info['city_id']);
        $info['district_name'] = (new AreaService())->getAreaName($info['district_id']);
        // 海报id，处理数据类型
        if (empty($info[ 'poster_id' ])) $info[ 'poster_id' ] = '';
        return $info;
    }

    /**
     * 添加酒店
     * @param array $data
     * @return mixed
     */
    public function add(array $data, array $address)
    {
        $data['site_id'] = $this->site_id;
        $data['create_time'] = time();
        $data['hotel_status'] = 0;

        $data['province_id'] = (new AreaService())->getAreaId($address['province_name'], 1);
        $data['city_id'] = (new AreaService())->getAreaId($address['city_name'], 2);
        $data['district_id'] = (new AreaService())->getAreaId($address['district_name'], 3);

        $data['full_address'] = (new CoreAreaService())->getFullAddress($data['province_id'], $data['city_id'], $data['district_id'], $data['address'], '');
        $res = $this->model->create($data);
        return $res->hotel_id;

    }

    /**
     * 酒店编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data, array $address)
    {
        $data['province_id'] = (new AreaService())->getAreaId($address['province_name'], 1);
        $data['city_id'] = (new AreaService())->getAreaId($address['city_name'], 2);
        $data['district_id'] = (new AreaService())->getAreaId($address['district_name'], 3);

        $data['full_address'] = (new CoreAreaService())->getFullAddress($data['province_id'], $data['city_id'], $data['district_id'], $data['address'], '');
        $this->model->where([['hotel_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除酒店
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['hotel_id', '=', $id], ['site_id', '=', $this->site_id]])->update(['delete_time' => time()]);
        return true;
    }

    /**
     * 获取酒店周边，基础设施
     */
    public function hotelPeriphery(){
        return HotelTagDict::getTag();
    }

    /**
     * 修改酒店状态
     */
    public function editStatus(int $id, array $data){
        $count = (new RoomService())->roomCount($id);
        if($count <= 0 && $data['hotel_status'] == 1) throw new AdminException('HOTEL_NOT_ALLOW_DOWN');
        $this->model->where([['hotel_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 获取选择酒店列表
     * @param array $where
     * @return array
     */
    public function getSelectPage(array $where = [])
    {
        $where[] = ['site_id', '=', $this->site_id];
        $field = 'hotel_id,hotel_name,site_id,hotel_star,hotel_tag, hotel_cover,hotel_images,hotel_attribute,create_time,full_address,hotel_status';
        $order = 'create_time desc';

        $search_model = $this->model->where([['site_id', '=', $this->site_id],['hotel_status','=',HotelTagDict::UP]])->withSearch(["hotel_name","create_time","hotel_status"], $where)->field($field)->order($order)->append(['hotel_status_name','cover_thumb_small']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

}
