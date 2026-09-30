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

use core\base\BaseModel;

/**
 * 任务步骤模型
 * Class SysTaskStep
 * @package app\model\sys
 */
class SysTaskStep extends BaseModel
{
    protected $pk = 'id';

    protected $name = 'sys_task_step';

    protected $type = [
        'start_at' => 'timestamp',
        'end_at' => 'timestamp',
    ];

    /**
     * 任务标识搜索器
     * @param $query
     * @param $value
     * @return void
     */
    public function searchTaskKeyAttr($query, $value)
    {
        if ($value !== '' && $value !== null) {
            $query->where('task_key', $value);
        }
    }

    /**
     * 父步骤搜索器
     * @param $query
     * @param $value
     * @return void
     */
    public function searchParentKeyAttr($query, $value)
    {
        if ($value !== '' && $value !== null) {
            $query->where('parent_key', $value);
        }
    }
}
