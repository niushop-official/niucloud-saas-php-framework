<?php

namespace addon\ly_lian\app\service\admin;

use addon\ly_lian\app\service\core\CoreConfigService;
use core\base\BaseAdminService;

class ConfigService extends BaseAdminService
{
    /**
     * 获取股东配置
     * @return array
     * 
     */
    public function setLianConfig($params){
        return (new CoreConfigService())->setLianConfig($this->site_id, $params);
    }

    public function getLianConfig(){
        return (new CoreConfigService())->getLianConfig($this->site_id);
    }


}