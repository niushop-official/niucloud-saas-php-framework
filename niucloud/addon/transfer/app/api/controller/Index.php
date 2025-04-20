<?php

namespace addon\transfer\app\api\controller;

use addon\transfer\app\service\api\IndexService;
use core\base\BaseApiController;
use think\Response;
use think\facade\Db;
use think\facade\Cache;


class Index extends BaseApiController
{
    public function config()
    {
        $res = ( new IndexService() )->getconfig();
        return success($res);
    }
}
