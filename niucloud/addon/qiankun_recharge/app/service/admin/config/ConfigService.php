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

namespace addon\qiankun_recharge\app\service\admin\config;

use addon\qiankun_recharge\app\model\config\Config;

use core\base\BaseAdminService;


/**
 * 充值设置服务层
 * Class ConfigService
 * @package addon\qiankun_recharge\app\service\admin\config
 */
class ConfigService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Config();
    }

    /**
     * 获取充值设置列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,open,min_recharge,recharge_desc';
        $order = '';

        $search_model = $this->model->where([['site_id', "=", $this->site_id]])->withSearch([], $where)->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取充值设置信息
     * @param int $id
     * @return array
     */
    public function getInfo()
    {
        $field = 'id,site_id,open,min_recharge,recharge_desc';

        $info = $this->model->field($field)->where([['site_id', "=", $this->site_id]])->findOrEmpty()->toArray();
        $info['open'] = intval($info['open']);
        return $info;
    }

    /**
     * 添加充值设置
     * @param array $data
     * @return mixed
     */
    public function add(array $data)
    {
        if ($res = $this->model->where('site_id', $this->site_id)->find()) {
            $this->model->where('site_id', $this->site_id)->update($data);
        } else {
            $data['site_id'] = $this->site_id;
            $res = $this->model->create($data);
        }
        return $res->id;

    }

    /**
     * 充值设置编辑
     * @param int $id
     * @param array $data
     * @return bool
     */
    public function edit(int $id, array $data)
    {

        $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->update($data);
        return true;
    }

    /**
     * 删除充值设置
     * @param int $id
     * @return bool
     */
    public function del(int $id)
    {
        $model = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->find();
        $res = $model->delete();
        return $res;
    }

}
