<?php

namespace addon\ly_area\app\service\core\order;

use addon\ly_area\app\dict\area\AreaDict;
use addon\ly_area\app\model\AreaAgent;
use addon\ly_area\app\model\AreaGoods;
use addon\ly_area\app\model\AreaLevel;
use addon\ly_area\app\service\core\CoreAreaConfigService;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use core\base\BaseCoreService;
use think\facade\Log;

class CoreAreaRewardAttrService extends BaseCoreService
{
    public function getOrderGoods($site_id, $order_data){
        $goodsIds = $this->getAreaGoodsIds($site_id);
        $order_goods = (new OrderGoods())->alias('og')
            ->where('og.site_id', $site_id)
            // ->where('og.member_id', $order_data['member_id'])
            ->where('og.order_id', $order_data['order_id'])
            ->whereIn('og.goods_id',  $goodsIds)
            ->join('shop_order o', 'og.order_id = o.order_id', 'INNER')
            ->whereIn('o.status', [OrderDict::WAIT_DELIVERY, OrderDict::WAIT_TAKE, OrderDict::FINISH])
            ->findOrEmpty();

        return $order_goods;
    }


    public function getAreaGoodsIds($site_id){
       return (new AreaGoods())->where(['site_id' => $site_id, 'is_area' => 1])->column('goods_id');
    }


    public function getCountType($site_id, $order_goods){

        $calculate_price = $this->getGoodsCalculatePrice($site_id, $order_goods);//商品独立计算价
        Log::write('商品独立计算价：'.$calculate_price);

        $config = (new CoreAreaConfigService())->getAreaConfig($site_id);

        if($calculate_price > 0){
            $price = $calculate_price * $order_goods['num'];
        }else{
            switch ($config['count_type']){
                case 0: // 支付金额
                    $price = $order_goods['order_goods_money']; 
                    break;
                case 1: // 商品现价。
                    $price = $order_goods['price'] * $order_goods['num']; // 商品现价。
                    break;
                case 2: // 商品原价。
                    $price = $order_goods['original_price'] * $order_goods['num']; // 商品原价。
                    break;
                default: // 默认不奖励。
                    $price = $order_goods['order_goods_money']; // 支付金额。
                    break;
            }
        }
        
        return $price; // 返回计算后的金额。
    }

    //获取商品的独立奖励计算价格
    public function getGoodsCalculatePrice($site_id, $order_goods){
        $goods_id = $order_goods['goods_id']; // 商品ID。
        $sku_id = $order_goods['sku_id']; // 商品SKU ID。

        $area_goods = (new AreaGoods())->where('site_id', $site_id)->where('goods_id', $goods_id)->findOrEmpty(); 
        $goods_rule = $area_goods['area_rule'][$sku_id] ?? []; 

        $calculate_price = $goods_rule['calculate_price'] ?? 0; 
      
        return $calculate_price; 
    }


    //获取商品的独立奖励设置。根据奖励会员的等级
    public function getGoodsAreaRule($site_id, $order_goods, $level){
        $goods_id = $order_goods['goods_id']; // 商品ID。
        $sku_id = $order_goods['sku_id']; // 商品SKU ID。
        $level_id = $level['level_id']; // 等级ID。

        $area_goods = (new AreaGoods())->where('site_id', $site_id)->where('goods_id', $goods_id)->findOrEmpty(); 
        $goods_rule = $area_goods['area_rule'][$sku_id] ?? []; 
        $goods_level_rule = $goods_rule[$level_id] ?? []; 

        return $goods_level_rule;  
    }

    
    public function getGoodsIsRule($site_id, $order_goods){
        $goods_id = $order_goods['goods_id']; // 商品ID。
        $lian_goods = (new AreaGoods())->where('site_id', $site_id)->where('goods_id', $goods_id)->findOrEmpty(); 

        return $lian_goods;
    }


    public function getTakeType($site_id){
        $config = (new CoreAreaConfigService())->getAreaConfig($site_id);
        switch ($config['take_type']){
            case 0:
                $type = 'balance';
                break;
            case 1:
                $type = 'commission';
                break;
            case 2:
                $type = 'score';
                break;
            case 3:
                $type = 'integral';
                break;
            default:
                $type = 'balance'; // 默认余额。
        }

        return $type;
    }



    //根据代理级别 获取代理等级信息
    public function getOrderLevelArea($site_id, $level_area){
        $level =  (new AreaLevel())->where('site_id', $site_id)->where('level_area', $level_area)->findOrEmpty();
        if(!$level->isEmpty()){
            return $level;
        }else{
            return [];
        }
    }


