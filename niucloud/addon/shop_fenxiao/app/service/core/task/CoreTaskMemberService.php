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
use addon\shop_fenxiao\app\model\task\TaskMember;
use addon\shop_fenxiao\app\model\task\TaskMemberReward;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoDataService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoService;
use core\base\BaseCoreService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;
use think\facade\Db;


/**
 * 团队配置
 */
class CoreTaskMemberService extends BaseCoreService
{
    //系统配置文件
    public $config = [];

    public function __construct()
    {
        parent::__construct();
        $this->model = new TaskMember();
    }

    /**
     * 参与或维护会员任务
     * @param $site_id
     * @param $member_id
     * @param $data
     * @return void
     */
    public function set($site_id, $member_id, $data)
    {
        $this->config = (new CoreTaskConfigService())->getConfig($site_id);
        if ($this->config['is_open'] == 1) {
            $fenxiao = (new CoreFenxiaoService())->findOfAction($site_id, $member_id);

            $fenxiao_level_id = $fenxiao['level_id'];
            if ($fenxiao->isEmpty()) return true;
            //查询正在进行中的任务
            $task_model = new Task();
            $task_list = $task_model->where([['site_id', '=', $site_id], ['status', '=', TaskDict::NORMAL]])->select();
            $task_ids = array_column($task_list->toArray(), 'id');
            $member_task_column = $this->model->where([['site_id', '=', $site_id], ['task_id', 'in', $task_ids], ['member_id', '=', $member_id]])->column('*', 'task_id');
            //查询当前参与的任务

            foreach ($task_list as $item_task) {
                if ($item_task['level_type'] == TaskDict::ALL_LEVEL || ($item_task['level_type'] == TaskDict::ALL_LEVEL && in_array($fenxiao_level_id, $item_task['level']))) {
                    $item_task_id = $item_task['id'];//任务id
                    $member_task_item = $member_task_column[$item_task_id] ?? [];

                    if (empty($member_task_item)) {//未参与  .去参与
                        $this->join($site_id, $member_id, $item_task, $data);
                    } else {//已参与, 去维护数据
                        $this->update($site_id, $member_id, $item_task, $member_task_item, $data);
                    }
                }
            }
        }
        return true;
    }

    /**
     * 参与任务
     * @param $site_id
     * @param $member_id
     * @param $task_id
     * @return void
     */
    public function join($site_id, $member_id, $task, $data)
    {
        $insert_data = [
            'site_id' => $site_id,
            'member_id' => $member_id,
            'task_id' => $task['id'],
        ];

        $rules = $task['rules'];//规则
        $rule = $rules[0] ?? [];
        $rule_condition = $rule['condition'] ?? [];
        $rule_condition_type_array = $rule_condition['type'] ?? [];
        $rule_condition_type = $rule_condition_type_array[0];
        foreach ($data as $k => $v) {
            if (in_array($k, $rule_condition_type_array)) {
                $insert_data[$k] = $v;
            }

        }
        $member_task = $this->model->create(array_merge($insert_data, $data));
        //核验奖励指标
        $this->checkReward($site_id, $member_id, $task);
        return true;
    }

