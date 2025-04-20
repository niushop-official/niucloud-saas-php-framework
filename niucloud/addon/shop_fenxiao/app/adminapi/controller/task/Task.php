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

use addon\shop_fenxiao\app\dict\task\TaskDict;
use addon\shop_fenxiao\app\service\admin\task\TaskService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 分销订单
 */
class Task extends BaseAdminController
{

    /**
     * 获取任务列表
     * @return Response
     */
    public function pages()
    {
        $data = $this->request->params([
            ['create_time', []],
            ['name', ''],
            ['status', '']
        ]);
        return success((new TaskService())->getPage($data));
    }

    /**
     * 分销任务详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new TaskService())->getInfo($id));
    }

    /**
     * 添加
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['name', ''],
            ['cover', ''],
            ['time_type', ''],
            ['start_time', 0],
            ['end_time', 0],
            ['rules', []],
            ['remark', ''],
            ['level_type', ''],
            ['level', []],
            ['times', 1],
            ['send_time', 0],
            ['send_time_type', '']
        ]);
        $this->validate($data, 'addon\shop_fenxiao\app\validate\task\Task.add');
        return success('ADD_SUCCESS', (new TaskService())->add($data));
    }

    /**
     * 修改
     * @param int $id
     * @return Response
     */
    public function edit(int $id)
    {
        $data = $this->request->params([
            ['name', ''],
            ['cover', ''],
            ['time_type', ''],
            ['start_time', 0],
            ['end_time', 0],
            ['rules', []],
            ['remark', ''],
            ['level_type', ''],
            ['level', []],
            ['times', 1],
            ['send_time', 0],
            ['send_time_type', '']
        ]);
        $this->validate($data, 'addon\shop_fenxiao\app\validate\task\Task.edit');
        return success('EDIT_SUCCESS', (new TaskService())->edit($id, $data));
    }

    /**
     * 删除代理商等级
     * @param int $id
     * @return Response
     */
    public function del(int $id)
    {
        (new TaskService())->del($id);
        return success('DELETE_SUCCESS');
    }

    /**
     * 任务失效
     * @param int $id
     * @return Response
     */
    public function finish(int $id)
    {
        (new TaskService())->finish($id);
        return success();
    }

    /**
     * 任务状态
     * @return Response
     */
    public function getStatus()
    {
        return success(TaskDict::getStatus());
    }
}
