<?php

namespace addon\ly_area\app\api\controller;

use addon\ly_area\app\service\api\AreaLevelService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 区域代理级别控制器
 * Class AreaLevel
 * @package addon\ly_arean\app\admin\controller
 */
class AreaLevel extends BaseAdminController
{
    /**
     * 区域代理级别列表
     * @return Response
     */
    public function lists()
    {

        return success((new AreaLevelService())->getList());
    }

    /**
     * 区域代理级别详情
     * @param int $id
     * @return Response
     */
    public function info($id)
    {
        return success((new AreaLevelService())->getInfo($id));
    }
}
