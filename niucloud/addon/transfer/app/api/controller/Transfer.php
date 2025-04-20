<?php

namespace addon\transfer\app\api\controller;

use addon\transfer\app\service\api\TransferService;
use core\base\BaseApiController;
use think\Response;
use think\facade\Db;
use think\facade\Cache;


class Transfer extends BaseApiController
{

    public function checkmember()
    {
        $res = ( new TransferService() )->checkmember();
        return success($res);
    }

    public function transfer_balance()
    {
        $res = ( new TransferService() )->transfer_balance();
        return success($res);
    }

    public function transfer_point()
    {
        $res = ( new TransferService() )->transfer_point();
        return success($res);
    }

    public function transfer_coupon()
    {
        $res = ( new TransferService() )->transfer_coupon();
        return success($res);
    }

    public function transfer_commission()
    {
        $res = ( new TransferService() )->transfer_commission();
        return success($res);
    }

}
