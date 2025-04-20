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

namespace addon\shop\app\service\admin\delivery;

use addon\shop\app\model\delivery\Deliver;
use core\base\BaseAdminService;


/**
 * 配送员服务层
 * Class DeliverService
 * @package addon\shop\app\service\admin\delivery
 */
class DeliverService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Deliver();
    }

    /**
     * 获取配送员列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'deliver_id,deliver_name,deliver_mobile';
        $order = 'deliver_id desc';

        $search_model = $this->model->where([['site_id', '=', $this->site_id] ])->withSearch(["deliver_name", "deliver_mobile"], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'deliver_id,deliver_name,deliver_mobile';
        $info = $this->model->field($field)->where([['deliver_id', '=', $id], ['site_id', '=', $this->site_id] ])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 添加
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        $data['create_time'] = time();
        $data['site_id'] = $this->site_id;
        $res = $this->model->create($data);
        return $res->deliver_id;
    }

    /**
     * 编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {
        $data['modify_time'] = time();
        $this->model->where([['deliver_id', '=', $id], ['site_id', '=', $this->site_id] ])->update($data);
        return true;
    }

    /**
     * 删除
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $res = $this->model->where([['deliver_id', '=', $id], ['site_id', '=', $this->site_id] ])->delete();
        return $res;
    }

}