    //获取订单等级设置的级差比例
    public function getOrderLevelRate($site_id, $area_agent, $area_level){
        // 初始化各级别变量
        $province_rate = 0;
        $city_rate = 0;
        $district_rate = 0;

        if(array_key_exists('province', $area_agent) && !($area_agent['province']->isEmpty())){
            $province_rate = $area_level['province']['level_rate'];
        }

        if(array_key_exists('city', $area_agent) && !($area_agent['city']->isEmpty())){
            $city_rate = $area_level['city']['level_rate'];
        }

        if(array_key_exists('district', $area_agent) && !($area_agent['district']->isEmpty())){
            $district_rate = $area_level['district']['level_rate'];
        }

        return [
            'province' => $province_rate - $city_rate ?: 0,
            'city' => $city_rate - $district_rate ? : 0,
            'district' => $district_rate ?: 0
        ];
    }

    // 获取订单的各级别设置的级差金额
    public function getOrderLevelMoney($site_id, $area_agent, $area_level){
        // 初始化各级别变量
        $province_money = 0;
        $city_money = 0;
        $district_money = 0;

        if(array_key_exists('province', $area_agent) && !($area_agent['province']->isEmpty())){
            $province_money = $area_level['province']['level_money'];
        }

        if(array_key_exists('city', $area_agent) && !($area_agent['city']->isEmpty())){
            $city_money = $area_level['city']['level_money'];
        }

        if(array_key_exists('district', $area_agent) && !($area_agent['district']->isEmpty())){
            $district_money = $area_level['district']['level_money'];
        }

        return [
            'province' => $province_money - $city_money ?: 0,
            'city' => $city_money - $district_money ?: 0,
            'district' => $district_money ?: 0
        ];
    }

    // 获取商品级差比例
    public function getGoodsLevelRate($site_id,  $order_goods, $area_agent, $area_level){
        $goods_province_rate = 0;
        $goods_city_rate = 0;
        $goods_district_rate = 0;

        // $goods_rule = (new AreaGoods())->where('site_id', $goods['site_id'])
        //     ->where('goods_id', $goods['goods_id'])
        //     ->where('sku_id', $sku_id)
        //     ->where('level_id', $level_id)
        //     ->findOrEmpty();


        if(array_key_exists('province', $area_agent) && !($area_agent['province']->isEmpty())){
            $level = $area_level['province'];
            $goods_rule = $this->getGoodsAreaRule($site_id, $order_goods, $level);
            $goods_province_rate = $goods_rule['level_rate'];
        }

        if(array_key_exists('city', $area_agent) && !($area_agent['city']->isEmpty())){
            $level = $area_level['city'];
            $goods_rule = $this->getGoodsAreaRule($site_id, $order_goods, $level);
            $goods_city_rate = $goods_rule['level_rate'];
        }

        if(array_key_exists('district', $area_agent) && !($area_agent['district']->isEmpty())){
            $level = $area_level['district'];
            $goods_rule = $this->getGoodsAreaRule($site_id, $order_goods, $level);
            $goods_district_rate = $goods_rule['level_rate'];
        }

        return [
            'province' => $goods_province_rate - $goods_city_rate ?: 0,
            'city' => $goods_city_rate - $goods_district_rate ?: 0,
            'district' => $goods_district_rate ?: 0
        ];
    }

    // 获取商品级差的固定奖励金额
    public function getGoodsLevelMoney($site_id,  $order_goods, $area_agent, $area_level){
        $goods_province_money = 0;
        $goods_city_money = 0;
        $goods_district_money = 0;

        if(array_key_exists('province', $area_agent) && !($area_agent['province']->isEmpty())){
            $level = $area_level['province'];
            $goods_rule = $this->getGoodsAreaRule($site_id, $order_goods, $level);
            $goods_province_money = $goods_rule['level_money'];
        }

        if(array_key_exists('city', $area_agent) && !($area_agent['city']->isEmpty())){
            $level = $area_level['city'];
            $goods_rule = $this->getGoodsAreaRule($site_id, $order_goods, $level);
            $goods_city_money = $goods_rule['level_money'];
        }

        if(array_key_exists('district', $area_agent) && !($area_agent['district']->isEmpty())){
            $level = $area_level['district'];
            $goods_rule = $this->getGoodsAreaRule($site_id, $order_goods, $level);
            $goods_district_money = $goods_rule['level_money'];
        }

        return [
            'province' => $goods_province_money - $goods_city_money ?: 0,
            'city' => $goods_city_money - $goods_district_money ?: 0,
            'district' => $goods_district_money ?: 0
        ];
    }
}