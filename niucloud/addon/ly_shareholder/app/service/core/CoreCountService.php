<?php

namespace addon\ly_shareholder\app\service\core;

use addon\ly_shareholder\app\dict\shareholder\ShareholderDict;
use addon\ly_shareholder\app\service\admin\ShareholderGoodsService;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use app\service\core\sys\CoreConfigService;
use Carbon\Carbon;
use core\base\BaseCoreService;
use Exception;
use think\facade\Log;

class CoreCountService extends BaseCoreService
{

    public $core_config_service;

    public function __construct(){
        // 初始化配置服务
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    //获取商城订单总价
    public static function getCycleOrderAmount($settle_type, $cycleType, $site_id){

        Log::write('========='.json_encode($settle_type) . '==========走到getCycleOrderAmount了');

        $core_config_service = new CoreConfigService();
        // $shop_config = $core_config_service->getConfigValue($site_id, 'SHOP_ORDER_CONFIG');
        // $o2o_config = $core_config_service->getConfigValue($site_id, 'O2O_ORDER_CONFIG');

        // $shop_price = $shop_config->isEmpty() ? 0 : self::getShareholderGoodsOrderPrice($site_id,$cycleType); //$cycleType 周期类型：日/周/月

        if($settle_type == ShareholderDict::TURNOVER){//$settle_type 结算方式：营业额/利润
            $price = self::getShareholderGoodsOrderPrice($site_id,$cycleType); //$cycleType 周期类型：日/周/月
        }else{
            $cost_price = self::getShareholderGoodsOrderCostPrice($site_id,$cycleType);//成本价
            $order_price = self::getShareholderGoodsOrderPrice($site_id,$cycleType);//订单总价
            $price = $order_price - $cost_price;//利润
        }

        Log::write('=========商城订单总额为：' . $price );
        return $price;

    }

    //获取开启了股东分红的商城商品订单
    public static function getShareholderGoodsOrder($site_id, $cycleType=null, $time_start=null, $time_end=null){
        $goods_shareholderIds = (new ShareholderGoodsService())->getShareholderGoodsIds($site_id);//获取开启了股东分红的商品
        
         //根据周期类型计算时间范围  
        switch($cycleType){  
            case ShareholderDict::DAY:  
                $time_end = strtotime(Carbon::today()->toDateTimeString());  
                $time_start = strtotime(Carbon::yesterday()->toDateTimeString());  
                break;  
      
            case ShareholderDict::WEEK:  
                $time_end = strtotime(Carbon::today()->toDateTimeString());  
                $time_start = strtotime(Carbon::today()->subWeek()->toDateTimeString());  
                break;  
      
            case ShareholderDict::MONTH:  
                $time_end = Carbon::now()->startOfMonth()->timestamp;  
                $time_start = Carbon::now()->subMonth()->startOfMonth()->timestamp;  
                break;  
              
            default:  
                throw new \InvalidArgumentException('Invalid cycle type provided.');  
        }  
        
        $orders = (new Order())  
            ->alias('o')  
            ->where('o.site_id', $site_id)
            ->join('shop_order_goods og', 'o.order_id = og.order_id', 'INNER') 
            ->whereIn('og.goods_id', $goods_shareholderIds)
            ->whereBetween('o.finish_time',[$time_start, $time_end])
            ->field('o.*')  
            ->distinct(true); // 如果一个订单对应多个商品，使用 distinct 去除重复订单

            Log::write('========='.json_encode($orders) . '==========走到getShareholderGoodsOrder了');

        return $orders;
    }

    

    //获取开启了股东分红商品的订单的总成本价
    /**
     * Summary of getShareholderGoodsOrderCostPrice
     * @param mixed $site_id
     * @param mixed $cycleType
     * @return float
     */
    public static function getShareholderGoodsOrderCostPrice($site_id,$cycleType){
        Log::write('========='.json_encode($site_id) . '==========走到getShareholderGoodsOrderCostPrice了');
        
        $goods_shareholderIds = (new ShareholderGoodsService())->getShareholderGoodsIds($site_id);//获取开启了股东分红的商品

        $orders = self::getShareholderGoodsOrder($site_id,$cycleType)->select()->toArray();
        $order_ids = array_column($orders, 'order_id');

        $cost_price = (new OrderGoods())
            ->alias('og')
            ->where('og.site_id', $site_id)
            ->join('shop_goods_sku gs', 'gs.sku_id = og.sku_id','INNER') 
            ->whereIn('og.goods_id', $goods_shareholderIds)
            ->whereIn('og.order_id', $order_ids)
            ->sum('gs.cost_price');
        
        return $cost_price;
    }

    //获取开启了股东分红商城商品的订单的总价
    public static function getShareholderGoodsOrderPrice($site_id,$cycleType){

        $goods_shareholderIds = (new ShareholderGoodsService())->getShareholderGoodsIds($site_id);

        $orders = self::getShareholderGoodsOrder($site_id,$cycleType)->select()->toArray();
        $order_ids = array_column($orders, 'order_id');

        $price = (new OrderGoods())
            ->where('site_id', $site_id)
            ->whereIn('order_id', $order_ids)
            ->whereIn('goods_id', $goods_shareholderIds)
            ->sum('order_goods_money');//订单实付金额

        return $price;
    }


    //获取开启了股东分红的o2o商品的订单
    public static function getShareholderO2oOrder($site_id,$cycleType){
        $goods_shareholderIds = (new ShareholderGoodsService())->getO2oGoodsIds($site_id);//获取开启了股东分红的商品

        //根据周期类型计算时间范围  
        switch($cycleType){  
            case ShareholderDict::DAY:  
                $time_end = strtotime(Carbon::today()->toDateTimeString());  
                $time_start = strtotime(Carbon::yesterday()->toDateTimeString());  
                break;  

            case ShareholderDict::WEEK:  
                $time_end = strtotime(Carbon::today()->toDateTimeString());  
                $time_start = strtotime(Carbon::today()->subWeek()->toDateTimeString());  
                break;  

            case ShareholderDict::MONTH:  
                $time_end = Carbon::now()->startOfMonth()->timestamp;  
                $time_start = Carbon::now()->subMonth()->startOfMonth()->timestamp;  
                break;  

            default:  
                throw new \InvalidArgumentException('Invalid cycle type provided.');  
        }  

        $orders = (new \addon\o2o\app\model\Order())  
            ->alias('o')
            ->join('o2o_order_item oi', 'oi.order_id = o.order_id','INNER')  
            ->where('o.site_id', $site_id)
            ->whereIn('oi.goods_id', $goods_shareholderIds)
            ->whereBetween('o.finish_time',[$time_start, $time_end])
            ->field('o.*')  
            ->distinct(true); // 如果一个订单对应多个商品，使用 distinct 去除重复订单

        return $orders;
    }
}