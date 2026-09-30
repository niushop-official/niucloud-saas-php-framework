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

namespace app\adminapi\controller\site;

use app\service\admin\site\SiteCreateFlowService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 站点创建流程
 * Class SiteCreateFlow
 * @description 站点创建流程
 * @package app\adminapi\controller\site
 */
class SiteCreateFlow extends BaseAdminController
{
    /**
     * 站点创建流程（主流程 + 子流程）
     * @description 站点创建流程
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['flow_id', ''],
            ['sub_flow_id', ''],
            ['with_sub', 1]
        ]);
        return success((new SiteCreateFlowService())->getList($data));
    }
}
