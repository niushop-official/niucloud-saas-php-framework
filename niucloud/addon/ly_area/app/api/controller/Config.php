<?php

namespace addon\ly_area\app\api\controller;

use addon\ly_area\app\service\api\ConfigService;
use core\base\BaseApiController;
use think\Response;

class Config extends BaseApiController
{
    /**
     * 获取代理配置
     * @return Response
     */
    public function getAreaConfig()
    {
        return success((new ConfigService())->getAreaConfig());
    }
}
