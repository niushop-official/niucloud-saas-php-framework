<?php

namespace addon\transfer\app\api\controller;

use addon\transfer\app\service\api\DuihuanService;
use core\base\BaseApiController;
use think\Response;
use think\facade\Db;
use think\facade\Cache;


class Duihuan extends BaseApiController
{


    public function balance_point()
    {
        $res = ( new DuihuanService() )->balance_point();
        return success($res);
    }
    public function point_balance()
    {
        $res = ( new DuihuanService() )->point_balance();
        return success($res);
    }


    public function commission_balance()
    {
        $res = ( new DuihuanService() )->commission_balance();
        return success($res);
    }


}
