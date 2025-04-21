<?php

namespace addon\ly_area\app\service\api;

use addon\ly_area\app\service\core\CoreAreaConfigService;
use core\base\BaseApiService;


class ConfigService extends BaseApiService
{
    public function getAreaConfig(){
        
        $data = [
            'area_config' => (new CoreAreaConfigService())->getAreaConfig($this->site_id),
        ];

        return $data;
    }


}