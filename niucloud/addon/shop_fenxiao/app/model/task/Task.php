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

use addon\shop_fenxiao\app\dict\task\TaskDict;
use app\dict\sys\FileDict;
use core\base\BaseModel;
use think\db\Query;

/**
 * 任务模型
 */
class Task extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';
    // 关闭自动写入update_time字段
    protected $updateTime = false;
    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao_task';

    protected $type = [
//        'send_time' => 'timestamp',
        'start_time' =>'timestamp',
        'end_time' =>'timestamp',
    ];
    // 设置json类型字段
    protected $json = [ 'rules', 'level' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 任务奖励明细进度
     * @return \think\model\relation\HasOne
     */
    public function taskMember(){
        return $this->hasOne(TaskMember::class, 'task_id', 'id');
    }

    /**
     * 活动状态
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status']))
            return '';
        return TaskDict::getStatus()[$data['status']] ?? '';
    }

    /**
     * 参与等级
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getLevelTypeNameAttr($value, $data)
    {
        if (empty($data['level_type']))
            return '';
        return TaskDict::getLevelType()[$data['level_type']] ?? '';
    }

    /**
     * 任务类型
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getTypeNameAttr($value, $data)
    {
        if (empty($data['type']))
            return '';
        return TaskDict::getType()[$data['type']] ?? '';
    }

    /**
     * 搜索器:名称
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchNameAttr(Query $query, $value, $data)
    {
        if ($value != '') {
            $query->whereLike('name', "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }
    /**
     * 状态筛选
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchStatusAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('status', $value);
        }
    }

    /**
     * 创建时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    /**
     *  获取活动图片
     * @param $value
     * @param $data
     * @return array|mixed
     * @throws \Exception
     */
    public function getCoverThumbMidAttr($value, $data)
    {
        if (isset($data[ 'cover' ]) && $data[ 'cover' ] != '') {
            return get_thumb_images($data['site_id'], $data[ 'cover' ], FileDict::MID);
        }
        return [];
    }

}
