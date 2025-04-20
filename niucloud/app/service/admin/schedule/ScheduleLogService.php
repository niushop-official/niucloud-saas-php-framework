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

namespace app\service\admin\schedule;

use app\service\core\schedule\CoreScheduleLogService;
use core\base\BaseAdminService;

/**
 * 计划任务执行记录服务层
 * Class CoreCronService
 * @package app\service\core\cron
 */
class ScheduleLogService extends BaseAdminService
{


    public function __construct()
    {
        parent::__construct();
    }


    /**
     * 获取自动任务列表
     * @param array $data
     * @return array
     */
    public function getPage(array $data = [])
    {
        return (new CoreScheduleLogService())->getPage($data);
    }

    /**
     * 添加
     * @param array $data
     * @return true
     */
    public function add(array $data)
    {
        $res = (new CoreScheduleLogService())->add($data);
        return true;

    }

    /**
     * 删除计划任务执行记录
     * @param $ids
     * @return bool
     */
    public function del($ids)
    {
        return (new CoreScheduleLogService())->del($ids);
    }

    /**
     * 清空计划任务执行记录
     * @param $data
     * @return bool
     */
    public function clear($data)
    {
        return (new CoreScheduleLogService())->clear($data);
    }

}