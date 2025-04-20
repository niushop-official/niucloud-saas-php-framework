<?php

namespace addon\ly_area\app\service\admin;

use addon\ly_area\app\service\core\CoreAreaConfigService;
use addon\ly_area\app\service\core\CoreConfigService;
use core\base\BaseAdminService;

class AreaConfigService extends BaseAdminService
{
    /**
     * 获取股东配置
     * @return array
     * 
     */
    public function setAreaConfig($params){
        return (new CoreAreaConfigService())->setAreaConfig($this->site_id, $params);
    }

    public function getAreaConfig(){
        return (new CoreAreaConfigService())->getAreaConfig($this->site_id);
    }


}