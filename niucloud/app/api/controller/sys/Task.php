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

namespace app\api\controller\sys;

use app\service\api\sys\TaskService;
use core\base\BaseApiController;
use think\Response;

class Task extends BaseApiController
{

    /**
     * 成长值任务
     * @return Response
     */
    public function growth(){
        return success((new TaskService())->getGrowthTask());
    }

    /**
     * 积分任务
     * @return Response
     */
    public function point() {
        return success((new TaskService())->getPointTask());
    }

}
