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

namespace addon\tourism\app\service\admin\scenic;

use addon\tourism\app\model\Scenic;
use addon\tourism\app\service\admin\goods\GoodsDayService;
use app\service\core\sys\CoreAreaService;
use core\base\BaseAdminService;
use app\service\admin\sys\AreaService;
use core\exception\AdminException;

/**
 * 景点服务层
 * Class ScenicService
 * @package addon\tourism\app\service\admin\scenic
 */
class ScenicService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Scenic();
    }

    /**
     * 获取景点列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'scenic_id,site_id,scenic_name,scenic_level,open_time,full_address, scenic_cover,scenic_status,create_time,latitude,longitude';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['scenic_name','scenic_level','create_time'],$where)->field($field)->order($order)->append(['status_name','cover_thumb_small']);
        $list = $this->pageQuery($search_model);

        return $list;
    }

    /**
     * 获取景点信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = "scenic_id,site_id,poster_id,scenic_name,scenic_level,open_time,create_time,province_id,city_id,district_id,address,telephone,scenic_desc,surround,scenic_cover,scenic_images,latitude,longitude,full_address";
        $info = $this->model->field($field)->where([['scenic_id', '=', $id], ['site_id', '=', $this->site_id]])->append(['cover_thumb_small', 'image_thumb_small'])->findOrEmpty()->toArray();
        $info['province_name'] = (new AreaService())->getAreaName($info['province_id']);
        $info['city_name'] = (new AreaService())->getAreaName($info['city_id']);
        $info['district_name'] = (new AreaService())->getAreaName($info['district_id']);
        // 海报id，处理数据类型
        if (empty($info[ 'poster_id' ])) $info[ 'poster_id' ] = '';
        return $info;
    }

    /**
     * 添加景点
     * @param array $data
     * @return mixed
     */
    public function add(array $data, array $address)
    {
        $data['site_id'] = $this->site_id;
        $data['create_time'] = time();
        $data['scenic_status'] = 0;

        $data['province_id'] = (new AreaService())->getAreaId($address['province_name'], 1);
        $data['city_id'] = (new AreaService())->getAreaId($address['city_name'], 2);
        $data['district_id'] = (new AreaService())->getAreaId($address['district_name'], 3);

        $data['full_address'] = (new CoreAreaService())->getFullAddress($data['province_id'], $data['city_id'], $data['district_id'], $data['address']);
        $res = $this->model->create($data);
        return $res->scenic_id;

    }

    /**
     * 编辑景点
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data, array $address)
    {
        $data['update_time'] = time();

        $data['province_id'] = (new AreaService())->getAreaId($address['province_name'], 1);
        $data['city_id'] = (new AreaService())->getAreaId($address['city_name'], 2);
        $data['district_id'] = (new AreaService())->getAreaId($address['district_name'], 3);

        $data['full_address'] = (new CoreAreaService())->getFullAddress($data['province_id'], $data['city_id'], $data['district_id'], $data['address']);
        $this->model->where([['scenic_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        //价格日历处理
        if(isset($data['stock']))
        {
            (new GoodsDayService())->editGoodsDayStock($id, $data['stock']);
        }

        return true;
    }

    /**
     * 删除景点
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['scenic_id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return $res;
    }

    /**
     * 修改景点状态
     */
    public function editStatus(int $id, array $data){
        $count = (new TicketService())->ticketCount($id);
        if($count <= 0 && $data['scenic_status'] == 1) throw new AdminException('SCENIC_NOT_ALLOW_DOWN');
        $this->model->where([['scenic_id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }


    /**
     * 获取选择景点列表
     * @param array $where
     * @return array
     */
    public function getSelectPage(array $where = [])
    {
        $field = 'scenic_id,site_id,scenic_name,scenic_level,open_time,full_address, scenic_cover,scenic_status,create_time,latitude,longitude';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id],['scenic_status','=',1]])->withSearch(['scenic_name','scenic_level','create_time'],$where)->field($field)->order($order)->append(['status_name','cover_thumb_small']);
        $list = $this->pageQuery($search_model);

        return $list;
    }

}