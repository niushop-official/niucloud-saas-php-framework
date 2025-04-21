<?php

namespace addon\ly_lian\app\service\core\order;

use addon\ly_lian\app\dict\lian\LianDict;
use addon\ly_lian\app\model\Level;
use addon\ly_lian\app\model\LianGoods;
use addon\ly_lian\app\model\LianMember;
use addon\ly_lian\app\model\LianReward;
use addon\ly_lian\app\service\core\CoreConfigService;
use addon\ly_lian\app\service\core\member\CoreLianLevelService;
use addon\ly_lian\app\service\core\member\CoreLianMemberAttrService;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use app\model\member\Member;
use core\base\BaseCoreService;
use think\facade\Log;

class CoreLianRewardService extends BaseCoreService
{
    public function __construct(){
        parent::__construct();
        $this->model = new LianReward();

    }

    public function handleReward($site_id, $order_data){
        Log::write('========ly_lian========handleReward====================order_data' . json_encode($order_data));
        $goods_ids = $this->getLianGoodsIds($site_id);
        $order_goods = (new OrderGoods())->alias('og')
            ->where('og.site_id', $site_id)
            ->where('og.member_id', $order_data['member_id'])
            ->where('og.order_id', $order_data['order_id'])
            ->whereIn('og.goods_id', $goods_ids)
            ->join('shop_order o', 'og.order_id = o.order_id', 'INNER')
            ->whereIn('o.status',  [OrderDict::WAIT_DELIVERY, OrderDict::WAIT_TAKE, OrderDict::FINISH])
            ->findOrEmpty();
        Log::write('========ly_lian========handleReward===========order_goods:'.json_encode($order_goods));
        $order_member = (new Member())->where('site_id', $site_id)->where('member_id', $order_data['member_id'])->findOrEmpty();

        if(!$order_goods) return false; // 订单中没有联营商品，直接返回。

        if($order_goods){
            $this->recommendReward($site_id, $order_goods, $order_data);
            $this->seeReward($site_id, $order_goods, $order_data);
            // $this->equalReward($site_id, $order_goods, $order_data);
        }
    }


    public function recommendReward($site_id, $order_goods, $order_data){
        Log::write('============ly_lian===========recommendReward===========');
        $member = (new CoreLianMemberAttrService())->getParentMember($site_id, $order_goods['member_id']);
        $parent = (new LianMember())->where('site_id', $site_id)->where('member_id', $member['pid'])->findOrEmpty();

        $level = (new CoreLianLevelService())->getLevelByMember($site_id, $parent);
        $config = (new CoreConfigService())->getLianConfig($site_id);
        $thaw_status = $config['first_reward_frozen'];
        $reward_thaw_status = (new CoreLianRewardAttrService())->getThawStatus($site_id);

        $reward_set = (new CoreLianRewardAttrService())->getGoodsRewardSet($site_id, $order_goods, $level);//获取商品的奖励设置。
        $lian_goods = (new LianGoods())->where('site_id', $site_id)->where('goods_id', $order_goods['goods_id'])->findOrEmpty();//获取商品的奖励设置。

        if(!$parent->isEmpty()){
            $price = (new CoreLianRewardAttrService())->getCountType($site_id, $order_goods, $order_data);
            Log::write('============ly_lian===========recommendReward===========price' . $price);

            if($lian_goods['is_rule'] == 1){
                if($level['recommend_rate'] != 0){
                    $reward = $price * $level['recommend_rate'] / 100;
                }elseif($level['recommend_money'] != 0){
                    $reward = $level['recommend_money'];
                }

            }elseif($lian_goods['is_rule'] == 2){
                if($reward_set['recommend_rate'] != 0){
                    $reward = $price * $reward_set['recommend_rate'] / 100; 
                }elseif($reward_set['recommend_money'] != 0){
                    $reward = $reward_set['recommend_money']; 
                }
            }

            if($parent['thaw_status'] == 0){//如果会员的冻结收益已解冻，则不再冻结直推奖励
                if($thaw_status == 1 && $level['level_num'] == 2){//只有老板身份的直推奖才冻结
                    $frozen = $price * $level['frozen_rate'] / 100; 
                    // $reward = $reward - $frozen; 
                }else{
                    $frozen = 0; // 冻结金额。
                }
            }else{
                $frozen = 0; 
            }
            
            if($reward > 0){ // 奖励金额大于0，才进行奖励。
                $take_type = (new CoreLianRewardAttrService())->getTakeType($site_id);

                (new CoreLianRewardAttrService())->addLianReward($site_id, $parent['member_id'], $parent['level_id'], $order_goods['order_id'], 
                    $order_goods['member_id'], $config['settle_cycle'], $price, $level['recommend_rate'], $reward, 0, $reward_thaw_status, $level['frozen_rate'], $frozen);
                
                // 更新会员的收益金额。
                (new CoreLianMemberAttrService())->incReward($site_id, $parent['member_id'], $reward);
                // 更新会员的冻结金额。
                (new CoreLianMemberAttrService())->incFrozenReward($site_id, $parent['member_id'], $frozen);

                if($level['level_num'] == 2){//只有老板身份的，他的上级才能获得平级奖
                    $this->equalReward($site_id, $parent, $reward, $order_goods);
                }
            }
        }
    }

