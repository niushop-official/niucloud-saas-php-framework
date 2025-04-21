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

namespace addon\shop_fenxiao\app\service\admin\task;

use addon\shop_fenxiao\app\dict\task\TaskDict;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoLevel;
use addon\shop_fenxiao\app\model\task\Task;
use addon\shop_fenxiao\app\service\core\task\CoreTaskService;
use core\base\BaseAdminService;
use core\exception\AdminException;


/**
 * 任务服务层
 */
class TaskService extends BaseAdminService
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
        $field = 'id,site_id,name,type, cover,time_type, start_time,end_time,rules,level_type, level, times, status, remark, send_time, create_time';
        $order = 'id desc';
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['name', 'create_time', 'status'], $where)
            ->field($field)
            ->append(['status_name', 'level_type_name', 'type_name', 'cover_thumb_mid'])
            ->order($order);
        $fenxiao_level_model = new FenxiaoLevel();
        return $this->pageQuery($search_model, function ($item) use ($fenxiao_level_model) {
            if ($item['level_type'] == TaskDict::PART_LEVEL) {
                $item['level_data'] = $fenxiao_level_model->where([['level_id', 'in', $item['level']]])->column('level_name', 'level_id');
            }

        });
    }

    /**
     * 详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,name, cover,type, time_type, start_time,end_time,rules,level_type, level,send_time_type, times, status, remark, send_time, create_time';
        $task = $this->model->where([['id', '=', $id]])->field($field)->append(['status_name', 'level_type_name', 'type_name', 'cover_thumb_mid'])->findOrEmpty();
        if (!$task->isEmpty()) {
            if ($task['level_type'] == TaskDict::PART_LEVEL) {
                $fenxiao_level_model = new FenxiaoLevel();
                $task['level_data'] = $fenxiao_level_model->where([['level_id', 'in', $task['level']]])->column('level_name', 'level_id');
            }
        }
        return $task->toArray();
    }

    /**
     * 添加
     * @param $data
     * @return true
     */
    public function add($data)
    {
        $insert_data = [
            'site_id' => $this->site_id,
            'cover' => $data['cover'],
            'name' => $data['name'],
            'time_type' => $data['time_type'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'times' => $data['times'],
            'level_type' => $data['level_type'],
            'level' => $data['level'],
            'rules' => $data['rules'],
            'status' => TaskDict::TO_BEGIN,
            'remark' => $data['remark'],
            'send_time' => $data['send_time'],//发放时机
            'send_time_type' => $data['send_time_type'],//发放时机
        ];
        if($data['send_time_type'] == 1){
            $insert_data['send_time'] = strtotime($insert_data['send_time']);//定时日期格式转化
        }
        $task = $this->model->create($insert_data);
        //尝试开始任务
        (new CoreTaskService())->checkOpen($task);
        return true;
    }

    /**
     * 编辑任务(todo 应该是只有未开始的活动修改的)
     * @param int $id
     * @param $data
     * @return true
     */
    public function edit(int $id, $data)
    {
        //判断是否
        $task = $this->model->where([['site_id', '=', $this->site_id], ['id', '=', $id]])->findOrEmpty();

        if ($task->isEmpty()) throw new AdminException('SHOP_FENXIAO_NOT_FOUND_TASK');
        if ($task['status'] != TaskDict::TO_BEGIN) throw new AdminException('SHOP_FENXIAO_NOT_ALLOW_STARTING_TASK_EDIT');
        $update_data = [
            'name' => $data['name'],
            'cover' => $data['cover'],
            'time_type' => $data['time_type'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'times' => $data['times'],
            'level_type' => $data['level_type'],
            'level' => $data['level'],
            'rules' => $data['rules'],
            'status' => TaskDict::TO_BEGIN,
            'remark' => $data['remark'],
            'send_time' => $data['send_time'],//发放时机
            'send_time_type' => $data['send_time_type'],//发放时机
        ];
        if($data['send_time_type'] == 1){
            $update_data['send_time'] = strtotime($update_data['send_time']);//定时日期格式转化
        }
        $task->save($update_data);
        //尝试开始任务
        (new CoreTaskService())->checkOpen($task);
        return true;
    }

    /**
     * 主动结束活动
     * @param $id
     * @return true|null
     */
    public function finish($id)
    {
        return (new CoreTaskService())->finish($id, $this->site_id);
    }

    /**
     * 删除活动
     * @param $id
     * @return true
     */
    public function del($id)
    {
        $task = $this->model->where([['id', '=', $id], ['site_id', '=', $this->site_id]])->findOrEmpty();
        if ($task->isEmpty()) throw new AdminException('SHOP_FENXIAO_NOT_FOUND_TASK');
        if ($task['status'] != TaskDict::FINISH) throw new AdminException('SHOP_FENXIAO_NOT_ALLOW_WAIT_FINISH_TASK_DELETE');
        $task->delete();
        return true;
    }
}
