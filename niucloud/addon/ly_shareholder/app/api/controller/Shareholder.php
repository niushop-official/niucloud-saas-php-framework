<?php

namespace addon\ly_shareholder\app\api\controller;

use addon\ly_shareholder\app\service\api\ShareholderService;
use core\base\BaseApiController;
use think\Response;

class Shareholder extends BaseApiController
{

    /**
     * 股东详情
     * @return Response
     */
    public function info()
    {
        return success((new shareholderservice)->getInfo());
    }

    /**
     * 股东详情
     * @return Response
     */
    public function detail()
    {
        return success((new ShareholderService())->getDetail());
    }

    /**
     * 获取股东账户信息
     */
    public function account()
    {
        return success((new ShareholderService())->getAccount());
    }


    public function OrderStat(){
        return success((new ShareholderService())->getShareholderOrderStat());
    }


    public function accountDetail(){
        return success((new ShareholderService())->getAccountDetail());
    }

}
