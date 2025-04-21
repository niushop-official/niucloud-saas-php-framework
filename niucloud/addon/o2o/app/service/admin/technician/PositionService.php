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

namespace addon\o2o\app\service\admin\technician;

use addon\o2o\app\model\Position;
use core\base\BaseAdminService;

/**
 * 岗位服务层
 * Class PositionService
 * @package app\service\admin\technician
 */
class PositionService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Position();
    }

    /**
     * 获取岗位列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id, site_id, name, desc, create_time';
        $order = 'id desc';
        $search_model = $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'name'], $where)->field($field)->order($order);
        return $this->pageQuery($search_model);
    }

    /**
     * 获取岗位列表
     * @param array $where
     * @return array
     */
    public function getList(array $where = [])
    {
        $field = 'id, site_id, name, desc, create_time';
        $order = 'id desc';
        return $this->model->where([ [ 'site_id', '=', $this->site_id ] ])->withSearch([ 'name'], $where)->field($field)->order($order)->select()->toArray();
    }

    /**
     * 获取岗位信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id, site_id, name, desc, create_time';
        return $this->model->field($field)->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
    }

    /**
     * 获取全部
     * @return array
     */
    public function getAll(){
        $field = 'id, name';
        return $this->model->where([['site_id', '=', $this->site_id]])->field($field)->select()->toArray();
    }

    /**
     * 添加岗位
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $data['create_time'] = time();
        $res = $this->model->create($data);
        return $res->id;
    }

    /**
     * 删除岗位
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return $res;
    }

    /**
     * 编辑岗位
     * @param array $data
     * @return mixed
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

}