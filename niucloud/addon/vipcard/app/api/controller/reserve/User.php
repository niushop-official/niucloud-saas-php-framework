<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\vipcard\app\api\controller\reserve;

use addon\vipcard\app\service\api\reserve\ReserveUserService;
use core\base\BaseApiController;
use think\Response;

class User extends BaseApiController
{
    /**
     * 获取技师列表
     * @return Response
     */
    public function page(){
        return success((new ReserveUserService())->getPage());
    }

    /**
     * 获取技师列表不分页
     * @return Response
     */
    public function lists(){
        return success((new ReserveUserService())->getlists());
    }
}
