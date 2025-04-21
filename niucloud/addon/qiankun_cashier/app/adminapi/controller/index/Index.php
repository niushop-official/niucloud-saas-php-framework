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

namespace addon\qiankun_cashier\app\adminapi\controller\index;

use core\base\BaseAdminController;
use core\dict\DictLoader;
use think\Response;

class Index extends BaseAdminController
{
    /**
     * Hello World
     * @return Response
     */
    public function addons()
    {
        $addons = get_site_addons($this->request->siteId());
        return success('SUCCESS', $addons);
    }
}
