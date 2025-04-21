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

namespace app\adminapi\controller\wxoplatform;

use app\service\admin\wxoplatform\OplatformService;
use core\base\BaseAdminController;
use think\Response;

class Oplatform extends BaseAdminController
{
    /**
     * 获取授权链接
     * @return Response
     */
    public function getAuthorizationUrl()
    {
        return success(data:(new OplatformService())->createPreAuthorizationUrl());
    }

    /**
     * 授权
     * @return Response
     */
    public function authorization() {
        $data = $this->request->params([
            ['auth_code', ''],
            ['expires_in', ''],
        ]);
        return success((new OplatformService())->authorization($data));
    }
}
