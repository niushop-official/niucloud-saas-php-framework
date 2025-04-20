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

use app\service\admin\site\SiteService;
use core\base\BaseAdminController;
use think\Response;

class Publics extends BaseAdminController
{
    /**
     * Hello World
     * @return Response
     */
    public function siteInfo()
    {
        $siteId = (int)$this->request->apiSiteId();
        if ($siteId <= 0) return fail('站点不存在');
        return success((new SiteService())->getInfo($siteId));
    }
}
