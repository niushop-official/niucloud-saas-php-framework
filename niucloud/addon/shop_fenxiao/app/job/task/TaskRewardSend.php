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

use addon\shop_fenxiao\app\model\task\TaskMemberReward;
use addon\shop_fenxiao\app\service\core\task\CoreTaskMemberService;
use core\base\BaseJob;

/**
 * 奖励发放
 */
class TaskRewardSend extends BaseJob
{

    public function doJob()
    {
        try {
            $list = (new TaskMemberReward())->where([['is_send', '=', 0], ['is_complete', '=', 1], ['send_timer', '<=', time()]])->select();
            if(!$list->isEmpty()){
                $ids = array_column($list->toArray(), 'id');
                (new CoreTaskMemberService())->send($ids);

            }

            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
