<?php

namespace addon\tk_vip\app\service\core;

use addon\tk_vip\app\dict\config\ConfigDict;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;

/**
 * 配置信息服务层
 * Class ConfigService
 * @package addon\tk_jhkd\service\core\config
 */
class ConfigService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * 获取配置信息
     * @param $site_id
     * @param string $config_key
     */
    public function getConfig()
    {
        $info = (new CoreConfigService())->getConfig($this->site_id, ConfigDict::getType());
        if (empty($info)) {
            $info['value']['level_id'] = '';
            $info['value']['day'] = '0';
            $info['value']['over_type'] = 'common';
            $info['value']['over_time'] = '';
        }
        if(!isset($info['value']['over_type'])){
            $info['value']['over_type']='common';
        }
        if(!isset($info['value']['over_time'])){
            $info['value']['over_time']='';
        }
        return $info['value'];
    }
    public function getRealConfig()
    {
        $info = (new CoreConfigService())->getConfig($this->site_id, ConfigDict::getRealType());
        if (empty($info)) {
            $info['value']['open_real'] = '0';
            $info['value']['app_code'] = '';
            $info['value']['open_mobile_code'] = '';
            $info['value']['max_real_num'] = '0';
            $info['value']['is_auto'] = '0';
            $info['value']['field'] = '';
        }
        if(!isset($info['value']['is_upload_card'])){
            $info['value']['is_upload_card']='0';
        }
        return $info['value'];
    }
    /**
     * 设置配置信息
     * @param $site_id
     * @param string $config_key
     * @return string|null
     */
    public function setConfig($value)
    {

        (new CoreConfigService())->setConfig($this->site_id, ConfigDict::getType(), $value);

        return true;
    }
    public function setRealConfig($value)
    {

        (new CoreConfigService())->setConfig($this->site_id, ConfigDict::getRealType(), $value);

        return true;
    }

}