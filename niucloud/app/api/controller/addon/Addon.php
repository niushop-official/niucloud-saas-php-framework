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

namespace app\api\controller\addon;

use app\service\api\addon\AddonService;
use core\base\BaseApiController;
use think\Response;

class Addon extends BaseApiController
{

    /**
     * 查询已安装插件
     * @return Response
     */
    public function getInstallList(){
        return success(data:(new AddonService())->getInstallList());
    }
}
