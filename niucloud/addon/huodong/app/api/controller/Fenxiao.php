<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\huodong\app\api\controller;

use core\base\BaseApiController;
use think\Response;
use addon\huodong\app\service\api\FenxiaoService;


class Fenxiao extends BaseApiController
{
    public function getmyfxuser()
    {
        $res = ( new FenxiaoService() )->getmyfxuser();
        return success($res);
    }

    public function apply()
    {
        $res = ( new FenxiaoService() )->apply();
        return success($res);
    }

    public function teamlist()
    {
        $res = ( new FenxiaoService() )->teamlist();
        return success($res);
    }
}
