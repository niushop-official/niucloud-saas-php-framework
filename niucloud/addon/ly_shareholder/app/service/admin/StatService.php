<?php

namespace addon\ly_shareholder\app\service\admin;


use addon\ly_shareholder\app\model\Shareholder;
use addon\ly_shareholder\app\model\ShareholderGoods;
use addon\ly_shareholder\app\model\ShareholderLog;
use addon\shop\app\model\order\Order;
use app\model\member\Member;
use core\base\BaseAdminService;
use think\facade\Log;

/**
 * 统计服务层
 */
class StatService extends BaseAdminService
{
    /**
     * 分红统计
     */
    public function accountStat()
    {
        //分红统计 可提现分红
        $sum_amount = (new Shareholder())->where([['site_id', '=', $this->site_id]])->field("sum(amount) as sum_amount, sum(amount_get) as sum_amount_get, sum(amount_cash_outing) as sum_amount_cash_outing")->findOrEmpty()->toArray();
    
        //订单分红统计
        $unsettlement_amount = (new ShareholderLog())->where([ ['is_settlement', '=', 0], ['site_id', '=', $this->site_id]])->sum("amount");
        return [
            'sum_amount' => $sum_amount['sum_amount'] ?? 0.00,
            'sum_amount_get' => $sum_amount['sum_amount_get'] ?? 0.00,  //已提现分红
            'sum_amount_cash_outing' => $sum_amount['sum_amount_cash_outing'] ?? 0.00,  //提现中分红
            'unsettlement_amount' => $unsettlement_amount ?? 0   //待结算分红
        ];
    }

    /**
     * 营业额统计
     * @return array
     */
    public function orderStat(){
                
        $sum_order_price = (new Order())->where([['site_id', '=', $this->site_id]])->field("sum(order_money) as sum_order_money")->findOrEmpty()->toArray();
        return [
            'sum_order_money' => $sum_order_price['sum_order_money'] ?? 0.00
        ];

    }

    /**
     * 股东统计
     */
    public function shareholderStat()
    {
        $shareholder_count = (new Shareholder())->where([['site_id', '=', $this->site_id]])->count();

        $black_shareholder_count =  (new Shareholder())->where([['site_id', '=', $this->site_id], ['status', '=', 0]])->count();

        // $month_shareholder_count = (new Shareholder())->where([['site_id', '=', $this->site_id], ['create_time', '>=', date('Y-m-d H:i:s', strtotime('-1 month'))]])->count();
        $month_shareholder_count = $this->getShareholderMonthStat();
        return [
            'shareholder_count' => $shareholder_count,
            'black_shareholder_count' => $black_shareholder_count,
            'month_shareholder_count' => $month_shareholder_count
        ];
    }

  

    /**
     * 参与股东分红商品数
     */
    public function goodsStat()
    {
        $count = (new ShareholderGoods())->where([
            ['site_id', '=', $this->site_id],
            ['is_shareholder', '=', 1],//参与股东分红
        ])->count();
        return $count;
    }

    /**
     * 一周7天内股东增加统计
     */
    public function shareholderWeekStat()  
    {  
        $data = [];  
        $times = $this->getWeekTime(); // 获取时间戳数组  
      
        // 查询Shareholder表，获取过去七天的数据  
        $shareholder_list = (new Shareholder())->where([  
            ['site_id', '=', $this->site_id],  
            ['create_time', '>=', strtotime(date('Y-m-d 00:00:00', $times[6]))], 
            ['create_time', '<=', strtotime(date('Y-m-d 23:59:59', $times[0])) ] 
        ])->field('member_id, create_time')->select()->toArray();  
      
        // 遍历时间戳数组，统计每天的数据  
        foreach ($times as $i => $timestamp) {  
            $date = date('Y-m-d', $timestamp);  
            $data[$date]['date'] = $date;  
            $data[$date]['num'] = 0;  
      
            foreach ($shareholder_list as $shareholder) {  
                $shareholder_date = date('Y-m-d', strtotime($shareholder['create_time']));  
                if ($shareholder_date === $date) {  
                    $data[$date]['num']++;  
                }  
            }  
        }  
      
        // 将数据重新索引为数组  
        $reindexedData = array_values($data);  
      
        return $reindexedData;  
    } 

    /**
     * 获取一周内的时间戳
     */
    private function getWeekTime()
    {
        $currentDate = date('Y-m-d');  
        $currentTime = strtotime($currentDate);  
        $date_time = [];  
    
        // 生成从当前日期往回数的七天时间戳  
        for ($i = 0; $i < 7; $i++) {  
            $tempTime = $currentTime - ($i * 86400); 
            $date_time[$i] = $tempTime;  
        }  
    
        // 注意：此时数组是从今天开始往前数的，如果需要调整顺序（例如让今天排在数组的第一个），可以反转数组  
        // $date_time = array_reverse($date_time); // 如果需要这样的顺序，则取消注释这行代码  
    
        return $date_time;  
    }


    //本月内的新增股东统计，今日为本月最后一天
    public function getShareholderMonthStat(){
        $shareholder_count = (new Shareholder())->where([['site_id', '=', $this->site_id], ['create_time', '>=', strtotime(date('Y-m-01', time()))]])->count();
        return $shareholder_count;
    }


    //股东升级条件统计
    public function getOrderStat(){
        $order_stat = (new Order())->where([['site_id', '=', $this->site_id]])->field("sum(order_money) as sum_order_money")->findOrEmpty()->toArray();
        return $order_stat;
    }
}