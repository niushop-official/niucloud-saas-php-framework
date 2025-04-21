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

namespace addon\shop_fenxiao\app\service\core\agent;

use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;


/**
 * 任务配置
 */
class CoreAgentConfigService extends BaseCoreService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 设置
     * @param int $site_id
     * @param array $data
     * @return bool
     */
    public function setConfig(int $site_id, array $data)
    {
        $value = [
            'is_open' => $data['is_open'] ?? '0',
        ];
        $this->core_config_service->setConfig($site_id, 'SHOP_FENXIAO_AGENT_CONFIG', $value);
        return true;
    }

    /**
     * 获取设置
     * @param int $site_id
     */
    public function getConfig(int $site_id)
    {
        $data = $this->core_config_service->getConfigValue($site_id, 'SHOP_FENXIAO_AGENT_CONFIG');
        $value = [
            'is_open' => $data['is_open'] ?? '0',
        ];
        return $value;
    }

}
