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

namespace addon\ttcard\app\service\admin\cardbackground;

use addon\ttcard\app\model\cardbackground\Cardbackground;

use core\base\BaseAdminService;


/**
 * 背景图管理服务层
 * Class CardbackgroundService
 * @package addon\ttcard\app\service\admin\cardbackground
 */
class CardbackgroundService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Cardbackground();
    }

    /**
     * 获取背景图管理列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,title,type,image,create_time,status';
        $order = '';

        $search_model = $this->model->where([ [ 'site_id' ,"=", $this->site_id ] ])->withSearch(["title","type","create_time","status"], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取背景图管理信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,title,type,image,create_time,status';

        $info = $this->model->field($field)->where([['id', "=", $id]])->findOrEmpty()->toArray();
        $info['type'] = strval($info['type']);
        $info['status'] = strval($info['status']);
        return $info;
    }

    /**
     * 添加背景图管理
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['site_id'] = $this->site_id;
        $data[ 'create_time' ] = time();
        $res = $this->model->create($data);
        return $res->id;

    }

    /**
     * 背景图管理编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $data[ 'create_time' ] = time();
        $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除背景图管理
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id],['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }
    
}
