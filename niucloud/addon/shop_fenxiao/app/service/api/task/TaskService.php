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

namespace addon\shop_fenxiao\app\service\api\task;

use addon\shop_fenxiao\app\dict\task\TaskDict;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoLevel;
use addon\shop_fenxiao\app\model\task\Task;
use addon\shop_fenxiao\app\model\task\TaskMemberReward;
use addon\shop_fenxiao\app\service\core\task\CoreTaskMemberService;
use core\base\BaseApiService;


/**
 * 任务服务层
 */
class TaskService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Task();
    }

    /**
     * 任务分页
     * @return void`
     */
    public function getPage(array $where = [])
    {
        $field = 'id,site_id,type, cover,name, time_type, start_time,end_time,rules,level_type, level, times, status, remark, send_time,create_time';
        $order = 'id desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])
            ->withSearch(['name', 'create_time', 'status'], $where)
            ->field($field)
            ->with([
                'task_member' => function ($item) {
                    $item->where([['member_id', '=', $this->member_id]])->withField('id, task_id, member_id, total_reward_money, is_complete, progress, create_time, complete_num, send_num, progress,order_money, order_num, child_num');
                },
            ])
            ->append(['status_name', 'level_type_name', 'type_name', 'cover_thumb_mid'])
            ->order($order);
        $fenxiao_level_model = new FenxiaoLevel();
        $core_task_member = (new CoreTaskMemberService());
        return $this->pageQuery($search_model, function ($item) use ($fenxiao_level_model, $core_task_member) {
            if ($item['level_type'] == TaskDict::PART_LEVEL) {
                $item['level_data'] = $fenxiao_level_model->where([['level_id', 'in', $item['level']]])->column('level_name', 'level_id');
            }

            if (!empty($item->toArray()['task_member'])) {
                $item['task_member']['task_data'] = $core_task_member->getTaskProgress($item['task_member']->toArray(), $item);
            } else {
                $item['task_data'] = $core_task_member->getMinCondition($item);
            }
        });
    }

    /**
     * 详情
     * @param int $task_id
     * @return array
     */
    public function getInfo(int $task_id)
    {
        $field = 'id,site_id,type,name, cover,time_type, start_time,end_time,rules,level_type, level, times, status, remark, send_time, create_time';
        $task = $this->model->where([['id', '=', $task_id]])->field($field)->append(['status_name', 'level_type_name', 'type_name', 'cover_thumb_mid'])
            ->with([
                'task_member' => function ($item) {
                    $item->where([['member_id', '=', $this->member_id]])
                        ->withField('id, task_id, member_id, total_reward_money, is_complete, progress, create_time, complete_num, send_num, order_money, order_num, child_num')
                        ->with([
                            'task_member_reward' => function ($query) {
                                $query->withField('id,site_id,task_id,member_id,from_id,step,reward_money,is_complete,complete_time,is_send,send_time,create_time');
                            },
                        ]);
                }
            ])
            ->findOrEmpty();
        if (!$task->isEmpty()) {
            //可参与的等级
            if ($task['level_type'] == TaskDict::PART_LEVEL) {
                $fenxiao_level_model = new FenxiaoLevel();
                $task['level_data'] = $fenxiao_level_model->where([['level_id', 'in', $task['level']]])->column('level_name', 'level_id');
            }

            //将任务调整为可视化数据
            if (!empty($task['task_member'])) {
                $task['task_member']['task_data'] = (new CoreTaskMemberService())->getTaskProgress($task['task_member']->toArray(), $task);
            } else {
                $task['task_data'] = (new CoreTaskMemberService())->getMinCondition($task);
            }
        }
        return $task->toArray();
    }

    /**
     * 奖励记录
     * @param int $task_id
     * @return array
     */
    public function getRewardList(int $task_id)
    {
        $field = 'id,site_id,task_id,member_id,from_id,step,reward_money,is_complete,complete_time,is_send,send_time,create_time, send_timer';
        return (new TaskMemberReward())->where([
            ['task_id', '=', $task_id],
            ['member_id', '=', $this->member_id],
            ['site_id', '=', $this->site_id],
        ])->field($field)
            ->select()->toArray();
    }
}