    //见点奖
    public function seeReward($site_id, $order_goods, $order_data){
        Log::write('============ly_lian===========seeReward===========');
        $order_member = (new LianMember())->where('site_id', $site_id)->where('member_id', $order_data['member_id'])->findOrEmpty();

        $lian_parent = (new LianMember())->where('site_id', $site_id)->where('member_id', $order_member['lian_pid'])->findOrEmpty();
        $lian_parent_level = (new CoreLianLevelService())->getLevelByMember($site_id, $lian_parent);

        $parent = (new LianMember())->where('site_id', $site_id)->where('member_id', $order_member['lian_pid'])->findOrEmpty();
        $parent_level = (new CoreLianLevelService())->getLevelByMember($site_id, $parent);

        // if($parent->isEmpty() || $order_member['pid'] == 0) return;
        // if($parent['status'] == 1) return; //上级会员已冻结，则不再发放见点奖

        // if($parent_level['level_num'] == 2){
        //     $reward_member = $parent;
        // }else{
        //     if($lian_parent['status'] == 1){
        //         Log::write('---see---上级会员已冻结，则不再发放见点奖');
        //         return; //上级会员已冻结，则不再发放见点奖
        //     } 
        //     if($lian_parent->isEmpty() || $order_member['lian_pid'] == 0){
        //         Log::write('---see---上级会员不存在，则不再发放见点奖');
        //         return;
        //     } 
        //     if($lian_parent['lian_pid'] > 0){    
        //         $reward_member = (new LianMember())->where('site_id', $site_id)->where('member_id', $lian_parent['lian_pid'])->findOrEmpty();
        //     }else{
        //         return;
        //     }
        // }


        if($parent['lian_pid'] == 0){
            $reward_member = (new LianMember())->where('site_id', $site_id)->where('member_id', $parent['member_id'])->findOrEmpty();
        }else{
            $reward_member = (new LianMember())->where('site_id', $site_id)->where('member_id', $parent['lian_pid'])->findOrEmpty();
        }
        
        $see_time = strtotime($reward_member['up_time']);
        Log::write('---see---升级时间：' . $see_time . '---' . '--订单支付时间：' .   $order_goods['pay_time'] . '---see_member:' . json_encode($reward_member));
        if($see_time >= $order_goods['pay_time']){
            Log::write('---see---升级时间大于订单支付时间，不发放见点奖');
            return;  //升级的同时不发放见点奖
        } 

        $reward_thaw_status = (new CoreLianRewardAttrService())->getSeeThawStatus($site_id, $reward_member);
        Log::write('---see---reward_thaw_status:' . $reward_thaw_status);

        $level = (new CoreLianLevelService())->getLevelByMember($site_id, $reward_member);
        $config = (new CoreConfigService())->getLianConfig($site_id);
        $reward_set = (new CoreLianRewardAttrService())->getGoodsRewardSet($site_id, $order_goods, $level);
        $lian_goods = (new LianGoods())->where('site_id', $site_id)->where('goods_id', $order_goods['goods_id'])->findOrEmpty();

        if(!$reward_member->isEmpty() && $level['level_num'] == 2){//只有老板身份的才获得见点奖
            Log::write('---see---见点奖---');
            $price = (new CoreLianRewardAttrService())->getCountType($site_id, $order_goods, $order_data);

            if($lian_goods['is_rule'] == 1){
                if($level['see_rate'] != 0){
                    $reward = $price * $level['see_rate'] / 100;
                }elseif($level['see_money'] != 0){
                    $reward = $level['see_money'];
                }
            }elseif($lian_goods['is_rule'] == 2){
                
                if($reward_set['see_rate'] != 0){
                    $reward = $price * $reward_set['see_rate'] / 100; 
                }elseif($reward_set['see_money'] != 0){
                    $reward = $reward_set['see_money']; 
                }
            }
           
            // //见点奖冻结
            if($reward_member['thaw_status'] == 0){
                if($level['see_frozen'] == 1){      
                    // $frozen = $price * $level['frozen_rate'] / 100;
                    $frozen = $reward * $level['frozen_rate'] / 100;  //见点奖冻结金额 = 奖励金额 * 冻结比例
                    // $reward = $reward - $frozen; 
                }else{
                    $frozen = 0; 
                }
            }else{
                $frozen = 0;  
            }
                
            if($reward > 0){
                (new CoreLianRewardAttrService())->addLianReward($site_id, $reward_member['member_id'], $reward_member['level_id'], $order_goods['order_id'], 
                $order_goods['member_id'], $config['settle_cycle'], $price, $level['see_rate'], $reward, 1, $reward_thaw_status, $level['frozen_rate'],$frozen);

                 // 更新会员的收益金额。
                (new CoreLianMemberAttrService())->incReward($site_id, $reward_member['member_id'], $reward); 
                 // 更新会员的冻结金额。
                (new CoreLianMemberAttrService())->incFrozenReward($site_id, $reward_member['member_id'], $frozen); //累加会员冻结金额

                //尝试平级奖
                $this->equalReward($site_id, $reward_member, $reward, $order_goods);
            }
        }
    }

