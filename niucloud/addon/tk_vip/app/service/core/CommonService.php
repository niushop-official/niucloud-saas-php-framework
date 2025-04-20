<?php

namespace addon\tk_vip\app\service\core;

use addon\tk_vip\app\dict\config\ConfigDict;
use app\service\core\sys\CoreConfigService;
use core\base\BaseAdminService;

/**
 * 公共的服务层
 */
class CommonService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();

    }
    public function getConfig($site_id)
    {
        $info = (new CoreConfigService())->getConfig($this->site_id, ConfigDict::getType());
        if (empty($info)) {
            $info['value']['level_id'] = '0';
            $info['value']['day'] = '0';
        }
        return $info['value'];
    }
}