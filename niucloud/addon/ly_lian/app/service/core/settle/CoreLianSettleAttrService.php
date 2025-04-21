<?php

namespace addon\ly_lian\app\service\core\settle;

use addon\ly_lian\app\model\LianReward;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use core\base\BaseCoreService;

class CoreLianSettleAttrService extends BaseCoreService
{   
    public function  __construct() {
        parent::__construct();
        $this->model = new LianReward();
    }


    public function getRewardListAfterPay($reward_ids){
        $reward_list = $this->model->where('id', 'in', $reward_ids)->where('status', 1)->select();

        $pay_list = [];
        foreach($reward_list as $reward){
            $order_id = $reward['order_id']; 
            $order_info = (new Order())->where('site_id', $reward['site_id'])->where('order_id', $order_id)->whereIn('status',[OrderDict::WAIT_DELIVERY, OrderDict::WAIT_TAKE, OrderDict::FINISH])->findOrEmpty(); 
            $reward['order_info'] = $order_info; 

            if(!$order_info->isEmpty()){ 
                $reward['pay_time'] = $order_info['pay_time'];    
                $pay_list[] = $reward; 
            }
        }

        return $pay_list; // 返回奖励列表，包含订单信息
    }


    public function getRewardListAfterFinish($reward_ids){
        $reward_list = $this->model->where('id', 'in', $reward_ids)->where('status', 1)->select();

        $finish_list = []; 
        foreach($reward_list as $reward){
            $order_id = $reward['order_id']; 
            $order_info = (new Order())->where('site_id', $reward['site_id'])->where('order_id', $order_id)->where('status', OrderDict::FINISH)->findOrEmpty(); 
            $reward['order_info'] = $order_info; 

            if(!$order_info->isEmpty()){ 
                $reward['finish_time'] = $order_info['finish_time']; 
                $finish_list[] = $reward; 
            }
        }

        return $finish_list; 
    }
}