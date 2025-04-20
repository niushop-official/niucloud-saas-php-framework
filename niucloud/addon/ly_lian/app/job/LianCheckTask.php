<?php

namespace addon\ly_lian\app\job;

use addon\ly_lian\app\model\LianMember;
use addon\ly_lian\app\service\core\member\CoreLianDataService;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 链动绩效任务查验
 * Class LianCheckTask
 */
class LianCheckTask extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        try {
            $list = (new LianMember())->where('thaw_status', '=', 0)->where('frozen_commission', '>', 0)->select();
            if(!($list)->isEmpty()){

                $ids = array_column($list->toArray(), 'id');
                (new CoreLianDataService())->handleQueue($ids);
            }

            Log::write('链动绩效任务统计查验任务执行成功');
            return true;
        } catch (\Exception $e) {
            Log::write('链动绩效任务统计查验任务执行失败' . $e->getMessage());
            return false;
        }
    }

}
