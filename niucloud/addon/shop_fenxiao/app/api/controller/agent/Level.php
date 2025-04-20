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

namespace addon\shop_fenxiao\app\api\controller\agent;

use addon\shop_fenxiao\app\service\api\agent\AgentLevelService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 代理商等级
 */
class Level extends BaseAdminController
{

    /**
     * 代理商等级列表
     * @return Response
     */
    public function getList()
    {
        return success((new AgentLevelService())->getList());
    }

}
