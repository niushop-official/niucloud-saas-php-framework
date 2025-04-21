<?php

namespace addon\ly_area\app\service\admin;

use addon\ly_area\app\dict\area\AreaDict;
use addon\ly_area\app\model\AreaAgent;
use addon\ly_area\app\model\AreaGoods;
use addon\ly_area\app\model\AreaReward;
use addon\shop\app\model\order\Order;
use app\model\member\Member;
use app\model\member\MemberAccountLog;
use app\model\member\MemberCashOut;
use core\base\BaseAdminService;
use think\facade\Log;

/**
 * 统计服务层
 */
class AreaStatService extends BaseAdminService
{
    /**
     * 分红统计
     */
    public function accountStat()
    {
        //分红统计 可提现分红
        $sum_amount = (new AreaAgent())->where([['site_id', '=', $this->site_id]])->field("sum(area_count_money) as sum_amount, sum(amount_withdraw) as sum_amount_get")->findOrEmpty()->toArray();
        //已提现分红
        $sum_amount_get = (new MemberCashOut())->where('site_id', $this->site_id)->where('status', 3)->sum('apply_money');
        //提现中分红
        $sum_amount_cash_outing = (new Member())->where('site_id', $this->site_id)->sum('commission_cash_outing');
        //订单分红统计
        $unsettlement_amount = (new AreaReward())->where([ ['status', '=', 0], ['site_id', '=', $this->site_id]])->sum("dividend_amount");
        return [
            'sum_amount' => $sum_amount['sum_amount'] ?? 0.00,  //总分红
            'sum_amount_get' => $sum_amount['sum_amount_get'] ?? 0.00,  //已提现分红
            'sum_amount_cash_outing' => $sum_amount_cash_outing ?? 0.00,  //提现中分红
            'unsettlement_amount' => $unsettlement_amount ?? 0.00   //待结算分红
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
     * 代理统计
     */
    public function areaAgentStat()
    {
        $agent_count = (new AreaAgent())->where([['site_id', '=', $this->site_id]])->count();

        $black_agent_count =  (new AreaAgent())->where([['site_id', '=', $this->site_id], ['status', '=', 1]])->count();
 
        $month_agent_count = $this->getAreaAgentMonthStat();

        //省级代理数统计
        // $province_agent_count = (new AreaAgent())->where('site_id', $this->site_id)->where('agent_levwl', AreaDict::PROVINCE)->count();
        // $city_agent_count = (new AreaAgent())->where('site_id', $this->site_id)->where('agent_levwl', AreaDict::CITY)->count();
        // $district_agent_count = (new AreaAgent())->where('site_id', $this->site_id)->where('agent_levwl', AreaDict::DISTRICT)->count();

        $province_agent_count = $this->getAgentNumByLevel(AreaDict::PROVINCE);
        $city_agent_count = $this->getAgentNumByLevel(AreaDict::CITY);
        $district_agent_count = $this->getAgentNumByLevel(AreaDict::DISTRICT);

        return [
            'agent_count' => $agent_count,
            'black_agent_count' => $black_agent_count,
            'month_agent_count' => $month_agent_count,
            'province_agent_count' => $province_agent_count,
            'city_agent_count' => $city_agent_count,
            'district_agent_count' => $district_agent_count
        ];
    }

  

    /**
     * 参与代理分红商品数
     */
    public function goodsStat()
    {
        $count = (new AreaGoods())->where([
            ['site_id', '=', $this->site_id],
            ['is_area', '=', 1],//参与代理分红
        ])->count();

        return $count;
    }

    /**
     * 一周7天内股东增加统计
     */
    public function areaAgentWeekStat()  
    {  
        $data = [];  
        $times = $this->getWeekTime(); // 获取时间戳数组  
      
        // 查询Shareholder表，获取过去七天的数据  
        $agent_list = (new AreaAgent())->where([  
            ['site_id', '=', $this->site_id],  
            ['create_time', '>=', strtotime(date('Y-m-d 00:00:00', $times[6]))], 
            ['create_time', '<=', strtotime(date('Y-m-d 23:59:59', $times[0])) ] 
        ])->field('member_id, create_time')->select()->toArray();  
      
        // 遍历时间戳数组，统计每天的数据  
        foreach ($times as $i => $timestamp) {  
            $date = date('Y-m-d', $timestamp);  
            $data[$date]['date'] = $date;  
            $data[$date]['num'] = 0;  
      
            foreach ($agent_list as $agent) {  
                $agent_date = date('Y-m-d', strtotime($agent['create_time']));  
                if ($agent_date === $date) {  
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
    public function getAreaAgentMonthStat(){
        $agent_count = (new AreaAgent())->where([['site_id', '=', $this->site_id], ['create_time', '>=', strtotime(date('Y-m-01', time()))]])->count();
        return $agent_count;
    }


    //代理升级条件统计
    public function getOrderStat(){
        $order_stat = (new Order())->where([['site_id', '=', $this->site_id]])->field("sum(order_money) as sum_order_money")->findOrEmpty()->toArray();
        return $order_stat;
    }


    public function getAgentNumByLevel($level){
        $agent_count = (new AreaAgent())->where([['site_id', '=', $this->site_id], ['agent_level', '=', $level]])->count();
        return $agent_count;
    }
}