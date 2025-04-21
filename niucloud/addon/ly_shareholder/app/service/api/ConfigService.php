<?php

namespace addon\ly_shareholder\app\service\api;
use addon\ly_shareholder\app\service\core\CoreConfigService;
use core\base\BaseApiService;


class ConfigService extends BaseApiService
{
    public function getShareholderConfig(){
        
        $data = [
            'shareholder_config' => (new CoreConfigService())->getShareholderConfig($this->site_id),
        ];

        return $data;
    }


}