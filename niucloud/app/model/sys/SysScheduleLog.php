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

namespace app\model\sys;

use app\dict\schedule\ScheduleLogDict;
use core\base\BaseModel;
use think\db\Query;

/**
 * 计划任务执行记录模型
 */
class SysScheduleLog extends BaseModel
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
    protected $name = 'sys_schedule_log';

    protected $type = [
        'execute_time' => 'timestamp',
    ];

    /**
     * 启用状态
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status'])) return '';
        return ScheduleLogDict::getStatus()[$data['status']] ?? '';
    }

    /**
     * 任务id搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchScheduleIdAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('schedule_id', $value);
        }
    }

    /**
     * 任务类型搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchKeyAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('key', $value);
        }
    }

    /**
     * 状态搜索
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchStatusAttr(Query $query, $value, $data)
    {
        if ($value != 'all') {
            $query->where('status', $value);
        }
    }


    /**
     * 执行时间搜索器
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchExecuteTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('execute_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['execute_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['execute_time', '<=', $end_time]]);
        }
    }

}
