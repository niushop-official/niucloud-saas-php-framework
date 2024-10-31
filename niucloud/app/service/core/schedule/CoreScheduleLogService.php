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

namespace app\service\core\schedule;

use app\model\sys\SysScheduleLog;
use core\base\BaseCoreService;

/**
 * 计划任务执行记录服务层
 */
class CoreScheduleLogService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new SysScheduleLog();
    }

    /**
     * 计划任务执行记录分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {
        $field = 'id, addon, key, name, status, execute_time, execute_result, class, job';
        $search_model = $this->model->withSearch(['schedule_id', 'key', 'status', 'execute_time'],$where)->field($field)->order('id desc')->append(['status_name']);
        return $this->pageQuery($search_model);
    }

    /**
     * 添加计划任务执行记录
     * @param array $data
     * @return true
     */
    public function add(array $data)
    {
        $data[ 'execute_time' ] = time();
        $this->model->create($data);
        return true;

    }

    /**
     * 删除计划任务执行记录
     * @param $ids
     * @return bool
     */
    public function del($ids)
    {
        $res = $this->model::destroy(function($query) use ($ids) {
            $query->where([ [ 'id', 'in', $ids ] ]);
        });
        return $res;
    }

    /**
     * 清空计划任务执行记录
     * @param $data
     * @return bool
     */
    public function clear($data)
    {
        $where = [];
        if ($data[ 'schedule_id' ]) {
            $where[] = [ 'schedule_id', '=', $data[ 'schedule_id' ] ];
        }
        $res = $this->model::destroy(function($query) use ($where) {
            $query->where($where);
        });
        return $res;
    }

}
