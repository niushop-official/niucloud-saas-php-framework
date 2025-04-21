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
namespace addon\shop_fenxiao\app\job\task;

use addon\shop_fenxiao\app\dict\task\TaskDict;
use addon\shop_fenxiao\app\model\task\Task;
use addon\shop_fenxiao\app\service\core\task\CoreTaskService;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 活动自动关闭
 */
class TaskClose extends BaseJob
{

    public function doJob()
    {
        try {
            //结束时间已过但没有关闭的
            $list = (new Task())->where([['status', '=', TaskDict::NORMAL], ['time_type', '=', 1],['end_time', '<=', time()]])->select();
            if(!$list->isEmpty()){
                foreach($list as $v){
                    (new CoreTaskService())->finish($v['id'], $v['site_id']);
                }
            }
            return true;
        } catch (\Exception $e) {
            Log::write('任务关闭'.$e->getMessage().$e->getFile().$e->getLine());
            return false;
        }
    }

}
