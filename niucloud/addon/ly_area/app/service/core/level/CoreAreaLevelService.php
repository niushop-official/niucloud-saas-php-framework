<?php

namespace addon\ly_area\app\service\core\level;

use addon\ly_area\app\model\AreaLevel;
use addon\ly_area\app\service\core\agent\CoreAreaAgentService;
use addon\ly_area\app\service\core\CoreAreaConfigService;
use addon\recharge\app\dict\RechargeOrderDict;
use addon\recharge\app\model\RechargeOrder;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use app\model\member\Member;
use core\base\BaseCoreService;
use think\facade\Log;

class CoreAreaLevelService extends BaseCoreService
{
    public function __construct(){
        parent::__construct();
        $this->model = new AreaLevel();
    }


    public function levelUpgrade($site_id, $member){

    }


    //自动成为股东
    public  function autoToAreaAgents($site_id, $member){
        Log::write('===========成为股东===========autoToAreaAgents');
        $member = (new Member())->where([['site_id', '=', $site_id], ['member_id', '=', $member['member_id']]])->find();
        if (empty($member)) return;
        
        $level_list = $this->getLevelList($site_id)->toArray();
        if(empty($level)) return;

        $member['order_money'] = (new Order())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $member['member_id']], ['site_id', '=', $site_id]])->sum('order_money');
        // $member['order_num'] = (new Order())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $member['member_id']], ['site_id', '=', $site_id]])->count();
        // $member['recharge_money'] = (new RechargeOrder())->where([['order_status', '=', RechargeOrderDict::WAIT_PAY], ['member_id', '=', $member['member_id']], ['site_id', '=', $site_id], ['refund_status', '=', 0]])->sum('order_money');
        
        $goodsIds = [];
        $memberOrders = (new OrderGoods())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $member['member_id']], ['site_id', '=', $site_id]])->select();
        foreach ($memberOrders as $order) {
            $goodsIdsInOrder = explode(',', $order['goods_id']);
            $goodsIds = array_merge($goodsIds, $goodsIdsInOrder);
        }

        foreach ($level_list as $level) {
            if($level['up_type'] != 0){
                if($member['order_money'] >= $level['order_money'] && in_array($level['order_goods_id'], $goodsIds)){
                    (new CoreAreaAgentService())->add($site_id, $member['member_id'], $level['level_id']);
                }
            }else{
                if($member['order_money'] >= $level['order_money'] || in_array($level['order_goods_id'], $goodsIds)){
                    (new CoreAreaAgentService())->add($site_id, $member['member_id'], $level['level_id']);
                }
            } 
        }

        Log::write([
            'member_id' => $member['member_id'],
            // 'order_num' => $member['order_num'],
            'order_money' => $member['order_money'],
            // 'recharge_money' => $member['recharge_money'],
            'order_goods_id' => $goodsIds,
            'comment' => '自动成为区域代理',
        ]);
    }


    public function getLevelList($site_id){
        $where = [];
        $config = (new CoreAreaConfigService())->getAreaConfig($site_id);

        if($config['is_street'] == 1){
            $where['level_area'] = ['in', [1, 2, 3, 4]];
        }else{
            $where['level_area'] = ['in', [1, 2, 3]];
        }
        
        return $this->model->where([['site_id', '=', $site_id], $where])->orderBy('level_id', 'asc')->select();
    }

    public function getLevelAreaList($site_id){
        $where = [];
        $config = (new CoreAreaConfigService())->getAreaConfig($site_id);

        if($config['is_street'] == 1){
            $where['level_area'] = ['in', [1, 2, 3, 4]];
        }else{
            $where['level_area'] = ['in', [1, 2, 3]];
        }

        return $where;
    }


    public function getLevelByMember($site_id, $member){
        return $this->model->where('site_id', $site_id)->where('level_id', $member['level_id'])->findOrEmpty();
    }


    public function getLevelByAgentArea($site_id, $agent_level){
        return $this->model->where('site_id', $site_id)->where('level_area', $agent_level)->findOrEmpty();
    }
}