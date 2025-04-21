<?php

namespace addon\qiankun_recharge\app\service\api;

use addon\qiankun_recharge\app\model\config\Config;
use core\base\BaseApiService;

class ConfigService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Config();
    }

    /**
     * @return array
     */
    public function getConfig(): array
    {
        $info = $this->model->where([['site_id', "=", $this->site_id]])->findOrEmpty()->toArray();
        $info['open'] = intval($info['open']);
        return $info;
    }
}