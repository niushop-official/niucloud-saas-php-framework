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

namespace addon\qiankun_recovery\app\service;

use addon\qiankun_recovery\app\model\Config;

use core\base\BaseAdminService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 * 充值设置服务层
 * Class ConfigService
 * @package addon\qiankun_recovery\app\service\admin\config
 */
class ConfigService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Config();
    }

    public function get()
    {
        $config = $this->model->where('site_id', $this->site_id)->findOrEmpty()->toArray();
        if ($config) {
            $config['rules'] = json_decode($config['rules'], true);
        }
        return $config;
    }

    /**
     * 添加充值设置
     * @param array $data
     * @return mixed
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function add(array $data): mixed
    {
        $data['rules'] = json_encode($data['rules']);
        if ($res = $this->model->where('site_id', $this->site_id)->find()) {
            $this->model->where('site_id', $this->site_id)->update($data);
        } else {
            $data['site_id'] = $this->site_id;
            $res = $this->model->create($data);
        }
        return $res->id;
    }

}
