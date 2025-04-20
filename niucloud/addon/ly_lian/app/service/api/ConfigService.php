<?php

namespace addon\ly_lian\app\service\api;
use addon\ly_lian\app\service\core\CoreConfigService;
use core\base\BaseApiService;


class ConfigService extends BaseApiService
{
    public function getLianConfig(){
        
        $data = [
            'lian_config' => (new CoreConfigService())->getLianConfig($this->site_id),
        ];

        return $data;
    }
}