    /**
     * 核验任务奖励
     * @param $site_id
     * @param $member_id
     * @param $task
     * @param $member_task
     * @return void
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function checkReward($site_id, $member_id, $task, $member_task = [])
    {
        $task_id = $task['id'];
        $now_time = time();
        if (empty($member_task)) {
            $member_task = $this->model->where([['site_id', '=', $site_id], ['member_id', '=', $member_id], ['task_id', '=', $task_id]])->findOrEmpty();
            if ($member_task->isEmpty()) return;
        }
        $condition = [
            ['site_id', '=', $site_id],
            ['member_id', '=', $member_id],
            ['task_id', '=', $task_id],
        ];
        $task_member_reward_list = (new TaskMemberReward())->where($condition)->select()->toArray();
        $task_member_reward_count = count($task_member_reward_list);
        $rules = $task['rules'];//规则
        $times = $task['times'];
        $type = $task['type'];
        if($type == TaskDict::LOOP){//循环任务
            if($times > 0 && $task_member_reward_count >= $times){
                return true;
            }
        }
        $rule = $rules[0] ?? [];
        $rule_condition = $rule['condition'] ?? [];
        $rule_condition_type_array = $rule_condition['type'] ?? [];
        $rule_condition_type = $rule_condition_type_array[0];

        $reward = $rule['reward'];
        $reward_money = $reward['commission'];
        if (!isset($rule_condition[$rule_condition_type])) return true;
        $condition_num = $rule_condition[$rule_condition_type];
        $progress = $member_task[$rule_condition_type] / $condition_num;
        $complete_num = floor($progress);

        if($type == TaskDict::LOOP){//循环任务
            if($times > 0 && $complete_num >= $times){
                $complete_num = $times;
            }
        }
        //计算预计的发放时间
        $send_time_type = $task['send_time_type'];
        if ($send_time_type == TaskDict::SEND_TIME_ACTIVITY_FINISH) {
            $send_timer = $now_time + $task['send_time'] * 86400;
        } else {
            $send_timer = $task['send_time'];
        }
        $insert_data = [];
        $diff_total_reward_money = 0;
        for ($i = ($task_member_reward_count + 1); $i <= $complete_num; $i++) {
            $insert_data[] = [
                'site_id' => $site_id,
                'member_id' => $member_id,
                'task_id' => $task_id,
                'from_id' => $member_task['id'],
                'step' => $i,
                'reward_money' => $reward_money,
                'is_complete' => 1,
                'complete_time' => time(),
                'send_timer' => $send_timer
            ];
            $diff_total_reward_money += $reward_money;
        }

        //设置完成数量
        (new TaskMember())->where($condition)->update(
            [
                'complete_num' => $complete_num,
                'progress' => floor($progress * 10000) / 100,
                'is_complete' => 1,
                'total_reward_money' => Db::raw('total_reward_money + ' . $diff_total_reward_money)
            ]
        );
        (new TaskMemberReward())->insertAll($insert_data);
        return true;

    }

    /**
     * 编辑
     * @return void
     */
    public function update($site_id, $member_id, $task, $member_task, $data)
    {
        $task_id = $task['id'];
        $condition = [
            ['site_id', '=', $site_id],
            ['member_id', '=', $member_id],
            ['task_id', '=', $task_id],
        ];
        $update_data = [
            'site_id' => $site_id,
            'member_id' => $member_id,
            'task_id' => $task['id'],
        ];

        $rules = $task['rules'];//规则
        $rule = $rules[0] ?? [];
        $rule_condition = $rule['condition'] ?? [];
        $rule_condition_type_array = $rule_condition['type'] ?? [];
        $rule_condition_type = $rule_condition_type_array[0];
        foreach ($data as $k => $v) {
            if (in_array($k, $rule_condition_type_array)) {
                $update_data[$k] = Db::raw($k . '+' . $v);
            }
        }
        $this->model->where($condition)->update($update_data);
        //核验奖励指标
        $this->checkReward($site_id, $member_id, $task);
        return true;
    }

