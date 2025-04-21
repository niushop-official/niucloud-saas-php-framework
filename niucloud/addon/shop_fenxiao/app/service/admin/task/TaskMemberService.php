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

use addon\shop_fenxiao\app\model\task\TaskMember;
use addon\shop_fenxiao\app\service\core\task\CoreTaskMemberService;
use core\base\BaseAdminService;


/**
 * 任务服务层
 */
class TaskMemberService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new TaskMember();
    }

    /**
     * 会员任务分页
     * @return void`
     */
    public function getPage(array $where = [])
    {
        $field = 'id,task_member.site_id,task_id,task_member.member_id,order_money,total_reward_money,is_complete,task_member.create_time,complete_num,send_num,progress,order_num,child_num,next_index';
        $order = 'id desc';
        $condition = [
            ['task_member.site_id', '=', $this->site_id]
        ];
        if (!empty($where['search'])) {
            $condition[] = ['member.username|member.nickname|member.mobile', 'like', '%' . $where['search'] . '%'];
        }
        //任务状态
//        if(!empty($where['status'])){
//            $condition[] = ['task.status', '=', $where['status']];
//        }
        $search_model = $this->model->where($condition)
            ->withSearch(['task_id'], $where)
            ->withJoin([
                'member' => ['member_id', 'username', 'nickname', 'headimg', 'mobile'],
            ])
            ->with([
                'task_member_reward' => function ($query) {
                    $query->withField('id,site_id,task_id,member_id,from_id,step,reward_money,is_complete,complete_time,is_send,send_time,create_time');
                },
                'task' => function ($query) {
                    $query->withField('id,site_id,type,name, time_type, start_time,end_time,rules,level_type, level, times, status, remark, send_time, create_time')->append(['status_name']);
                },
            ])
            ->field($field)
            ->order($order);
        $core_task_member = new CoreTaskMemberService();
        return $this->pageQuery($search_model, function ($item) use ($core_task_member) {
            $item['task_data'] = $core_task_member->getTaskProgress($item, $item['task']);
        });
    }

    /**
     * 详情
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'id,site_id,task_id,member_id,order_money,total_reward_money,is_complete,create_time,complete_num,send_num,progress,order_num,child_num,next_index';
        $order = 'id desc';
        $condition = [
            ['site_id', '=', $this->site_id],
            ['id', '=', $id]
        ];

        $info = $this->model->where($condition)
            ->with([
                'member' => function ($query) {
                    $query->withField('member_id, username, nickname,headimg, mobile');
                },
                'task' => function ($query) {
                    $query->withField('id,site_id,type, name, time_type, start_time,end_time,rules,level_type, level, times, status, remark, send_time, create_time')->append(['status_name']);
                },
                'task_member_reward' => function ($query) {
                    $query->withField('id,site_id,task_id,member_id,from_id,step,reward_money,is_complete,complete_time,is_send,send_time,create_time');
                },
            ])->field($field)->order($order)->findOrEmpty()->toArray();
        $core_task_member = new CoreTaskMemberService();
        if (!empty($info)) {
            $info['task_data'] = $core_task_member->getTaskProgress($info, $info['task'] ?? []);
        }
        return $info;
    }

}
