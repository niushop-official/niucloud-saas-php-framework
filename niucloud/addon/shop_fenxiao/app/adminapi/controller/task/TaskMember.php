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

namespace addon\shop_fenxiao\app\adminapi\controller\task;

use addon\shop_fenxiao\app\service\admin\task\TaskMemberService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 任务奖励
 */
class TaskMember extends BaseAdminController
{

    /**
     * 列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['task_id', 0],
//            ['status', ''],
            ['search', '']
        ]);
        return success((new TaskMemberService())->getPage($data));
    }

    /**
     * 详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new TaskMemberService())->getInfo($id));
    }

}