    // 培育奖
    public function cultivateReward($site_id, $parent, $order_data){
        Log::write('============ly_lian===========cultivateReward======' );

        $level = (new CoreLianLevelService())->getLevelByMember($site_id, $parent);
        $config = (new CoreConfigService())->getLianConfig($site_id);

        $order_goods = (new CoreLianRewardAttrService())->getOrderGoods($site_id, $order_data);
        $reward_set = (new CoreLianRewardAttrService())->getGoodsRewardSet($site_id, $order_goods, $level);

        $lian_goods = (new LianGoods())->where('site_id', $site_id)->where('goods_id', $order_goods['goods_id'])->findOrEmpty();
        $reward_thaw_status = (new CoreLianRewardAttrService())->getCultivateThawStatus($site_id, $parent);

        if($level['level_num'] == 2){//只有老板身份的才获得培育奖
            $price = (new CoreLianRewardAttrService())->getCountType($site_id, $order_goods, $order_data);

            if($lian_goods['is_rule'] == 1){
                if(isset($level['cultivate_rate']) && $level['cultivate_rate'] != 0){
                    $reward = $price * $level['cultivate_rate'] / 100; 
                }elseif(isset($level['cultivate_money']) && $level['cultivate_money'] != 0){
                    $reward = $level['cultivate_money']; 
                }
            }elseif($lian_goods['is_rule'] == 2){
                if(isset($reward_set['cultivate_rate']) && $reward_set['cultivate_rate'] != 0){
                    $reward = $price * $reward_set['cultivate_rate'] / 100;
                }elseif(isset($reward_set['cultivate_money']) && $reward_set['cultivate_money'] != 0){
                    $reward = $reward_set['cultivate_money']; 
                }
            }
            
            //培育奖冻结
            if($parent['thaw_status'] == 0){
                if($level['cultivate_frozen'] == 1){      
                    // $frozen = $price * $level['frozen_rate'] / 100; // 计算冻结金额。
                    $frozen = $reward * $level['frozen_rate'] / 100; // 计算冻结金额。
                    // $reward = $reward - $frozen; // 减去冻结金额。
                }else{
                    $frozen = 0; 
                    // $reward = $reward - $frozen; 
                }
            }else{
                $frozen = 0;  
                // $reward = $reward - $frozen;  
            }
            

            if($reward > 0){
                (new CoreLianRewardAttrService())->addLianReward($site_id, $parent['member_id'], $level['level_id'], $order_data['order_id'], 
                $order_data['member_id'], $config['settle_cycle'], $price, $level['cultivate_rate'], $reward, 2, $reward_thaw_status, 
                $level['frozen_rate'],$frozen); 

                 // 更新会员的收益金额。
                (new CoreLianMemberAttrService())->incReward($site_id, $parent['member_id'], $reward);
                // 更新会员的冻结收益金额。
                (new CoreLianMemberAttrService())->incFrozenReward($site_id, $parent['member_id'], $frozen);

                 //尝试平级奖
                 $this->equalReward($site_id, $parent, $reward, $order_data);
            }
        }  
    }

