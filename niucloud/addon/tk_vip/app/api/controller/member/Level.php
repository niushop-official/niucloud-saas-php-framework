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

namespace addon\tk_vip\app\api\controller\member;

use addon\tk_vip\app\service\api\MemberLevelService;
use core\base\BaseApiController;
use think\Response;

class Level extends BaseApiController
{

    public function lists() {
        return success((new MemberLevelService())->getList());
    }
    public function getInfo()
    {
        return success((new MemberLevelService())->getInfo());
    }
}
