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

namespace app\adminapi\controller\task;

use app\dict\sys\TaskDict;
use app\service\admin\task\TaskService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 统一任务管理
 * Class Task
 * @description 统一任务管理
 * @package app\adminapi\controller\task
 */
class Task extends BaseAdminController
{
    /**
     * 当前进行中的任务
     * @description 获取当前站点进行中的任务列表（按站点隔离；互斥任务与非互斥任务可并行）
     *              返回 list（全部进行中任务）、queue_alive（队列是否可用）与优先展示的任务字段
     * @return Response
     */
    public function getActiveTask()
    {
        return success(data: ( new TaskService() )->getActive());
    }

    /**
     * 任务筛选配置
     * @description 返回任务类型与状态筛选项（label/value），避免前端写死
     *              类型按当前端下发（平台端 admin / 站点端 site），含事件扩展的任务类型
     * @return Response
     */
    public function getConfig()
    {
        return success(data: [
            'app_type' => TaskService::appType(),
            'types'    => TaskDict::getTypeOptions(TaskService::appType()),
            'status'   => TaskDict::getStatusOptions(),
        ]);
    }

    /**
     * 创建任务
     * @description 创建任务（自动做全局单实例校验）
     * @param $task_type cloud_build / upgrade
     * @return Response
     */
    public function create($task_type)
    {
        $data = $this->request->params([
            [ 'params', [] ],
        ]);
        return success(data: ( new TaskService() )->create($task_type, $data[ 'params' ] ?: []));
    }

    /**
     * 任务详情
     * @description 获取任务详情
     * @param $task_key
     * @return Response
     */
    public function detail($task_key)
    {
        return success(data: ( new TaskService() )->detail($task_key));
    }

    /**
     * 驱动任务
     * @description 推进任务一片/一步（终态任务不可驱动）
     *              队列可用时只回显当前状态不推进（driven_by=queue），前端可传 force=1 强制接管
     * @param $task_key
     * @return Response
     */
    public function run($task_key)
    {
        $data = $this->request->params([
            [ 'cursor', '' ],
            [ 'force', 0 ],
        ]);
        return success(data: ( new TaskService() )->run($task_key, (string) $data[ 'cursor' ], !empty($data[ 'force' ])));
    }

    /**
     * 用户操作
     * @description 处理 waiting_input 状态下的用户决策
     * @param $task_key
     * @return Response
     */
    public function operate($task_key)
    {
        $data = $this->request->params([
            [ 'code', '' ],
        ]);
        return success(data: ( new TaskService() )->operate($task_key, (string) $data[ 'code' ]));
    }

    /**
     * 取消任务
     * @description 取消任务
     * @param $task_key
     * @return Response
     */
    public function cancel($task_key)
    {
        return success(data: ( new TaskService() )->cancel($task_key));
    }

    /**
     * 终端输出事件
     * @description 获取任务终端输出事件（增量 / 全量回放）
     * @param $task_key
     * @return Response
     */
    public function getEvents($task_key)
    {
        $data = $this->request->params([
            [ 'after_seq', 0 ],
            [ 'limit', 0 ],
        ]);
        return success(data: ( new TaskService() )->getEvents($task_key, (int) $data[ 'after_seq' ], (int) $data[ 'limit' ]));
    }

    /**
     * 任务步骤审计
     * @description 获取任务节点审计记录
     * @param $task_key
     * @return Response
     */
    public function getSteps($task_key)
    {
        return success(data: ( new TaskService() )->getSteps($task_key));
    }

    /**
     * 任务产物
     * @description 获取任务产物（产物目录树 + 压缩包信息）
     * @param $task_key
     * @return Response
     */
    public function getArtifacts($task_key)
    {
        $data = $this->request->params([
            [ 'depth', 2 ],
            [ 'type', '' ], // 产物口径的任务类型：同一 task_key 可能对应多条记录时显式指定
        ]);
        return success(data: ( new TaskService() )->getArtifacts($task_key, (int) $data[ 'depth' ], (string) $data[ 'type' ]));
    }

    /**
     * 下载任务产物
     * @description 下载任务产物（path 为空下载压缩包，否则下载产物内指定文件）
     * @param $task_key
     * @return Response|\think\response\File
     */
    public function downloadArtifact($task_key)
    {
        $data = $this->request->params([
            [ 'path', '' ],
            [ 'type', '' ],
        ]);
        return ( new TaskService() )->downloadArtifact($task_key, (string) $data[ 'path' ], (string) $data[ 'type' ]);
    }

    /**
     * 任务记录分页列表
     * @description 任务记录分页列表
     * @return Response
     */
    public function getRecords()
    {
        $data = $this->request->params([
            [ 'task_type', '' ],
            [ 'status', '' ],
            [ 'task_key', '' ],
            [ 'title', '' ],
        ]);
        return success(data: ( new TaskService() )->getRecords($data));
    }

    /**
     * 删除任务记录（同步清理任务目录）
     * @description 删除任务记录
     * @return Response
     */
    public function delRecords()
    {
        $data = $this->request->params([
            [ 'ids', '' ],
        ]);
        ( new TaskService() )->delRecords($data[ 'ids' ]);
        return success('DELETE_SUCCESS');
    }
}
