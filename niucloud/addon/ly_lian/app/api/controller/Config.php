<?php

namespace addon\ly_lian\app\api\controller;

use addon\ly_lian\app\service\api\ConfigService;
use core\base\BaseApiController;
use think\Response;

class Config extends BaseApiController
{
    /**
     * 获取链动配置
     * @return Response
     */
    public function getLianConfig()
    {
        return success((new ConfigService())->getLianConfig());
    }
}
