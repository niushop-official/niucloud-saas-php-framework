<?php

namespace addon\ly_area\app\service\core\order;

use addon\ly_area\app\dict\area\AreaDict;
use addon\ly_area\app\model\AreaGoods;
use addon\ly_area\app\model\AreaReward;
use addon\ly_area\app\service\core\agent\CoreAreaAgentService;
use addon\ly_area\app\service\core\CoreAreaConfigService;
use addon\ly_area\app\service\core\level\CoreAreaLevelService;
use addon\ly_area\app\service\core\order\CoreAreaRewardAttrService;
use core\base\BaseCoreService;
use think\facade\Log;

class CoreAreaRewardService extends BaseCoreService
{
    protected $config;

    public function __construct()

    {
        parent::__construct();
        $this->model = new AreaReward();
    }

    public function handleReward($site_id, $order_data){
        Log::write('============ly_area reward start================');
        $order_goods = (new CoreAreaRewardAttrService())->getOrderGoods($site_id, $order_data);

        if(!$order_goods) return false;

        if($order_goods){
            $this->reward($site_id, $order_goods);
        }
    }


    public function reward($site_id, $order_goods){
        $this->config = (new CoreAreaConfigService())->getAreaConfig($site_id);
        if($this->config['is_open'] == 0){
            Log::write('=====区域分红没有开启===='); 
            return false;
        } 

        $this->getAreaAgent($site_id, $order_goods);
    }

    //获取代理
    public function getAreaAgent($site_id, $order_goods){
        Log::write('============ly_area getAreaAgent start================');
        $area_level = [];
        $area_agent = [];

        if($order_goods['taker_province'] > 0){
            $area_agent['province'] = $this->getProvince($site_id, $order_goods['taker_province']);
            if(!$area_agent['province']->isEmpty()){
                $area_level['province'] = (new CoreAreaLevelService())->getLevelByAgentArea($site_id,  $area_agent['province']['agent_level']);
            }else{
                $area_level['province'] = [];
            }
        }

        if($order_goods['taker_city'] > 0){
            $area_agent['city'] = $this->getCity($site_id, $order_goods['taker_city']);
            if(!$area_agent['city']->isEmpty()){
                $area_level['city'] = (new CoreAreaLevelService())->getLevelByAgentArea($site_id,  $area_agent['city']['agent_level']);
            }else{
                $area_level['city'] = [];
            }
        }

        if($order_goods['taker_district'] > 0){
            $area_agent['district'] = $this->getDistrict($site_id, $order_goods['taker_district']);
            if(!$area_agent['district']->isEmpty()){
                $area_level['district'] = (new CoreAreaLevelService())->getLevelByAgentArea($site_id,  $area_agent['district']['agent_level']);
            }else{
                $area_level['district'] = [];
            }
        }

        if(!$area_agent){
            Log::write('====区域代理为空，返回================');
        }else{
            Log::write('====区域代理不为空,继续================');
            $this->sendReward($site_id, $order_goods, $area_agent, $area_level);
        }
    }

    //准备发放
    public function sendReward($site_id, $order_goods, $area_agent, $area_level){
        Log::write('============ly_area sendreward start================');

        $goods = (new AreaGoods())->where('site_id', $site_id)->where('goods_id', $order_goods['goods_id'])->findOrEmpty();
        $price = (new CoreAreaRewardAttrService())->getCountType($site_id, $order_goods);

        if($this->config['is_level'] == 0){
            foreach($area_agent as $key => $agent){
                if($key == 'district' && empty($area_level['district'])) continue;
                if($key == 'city' && empty($area_level['city'])) continue;
                if($key == 'province' && empty($area_level['province'])) continue;

                $this->addReward($site_id, $goods, $area_level[$key], $agent,  $price, $order_goods);   
            }
        }else{
            $this->addGradeReward($site_id, $goods, $order_goods, $area_level, $area_agent, $price);
        }
    }

