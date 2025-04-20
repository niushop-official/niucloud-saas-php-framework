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

namespace addon\vipcard\app\service\admin\reserve;

use addon\vipcard\app\model\ReserveUser;
use core\base\BaseAdminService;

/**
 * 预约服务层
 * Class VipcardReserveService
 * @package app\service\admin\reserve
 */
class ReserveUserService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new ReserveUser();
    }

    /**
     * 获取技师列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $where[] = ['site_id', '=', $this->site_id];
        $field = 'id, site_id, name, mobile, seniority, number, position, headimg, create_time, status';
        $order = 'create_time desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(["name","create_time"], $where)->field($field)->order($order)->append(['image_thumb_small']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取技师列表(不分页)
     * @param array $where
     * @return array
     */
    public function getList(array $where = [])
    {
        $where[] = ['site_id', '=', $this->site_id];
        $field = 'id, site_id, name, mobile, seniority, number, position, headimg, create_time, status';
        $order = 'create_time desc';
        $list = $this->model->where([['site_id', '=', $this->site_id], ['status', '=', 1]])->withSearch(["name","create_time"], $where)->field($field)->order($order)->append(['image_thumb_small'])->select()->toArray();
        return $list;
    }

    /**
     * 获取技师信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id, site_id, name, mobile, seniority, number, position, headimg, create_time, status, create_time';

        $info = $this->model->field($field)->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty()->append(['image_thumb_small'])->toArray();
        return $info;
    }

    /**
     * 添加技师
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
     * 删除技师
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->delete();
        return $res;
    }

    /**
     * 编辑技师
     * @param array $data
     * @return mixed
     */
    public function edit(int $id, array $data)
    {
        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 更新状态
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function editStatus(int $id, array $data){
        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

}