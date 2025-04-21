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

namespace addon\vipcard\app\service\api\reserve;

use addon\vipcard\app\model\ReserveUser;
use core\base\BaseApiService;

/**
 * 预约服务层
 * Class ReserveService
 * @package app\service\api\reserve
 */
class ReserveUserService extends BaseApiService
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
        $field = 'id,site_id,name,mobile,seniority,number,position,headimg,create_time';
        $order = 'create_time desc';

        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->field($field)->order($order);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取技师列表不分页
     * @param array $where
     * @return array
     */
    public function getlists(array $where = [])
    {
        $field = 'id,site_id,name,mobile,seniority,number,position,headimg,create_time,status';
        $order = 'create_time desc';

        $list = $this->model->where([['site_id', '=', $this->site_id], ['status', '=', 1]])->field($field)->order($order)->select()->toArray();
        return $list;
    }
}