    //级差奖励
    public function addGradeReward($site_id, $goods, $order_goods, $area_level, $area_agent, $price){
        Log::write('============ly_area addGradeReward start================');

        if($goods['is_rule'] == 1){
            $level_rates = (new CoreAreaRewardAttrService())->getOrderLevelRate($site_id, $area_agent, $area_level);

            $level_money = (new CoreAreaRewardAttrService())->getOrderLevelMoney($site_id, $area_agent, $area_level);
        }else{
            $level_rates = (new CoreAreaRewardAttrService())->getGoodsLevelRate($site_id, $order_goods, $area_agent, $area_level);

            $level_money = (new CoreAreaRewardAttrService())->getGoodsLevelMoney($site_id, $order_goods, $area_agent, $area_level);
        }

        Log::write([
            '级差奖励' => '==级差奖励--' ,
            'province_rate' => $level_rates['province'],
            'city_rate'  => $level_rates['city'], 
            'district_rate' => $level_rates['district'],
            'level_rates' => json_encode($level_rates),
            'level_money' => json_encode($level_money)
        ]);

        foreach($area_agent as $key => $agent){
            if($key == 'district' && empty($area_level['district'])) continue;
            if($key == 'city' && empty($area_level['city'])) continue;
            if($key == 'province' && empty($area_level['province'])) continue;

            $this->sendGradeReward($site_id, $goods, $order_goods, $level_rates[$key], $level_money[$key], $agent, $price, $area_level[$key]);
        }
    }

    //级差奖励发放
    public function sendGradeReward($site_id, $goods, $order_goods, $level_rate, $level_money, $agent, $price, $level){
        Log::write('============ly_area sendGradeReward start================' . json_encode($level));

        $amount = 0;

        if ($level_money > 0) {
            $amount = $level_money;
        } elseif ($level_rate > 0) {
            $amount = $price * $level_rate / 100;
        }

        if ($amount > 0) {
            $this->addAreaRewardLog($site_id,  $level, $agent, $amount, $order_goods);
        }
    }

    //正常代理奖励
    public function addReward($site_id, $goods, $level, $agent,  $price, $order_goods){
        Log::write('============ly_area addReward start================');
        Log::write('============ly_area addReward level================'. json_encode($level));
        
        $area_rule = (new CoreAreaRewardAttrService())->getGoodsAreaRule($site_id, $order_goods, $level);
        Log::write('============ly_area addReward area_rule================'. json_encode($area_rule));

        $amount = 0;
        if (isset($goods['is_rule'])) {
            if ($goods['is_rule'] == 1) {
                Log::write('=======ly_area goods_is_rule ============'. $goods['is_rule']);
                if ($level['level_money'] > 0) {
                    $amount = $level['level_money'];
                } elseif ($level['level_rate'] > 0) {
                    $amount = $price * $level['level_rate'] / 100;
                }
            } elseif ($goods['is_rule'] == 2) {
                if ($area_rule['level_money'] > 0) {
                    $amount = $area_rule['level_money'];
                } elseif ($area_rule['level_rate'] > 0) {
                    $amount = $price * $area_rule['level_rate'] / 100;
                }
            }
        } else {
            Log::write('Warning: $goods[\'is_rule\'] is not set or has an unexpected value.');
        }
    
        if ($amount > 0) {
            $this->addAreaRewardLog($site_id,  $level, $agent, $amount, $order_goods);
        }
    }



    public function addAreaRewardLog($site_id,  $level, $agent, $amount, $order_goods){
        Log::write('============ly_area addAreaRewardLog start================');
        $config = (new CoreAreaConfigService())->getAreaConfig($site_id);
        $data = [
            'site_id' => $site_id,
            'buy_mid' => $order_goods['member_id'],
            'member_id' => $agent['member_id'],
            'order_goods_id' => $order_goods['goods_id'],
            'agent_area' => $agent['full_area'], // 代理区域
            'order_id' => $order_goods['order_id'],
            'order_amount' => $order_goods['goods_money'], // 订单金额
            'level_id' => $level['level_id'],
            'level_rate' => $level['level_rate'],
            'agent_id' => $agent['agent_id'],
            'dividend_amount' => $amount,
            'status' => 0,
            'settle_days' => $config['settle_cycle'],
            'recrive_at' => $order_goods['finish_time'],
            'create_time' => time(),
        ];

        $this->model->insertGetId($data);
    }


    public function getProvince($site_id, $province_id){
        return (new CoreAreaAgentService())->getAreaAgentByAddressId($site_id, $province_id, AreaDict::PROVINCE)->findOrEmpty();
    }

    public function getCity($site_id, $city_id){
        return (new CoreAreaAgentService())->getAreaAgentByAddressId($site_id, $city_id, AreaDict::CITY)->findOrEmpty();
    }

    public function getDistrict($site_id, $district_id){
        return (new CoreAreaAgentService())->getAreaAgentByAddressId($site_id, $district_id, AreaDict::DISTRICT)->findOrEmpty();
    }


}