    // 平级奖
    public function equalReward($site_id, $parent, $reward, $order_data){
        Log::write('============ly_lian===========equalReward======' );
        if($parent['pid'] == 0){
            Log::write('====ly_lian===没有上级不发放平级奖');
            return;
        }

        $equal_member = (new LianMember())->where('site_id', $site_id)->where('member_id', $parent['pid'])->findOrEmpty(); 
        $level = (new CoreLianLevelService())->getLevelByMember($site_id, $equal_member);
        $config = (new CoreConfigService())->getLianConfig($site_id);

        $equal_time = strtotime($parent['up_time']);
        Log::write('---equal---升级时间：' . $equal_time . '---' . '--订单支付时间：' . $order_data['pay_time'] . '---equal_member_id' . $equal_member['member_id']);
        
        if($equal_time >= $order_data['pay_time']){
            Log::write('升级时间大于等于订单支付时间不发放平级奖');
            return; // 升级时间大于等于订单创建时间不发放平级奖。
        } 

        // if(!$equal_member->isEmpty() && $level['level_num'] == 2){//只有老板身份的才获得平级奖
        if($level['level_num'] == 2){//只有老板身份的才获得平级奖
            if($level['equal_rate'] != 0){
                $money = $reward * $level['equal_rate'] / 100;
            }elseif($level['equal_money'] != 0){
                $money = $level['equal_money']; 
            }

            if($money > 0){
                (new CoreLianRewardAttrService())->addLianReward($site_id, $equal_member['member_id'], $level['level_id'], $order_data['order_id'], 
                $order_data['member_id'], $config['settle_cycle'], $reward, $level['equal_rate'], $money, 3, 1, 0, 0);
            
                // 更新会员的收益金额。
                (new CoreLianMemberAttrService())->incReward($site_id, $equal_member['member_id'], $money);
            }
        }else{
            Log::write('---ly_lian---没有上级或者上级不是老板身份不发放平级奖');
            return;
        }
    }


    public function getLianGoodsIds($site_id){
        return (new LianGoods())->where('site_id', $site_id)->where('is_lian', 1)->column('goods_id');
    }
}