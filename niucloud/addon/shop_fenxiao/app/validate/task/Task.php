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

namespace addon\shop_fenxiao\app\validate\task;

use addon\shop_fenxiao\app\dict\task\TaskDict;
use core\base\BaseValidate;

/**
 * 任务奖励验证器
 */
class Task extends BaseValidate
{

    protected $rule = [
        'name' => 'require',//活动名称
        'time_type' => 'require',//任务活动时间范围模式
        'start_time' => 'require|date',//活动开始时间
        'end_time' => 'requireIf:time_type,1',//活动结束时间  只有非长期活动才会校验结束时间
        'rules' => 'require',//活动奖励
        'level_type' => 'require',//参与等级
        'level' => 'requireIf:level_type,'.TaskDict::PART_LEVEL,//选择部分等级,则必须选择参与等级
        'times' => 'require|egt:0',

        //发放时间
        'send_time_type' => 'require',
        'send_time' => 'require',

    ];

    protected $message = [
        'name.require' => 'shop_fenxiao_task_validate.name_require',
        'time_type.require' => 'shop_fenxiao_task_validate.time_type_require',
        'start_time.require' => 'shop_fenxiao_task_validate.start_time_require',
        'end_time.requireIf' => 'shop_fenxiao_task_validate.end_time_require',
        'start_time.date' => 'shop_fenxiao_task_validate.start_time_require',
        'end_time.date' => 'shop_fenxiao_task_validate.end_time_require',

        'rules.require' => 'shop_fenxiao_task_validate.rules_require',//任务奖励配置
        'level_type.require' => 'shop_fenxiao_task_validate.level_type_require',//参与等级模式
        'level.requireIf' => 'shop_fenxiao_task_validate.level_require',//参与等级不能为空
        'times.require' => 'shop_fenxiao_task_validate.times_require',//参与次数必须填写
        'times.gt' => 'shop_fenxiao_task_validate.times_require',//参与次数

        'send_time_type.require' => 'shop_fenxiao_task_validate.send_time_type_require',//发放时间
        'send_time.require' => 'shop_fenxiao_task_validate.send_time_require',//发放时间
    ];

    protected $scene = [
        'add' => [ 'name', 'time_type', 'start_time', 'end_time', 'rules', 'level_type', 'level', 'times', 'send_time_type', 'send_time'],
        'edit' => [ 'name', 'time_type', 'start_time', 'end_time', 'rules', 'level_type', 'level', 'times', 'send_time_type', 'send_time' ],
    ];


}
