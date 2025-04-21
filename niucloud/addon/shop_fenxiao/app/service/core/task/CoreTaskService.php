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

namespace addon\shop_fenxiao\app\service\core\task;

use addon\shop_fenxiao\app\dict\task\TaskDict;
use addon\shop_fenxiao\app\model\task\Task;
use core\base\BaseCoreService;


/**
 * 团队配置
 */
class CoreTaskService extends BaseCoreService
{
    //系统配置文件

    public function __construct()
    {
        parent::__construct();
        $this->model = new Task();
    }

    /**
     * 活动开始
     * @param $task
     * @return void
     */
    public function checkOpen($task)
    {

        //时间交集(判断是否已经开始)
        $now_time = time();
        $start_time = is_numeric($task['start_time']) ? $task['start_time'] : strtotime($task['start_time']);
        $end_time = is_numeric($task['end_time']) ? $task['end_time'] : strtotime($task['end_time']);
        if ($task['time_type'] == 1) {
            if (!($start_time <= $now_time && $end_time >= $now_time)) {
                return true;
            }
        } else {
            if (!($start_time <= $now_time)) {
                return true;
            }
        }
        //todo  只有未结束的活动可以结束
        $task->save(
            [
                'status' => TaskDict::NORMAL
            ]
        );
        return true;
    }

    /**
     * 批量开始活动
     * @param $ids
     * @param $site_id
     * @return void
     */
    public function batchOpen($ids, $site_id = 0)
    {

    }

    /**
     * 主动关闭活动
     * @param $id
     * @return void
     */
    public function finish($id, $site_id = 0)
    {
        //todo  只有未结束的活动可以结束
        $condition = array(
            ['id', '=', $id],
        );
        if ($site_id > 0) {
            $condition[] = ['site_id', '=', $site_id];
        }
        $this->model->where($condition)->update(
            [
                'status' => TaskDict::FINISH
            ]
        );

        return true;
    }

}
