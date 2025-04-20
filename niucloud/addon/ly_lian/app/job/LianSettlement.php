<?php

namespace addon\ly_lian\app\job;

use addon\ly_lian\app\model\LianReward;
use addon\ly_lian\app\model\ShareholderLog;
use addon\ly_lian\app\service\core\CoreShareholderDividendService;
use addon\ly_lian\app\service\core\CoreShareholderSendService;
use addon\ly_lian\app\service\core\settle\CoreLianSettleService;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 链动结算发放任务
 */
class LianSettlement extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        // 查询所有未结算的股东分红
        try {
            $list = (new LianReward())->where('status', '=', 1)->select();

            if(!$list->isEmpty()){
                $ids = array_column($list->toArray(), 'id');
                (new CoreLianSettleService())->handleQueue($ids);
            }

            Log::write('链动奖励结算发放任务执行成功');
            return true;
        } catch (\Exception $e) {
            Log::write('链动奖励结算发放任务执行失败: ' . $e->getMessage());
            return false;
        }
    }

}
