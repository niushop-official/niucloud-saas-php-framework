<?php

namespace addon\huodong\app\api\controller;

use addon\huodong\app\service\api\IndexService;
use core\base\BaseApiController;
use think\Response;
use think\facade\Db;
use think\facade\Cache;


class Index extends BaseApiController
{
   

    public function banner()
    {
        $res = ( new IndexService() )->getBanner();
        return success($res);
    }

    public function newsbao()
    {
        $res = ( new IndexService() )->newsbao();
        return success($res);
    }
    public function rank()
    {
        $res = ( new IndexService() )->getrank();
        return success($res);
    }
    public function getrankone()
    {
        $res = ( new IndexService() )->getrankone();
        return success($res);
    }

    public function config()
    {
        $res = ( new IndexService() )->getconfig();
        return success($res);
    }
}
