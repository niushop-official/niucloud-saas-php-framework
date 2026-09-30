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

use app\dict\sys\TaskDict;
use core\base\BaseModel;

/**
 * 统一任务表模型
 */
class SysTask extends BaseModel
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
    protected $name = 'sys_task';

    protected $type = [
        'create_time' => 'timestamp',
        'start_time'  => 'timestamp',
        'end_time'    => 'timestamp'
    ];

    // 设置json类型字段
    protected $json = [ 'params', 'actions', 'fail_reason' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 任务类型名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getTaskTypeNameAttr($value, $data)
    {
        if (empty($data[ 'task_type' ])) return '';
        return TaskDict::getType($data[ 'task_type' ]);
    }

    /**
     * 状态名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data[ 'status' ])) return '';
        return TaskDict::getStatus($data[ 'status' ]);
    }

    /**
     * 结束原因名称
     * @param $value
     * @param $data
     * @return string
     */
    public function getEndReasonNameAttr($value, $data)
    {
        if (empty($data[ 'end_reason' ])) return '';
        return TaskDict::getEndReason($data[ 'end_reason' ]);
    }

    /**
     * 是否终态（终态仅可只读回放，不可继续驱动）
     * @param $value
     * @param $data
     * @return bool
     */
    public function getIsTerminalAttr($value, $data)
    {
        if (empty($data[ 'status' ])) return true;
        return TaskDict::isTerminal($data[ 'status' ]);
    }

    /**
     * 搜索器：任务类型
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTaskTypeAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('task_type', $value);
        }
    }

    /**
     * 搜索器：状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('status', $value);
        }
    }

    /**
     * 搜索器：任务标识
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTaskKeyAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('task_key', 'like', '%' . $this->handelSpecialCharacter($value) . '%');
        }
    }

    /**
     * 搜索器：标题
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchTitleAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('title', 'like', '%' . $this->handelSpecialCharacter($value) . '%');
        }
    }

    /**
     * 搜索器：关键字（标题 / 任务标识，二者任一命中即可）
     *
     * 单独用 title + task_key 两个搜索器会以 AND 连接，要求关键字同时命中两者，
     * 与「输入一个词搜任务」的预期不符，故这里提供一个 OR 口径的关键字搜索。
     *
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchKeywordAttr($query, $value, $data)
    {
        if ($value != '') {
            $keyword = '%' . $this->handelSpecialCharacter($value) . '%';
            $query->where(function ($q) use ($keyword) {
                $q->whereOr('title', 'like', $keyword)->whereOr('task_key', 'like', $keyword);
            });
        }
    }
}
