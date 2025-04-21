<?php

namespace addon\ly_shareholder\app\api\controller;

use addon\ly_shareholder\app\service\api\ConfigService;
use core\base\BaseApiController;
use think\Response;

class Config extends BaseApiController
{
    /**
     * 获取股东配置
     * @return Response
     */
    public function getShareholderConfig()
    {
        return success((new ConfigService())->getShareholderConfig());
    }
}
