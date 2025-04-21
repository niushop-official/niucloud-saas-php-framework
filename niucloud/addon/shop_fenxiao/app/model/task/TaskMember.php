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

namespace addon\shop_fenxiao\app\model\task;

use app\model\member\Member;
use core\base\BaseModel;
use think\db\Query;

/**
 * 会员任务模型
 */
class TaskMember extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao_task_member';

    protected $type = [
        'send_time' => 'timestamp',
        'send_timer' => 'timestamp',
    ];

    /**
     * 任务奖励明细进度
     * @return \think\model\relation\HasOne
     */
    public function task(){
        return $this->hasOne(Task::class, 'id', 'task_id')->joinType('left');
    }

    /**
     * 会员关联
     * @return \think\model\relation\HasOne
     */
    public function member(){
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left');
    }

    /**
     * 关联任务奖励
     * @return \think\model\relation\HasOne
     */
    public function taskMemberReward(){
        return $this->hasMany(TaskMemberReward::class, 'from_id', 'id');
    }

    /**
     * 任务id
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchTaskIdAttr(Query $query, $value, $data)
    {
        if (!empty($value)) {
            $query->where('task_id', $value);
        }
    }

}