    /**
     * 将会员参与任务的数据处理为可视数据
     * @param $member_task
     * @param $task
     * @return void
     */
    public function getTaskProgress($member_task, $task)
    {
        $progress = $member_task['progress'];//计算
        $times = $task['times'];
        $type = $task['type'];
        if ($type == TaskDict::LOOP) {//循环任务
            $rules = $task['rules'] ?? [];
            $rule = $rules[0] ?? [];//默认一阶奖励
            $condition = $rule['condition'];
            $condition_type_array = $condition['type'];
            $condition_type = $condition_type_array[0];
            switch ($condition_type) {
                case TaskDict::CONDITION_ORDER_NUM:
                    $util = '单';
                    break;
                case TaskDict::CONDITION_ORDER_MONEY:
                    $util = '元';
                    break;
                case TaskDict::CONDITION_CHILD_NUM:
                    $util = '人';
                    break;
            }
            $condition_num = $condition[$condition_type];
            $title = TaskDict::getConditionType($condition_type);
            $now_data = $member_task[$condition_type];
            $complete_num = $member_task['complete_num'];
            if($times > 0 && $complete_num >= $times){
                $next_complete_num = $complete_num;
                $progress_rate = 100;
            }else{
                $next_complete_num = $complete_num + 1;
                $progress_rate = $progress - $member_task['complete_num'] * 100;
            }
            if($now_data > ($condition_num * $next_complete_num)){
                $now_data = $condition_num * $next_complete_num;
            }

            $show_progress = [
                'title' => $title,
                'rate' => $progress_rate,
                'start' => $this->dataFormat($complete_num * $condition_num, $condition_type),
                'end' => $this->dataFormat($condition_num * $next_complete_num, $condition_type),
                'progress' => $complete_num . '/' . $next_complete_num
            ];//用于显示
        }
        return [
            'show_progress' => $show_progress,
            'title' => $title,
            'now_data' => $this->dataFormat($now_data, $condition_type),
            'end_data' => $this->dataFormat($condition_num * $next_complete_num, $condition_type),
            'util' => $util ?? ''
        ];

    }

    /**
     * 数据1格式化
     * @param $data
     * @param $type
     * @return false|float|int
     */
    public function dataFormat($data, $type)
    {
        if ($type == TaskDict::CONDITION_ORDER_MONEY) {
            return floor($data * 100) / 100;
        } else {
            return floor($data);
        }
    }

    /**
     * 获取最低条件
     * @param $task
     * @return array|void
     */
    public function getMinCondition($task)
    {
        $times = $task['times'];
        $type = $task['type'];
        if ($type == TaskDict::LOOP) {//循环任务
            $rules = $task['rules'] ?? [];
            $rule = $rules[0] ?? [];//默认一阶奖励
            $condition = $rule['condition'];
            $condition_type_array = $condition['type'];
            $condition_type = $condition_type_array[0];
            switch ($condition_type) {
                case TaskDict::CONDITION_ORDER_NUM:
                    $util = '单';
                    break;
                case TaskDict::CONDITION_ORDER_MONEY:
                    $util = '元';
                    break;
                case TaskDict::CONDITION_CHILD_NUM:
                    $util = '人';
                    break;
            }
            $condition_num = $condition[$condition_type];
            $title = TaskDict::getConditionType($condition_type);
            $complete_num = 1;
            return [
                'title' => $title,
                'end_data' => $this->dataFormat($condition_num * 1, $condition_type),
                'util' => $util ?? ''
            ];//用于显示
        }
    }

    /**
     * 发放任务奖励
     * @param $reward_ids
     * @return void
     */
    public function send($reward_ids)
    {
        $task_member_reward_model = new TaskMemberReward();
        $task_member_reward = $task_member_reward_model->where([
            ['is_send', '=', 0],
            ['is_complete', '=', 1],
            ['id', 'in', $reward_ids]
        ])->select();
        $now_time = time();

        if (!$task_member_reward->isEmpty()) {
            $task_member_data = [];
            foreach ($task_member_reward as $task_member_reward_v) {
                CoreFenxiaoDataService::setCommission(
                    $task_member_reward_v['site_id'],
                    $task_member_reward_v['member_id'],
                    $task_member_reward_v['reward_money'],
                    'task',
                    $task_member_reward_v['id']
                );
                if(isset($task_member_data[$task_member_reward_v['from_id']])){
                    $task_member_data[$task_member_reward_v['from_id']] += 1;
                }else{
                    $task_member_data[$task_member_reward_v['from_id']] = 1;
                }

            }
            //奖励记录
            $task_member = new TaskMember();
            foreach ($task_member_data as $task_member_data_k => $task_member_data_v) {
                $task_member->where([['id', '=', $task_member_data_k]])->update([
                    'send_num' => Db::raw('send_num + ' . $task_member_data_v)
                ]);
            }
            //将奖励记录设置为已奖励
            $task_member_reward_model->where([
                ['is_send', '=', 0],
                ['id', 'in', $reward_ids]
            ])->update([
                'is_send' => 1,
                'send_time' => $now_time
            ]);
        }
        return true;
    }

}
