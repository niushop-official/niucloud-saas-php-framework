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

namespace app\dict\schedule;

class ScheduleLogDict
{

    public const SUCCESS = 'success';//执行成功
    public const ERROR = 'error';//执行失败

    /**
     * 任务执行状态
     * @return array
     */
    public static function getStatus()
    {
        return [
            self::SUCCESS => get_lang('dict_schedule_log.success'),//执行成功
            self::ERROR => get_lang('dict_schedule_log.error'),//执行失败
        ];
    }

}