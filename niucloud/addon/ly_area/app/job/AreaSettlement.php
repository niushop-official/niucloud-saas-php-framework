<?php

namespace addon\ly_area\app\job;

use addon\ly_area\app\model\AreaReward;
use addon\ly_area\app\service\core\CoreAreaSettleService;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 区域代理结算发放任务
 */
class AreaSettlement extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        Log::write('区域代理结算发放任务开始执行');
        // 查询所有未结算的区域代理分红
        try {
            $list = (new AreaReward())->where([['status', '=', 0]])->select();
            if(!$list->isEmpty()){
                $core_area_settle = new CoreAreaSettleService();
                foreach($list as $v){
                    $core_area_settle->autoSettlement($v);
                }
            }
            Log::write('区域代理结算发放任务执行成功');
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
