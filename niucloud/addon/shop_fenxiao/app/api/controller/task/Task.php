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

namespace addon\shop_fenxiao\app\api\controller\task;

use addon\shop_fenxiao\app\service\api\task\TaskService;
use core\base\BaseApiController;
use think\Response;


/**
 * 分销订单
 */
class Task extends BaseApiController
{

    /**
     * 列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['create_time', []],
            ['status', '']
        ]);
        return success((new TaskService())->getPage($data));
    }

    /**
     * 详情
     * @param int $id
     * @return Response
     */
    public function info(int $task_id)
    {
        return success((new TaskService())->getInfo($task_id));
    }

    /**
     * 奖励记录
     * @param int $task_id
     * @return Response
     */
    public function getRewardList(int $task_id)
    {
        return success((new TaskService())->getRewardList($task_id));
    }
}
