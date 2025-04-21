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


use addon\shop\app\service\core\delivery\CoreDeliveryService;
use core\base\BaseAdminService;


/**
 * 物流公司服务层
 * Class CompanyService
 * @package addon\shop\app\service\admin\delivery
 */
class DeliveryService extends BaseAdminService
{
    protected $core_delivery_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_delivery_config_service = new CoreDeliveryService();
    }

    /**
     * 设置名称
     * @param $key
     * @param $data
     * @return array|true
     */
    public function setConfig($data)
    {
        return $this->core_delivery_config_service->setConfig($this->site_id, 'SHOP_DELIVERY_CONFIG', $data);
    }

    /**
     * 获取配置信息
     */
    public function getDeliveryConfigList()
    {
        return $this->core_delivery_config_service->getDeliveryList($this->site_id);
    }

    /**
     * 获取配置信息
     */
    public function getDeliveryList()
    {
        return $this->core_delivery_config_service->getDeliveryConfig($this->site_id);
    }

}
