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

namespace addon\shop\app\service\admin\goods;

use addon\shop\app\model\goods\Service;
use core\base\BaseAdminService;


/**
 * 商品服务服务层
 * Class ServeService
 * @package addon\shop\app\service\admin\goods
 */
class ServiceService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Service();
    }

    /**
     * 获取商品服务列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'service_id,service_name,image,desc,create_time,update_time';
        $order = 'create_time desc';

        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "service_name" ], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取商品服务列表
     * @param array $where
     * @param string $field
     * @return array
     */
    public function getList(array $where = [], $field = 'service_id,service_name,image,desc,create_time,update_time')
    {
        $order = "create_time desc";
        return $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ "service_name" ], $where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取商品服务信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'service_id,service_name,image,desc,create_time,update_time';

        $info = $this->model->field($field)->where([ [ 'service_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加商品服务
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data[ 'create_time' ] = time();
        $data[ 'site_id' ] = $this->site_id;
        $res = $this->model->create($data);
        return $res->service_id;
    }

    /**
     * 商品服务编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $data[ 'update_time' ] = time();
        $this->model->where([ [ 'service_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->update($data);
        return true;
    }

    /**
     * 删除商品服务
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([ [ 'service_id', '=', $id ], [ 'site_id', '=', $this->site_id ] ])->find();
        $res = $model->delete();
        return $res;
    }
}
