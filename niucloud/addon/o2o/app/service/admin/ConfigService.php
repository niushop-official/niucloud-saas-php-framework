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

namespace addon\o2o\app\service\admin;

use addon\o2o\app\service\core\CoreOrderConfigService;
use core\base\BaseAdminService;


/**
 * 订单设置服务层
 * Class ConfigService
 * @package adaddon\o2o\app\service\admin
 */
class ConfigService extends BaseAdminService
{

    public $order_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->order_config_service = new CoreOrderConfigService();
    }

    /**
     * 交易设置
     * @param array $params
     * @return array
     */
    public function setConfig($params)
    {
        $params['site_id'] = $this->site_id;
        return $this->order_config_service->setConfig($params);
    }

    /**
     * 获取交易设置
     * @return array
     */
    public function getConfig()
    {
        return $this->order_config_service->getConfig($this->site_id);
    }

    /**
     * 获取配置信息
     * @return array|null
     */
    public function getReserveConfig()
    {
        return $this->order_config_service->getReserveConfig($this->site_id);
    }

    /**
     * 设置配置
     * @param array $data
     * @return \app\model\sys\SysConfig|bool|\think\Model
     */
    public function setReserveConfig(array $data){
        return $this->order_config_service->setReserveConfig($this->site_id, $data);
    }

}
