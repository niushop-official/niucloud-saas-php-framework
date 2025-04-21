<?php

namespace addon\ly_lian\app\service\core\order;

use addon\ly_lian\app\dict\lian\LianDict;
use addon\ly_lian\app\model\Level;
use addon\ly_lian\app\model\LianGoods;
use addon\ly_lian\app\model\LianReward;
use addon\ly_lian\app\service\core\CoreConfigService;
use addon\ly_lian\app\service\core\order\CoreLianRewardService;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\OrderGoods;
use core\base\BaseCoreService;
use think\facade\Log;
use think\facade\Db;

class CoreLianRewardAttrService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();
    }

    public function getCountType($site_id, $order_goods, $order_data){

        $calculate_price = $this->getGoodsCalculatePrice($site_id, $order_goods);//商品独立计算价

        $config = (new CoreConfigService())->getLianConfig(($site_id));

        $goods_ids = (new CoreLianRewardService())->getLianGoodsIds($site_id);
        $order_ids = (new OrderGoods())->where('order_id', $order_data['order_id'])->whereIn('goods_id', $goods_ids)->select();

        Log::write('lian_get_count_type_count:'. count($order_ids));

        if($calculate_price > 0){
            $price = $calculate_price * $order_goods['num'];
        }else{
            switch ($config['count_type']){
                case 0: // 支付金额
                    if(count($order_ids) >= 2){
                        $price = $order_data['order_money']; 
                    }else{
                        $price = $order_goods['order_goods_money'];
                    }
                    // $price = $order_goods['order_goods_money']; 
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

        $lian_goods = (new LianGoods())->where('site_id', $site_id)->where('goods_id', $goods_id)->findOrEmpty(); 
        $goods_rule = $lian_goods['reward_set'][$sku_id] ?? []; 

        $calculate_price = $goods_rule['calculate_price'] ?? 0; 
      
        return $calculate_price; 
    }


    //获取商品的独立奖励设置。根据奖励会员的等级
    public function getGoodsRewardSet($site_id, $order_goods, $level){
        $goods_id = $order_goods['goods_id']; // 商品ID。
        $sku_id = $order_goods['sku_id']; // 商品SKU ID。
        $level_id = $level['level_id']; // 会员等级ID。

        $lian_goods = (new LianGoods())->where('site_id', $site_id)->where('goods_id', $goods_id)->findOrEmpty(); 
        $goods_rule = $lian_goods['reward_set'][$sku_id] ?? []; 
        $goods_level_rule = $goods_rule[$level_id] ?? []; 

        return $goods_level_rule; 
    }

    
    public function getGoodsIsRule($site_id, $order_goods){
        $goods_id = $order_goods['goods_id']; // 商品ID。
        $lian_goods = (new LianGoods())->where('site_id', $site_id)->where('goods_id', $goods_id)->findOrEmpty(); 

        return $lian_goods;
    }


    public function addLianReward($site_id, $pid, $level_id, $order_id, $member_id, $config, $price, $level, $reward, $reward_type, $thaw_status, $frozen_rate, $frozen_amount=0){
        Log::write('ly_lian==================================addlianReward');

        try {
            Db::startTrans();
            $data = [
                'site_id' => $site_id, // 站点ID。
                'member_id' => $pid,
                'level_id' => $level_id,
                'order_id' => $order_id, // 订单ID。
                'buy_mid' => $member_id,
                'settle_cycle' => $config,
                'settle_amount' => $price,
                'give_rate' => $level,
                'give_amount' => $reward,
                'reward_type' => $reward_type,
                'thaw_status' => $thaw_status,
                'frozen_rate' => $frozen_rate, // 冻结比例。
                'frozen_amount' => $frozen_amount, // 冻结金额。
                'status' => 1,
                'create_time' => time(),

                // 'update_time' => time(),
                // 'settle_time' => time(), 
            ];

            $res = (new LianReward())->insertGetId($data);
            if($res){
                Db::commit();
                Log::write('ly_lian============addlianReward success');
            }else{
                Db::rollback();
                Log::write('ly_lian============addlianReward fail');
            }
        } catch (\Exception $e) {
            Db::rollback();
            Log::write('ly_lian============addlianReward fail:' . $e->getMessage());      
        }
        
        return true;
        
    }


    public function getTakeType($site_id){
        $config = (new CoreConfigService())->getLianConfig($site_id);
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


    public function getThawStatus($site_id){
        $config = (new CoreConfigService())->getLianConfig($site_id);
        switch ($config['first_reward_frozen']){
            case 0: //不冻结
                $reward_thaw_status = 2;
                break;
            case 1: //开启冻结
                $reward_thaw_status = 0;
                break;
         
            default: 
                $reward_thaw_status = 2; 
                break;
        }
        return $reward_thaw_status;
    }


    public function getSeeThawStatus($site_id, $parent){
        $level = (new Level())->where('site_id', $site_id)->where('level_id', $parent['level_id'])->findOrEmpty(); // 获取当前会员等级。
        switch ($level['see_frozen']) {
            case 0:
                $reward_thaw_status = 2;
                break;
            case 1:
                $reward_thaw_status = 0; // 开启冻结。
                break;   
            default:  // 默认不冻结。
                $reward_thaw_status = 2; // 默认不冻结。
        }
        return $reward_thaw_status;
    }


    public function getCultivateThawStatus($site_id, $parent){
        $level = (new Level())->where('site_id', $site_id)->where('level_id', $parent['level_id'])->findOrEmpty(); // 获取当前会员等级。
        switch ($level['cultivate_frozen']) {
            case 0:
                $reward_thaw_status = 2; // 不冻结。
                break;
            case 1: // 开启冻结。
                $reward_thaw_status = 0; // 开启冻结。
                break;   
            default:  // 默认不冻结。
                $reward_thaw_status = 2; // 默认不冻结。
        }
        return $reward_thaw_status;
    }


     //获取链动会员冻结金额未解冻记录
     public function getFrozenRewardList($site_id, $member){
        $where = [
            'site_id' => $site_id,
            'member_id' => $member['member_id'], 
            'thaw_status' => 0, 
        ];
        $list = $this->model->where($where)->select(); 
        return $list; 
    }


    public function getRewardType($site_id, $id){
        $reward_type = (new LianReward())->where('site_id', $site_id)->where('id', $id)->value('reward_type'); 
        switch ($reward_type) { // 根据奖励类型进行处理。
            case 0: // 直推奖。
                $reward_type = '链动直推奖'; 
                break;   
            case 1: // 见点奖。
                $reward_type = '链动见点奖'; 
                break;   
            case 2: // 培育奖。
                $reward_type = '链动培育奖'; 
            case 3: //平级奖
                $reward_type = '链动平级奖';
                break;
            default: // 默认直推奖。
                $reward_type = '链动直推奖'; 
        }
        return $reward_type; 
    }


    public function getOrderGoods($site_id, $order_data){
        $goods_ids = (new CoreLianRewardService())->getLianGoodsIds($site_id);
        $order_goods = (new OrderGoods())->alias('og')
            ->where('og.site_id', $site_id)
            ->where('og.member_id', $order_data['member_id'])
            ->where('og.order_id', $order_data['order_id'])
            ->whereIn('og.goods_id', $goods_ids)
            ->join('shop_order o', 'og.order_id = o.order_id', 'INNER')
            ->whereIn('o.status',  [OrderDict::WAIT_DELIVERY, OrderDict::WAIT_TAKE, OrderDict::FINISH])
            ->findOrEmpty();

        return $order_goods;
    }
}