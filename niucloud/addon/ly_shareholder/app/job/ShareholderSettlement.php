<?php

namespace addon\ly_shareholder\app\job;

use addon\ly_shareholder\app\model\ShareholderLog;
use addon\ly_shareholder\app\service\core\CoreShareholderDividendService;
use addon\ly_shareholder\app\service\core\CoreShareholderSendService;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 股东结算发放任务
 */
class ShareholderSettlement extends BaseJob
{
    /**
     * 消费
     * @return true
     */
    public function doJob()
    {
        //执行股东分红
        $order = (new Order())->where([
            ['status', 'in', [OrderDict::WAIT_DELIVERY, OrderDict::WAIT_PAY, OrderDict::FINISH]],
            //订单结束时间为昨天
            // ['finish_time', '>=', strtotime(date('Y-m-d', strtotime('-1 day')))],
            // ['site_id', '=', $site_id],
        ])->findOrEmpty();

        if(!$order->isEmpty()){
            Log::write('======昨日有订单进入分红执行' . json_encode($order['order_id']) . '订单站点ID：' . $order['site_id'] . '=========');
            (new CoreShareholderDividendService($order['site_id']))->handleQueue($order['site_id']);
            
        }else{
            Log::write('======昨日无订单进入分红执行======ly_shareholder===========');
            return false;
        }
        
        

        // 查询所有未结算的股东分红
        try {
            $list = (new ShareholderLog())->where([['is_settlement', '=', 0]])->select();
            if(!$list->isEmpty()){
                $core_shareholder_send = new CoreShareholderSendService();
                foreach($list as $v){
                    $core_shareholder_send->autoSettlement($v);
                }
            }
            Log::write('股东结算发放任务执行成功');
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
