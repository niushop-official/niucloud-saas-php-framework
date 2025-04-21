<?php

namespace addon\ly_shareholder\app\service\core;

use addon\ly_shareholder\app\model\Shareholder;
use addon\ly_shareholder\app\model\ShareholderLevel;
use addon\recharge\app\dict\RechargeOrderDict;
use addon\recharge\app\model\RechargeOrder;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use app\model\member\Member;
use core\base\BaseCoreService;
use think\Model;
use think\facade\Log;


/**
 * 股东等级
 */
class CoreShareholderLevelService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new ShareholderLevel();
    }

    /**
     * 股东升级检测
     */
    public static function shareholderUpgrade($site_id, $shareholder_member_id)
    {
        try {
            $shareholder_info = (new Shareholder())->where([['site_id', '=', $site_id], ['member_id', '=', $shareholder_member_id]])->field('member_id,level_id,amount,rate')->findOrEmpty()->toArray();
            if (empty($shareholder_info)) return;
            $shareholder_level_info = (new ShareholderLevel())->where([['site_id', '=', $site_id], ['level_id', '=', $shareholder_info['level_id']]])->field('level_id,level_num')->findOrEmpty()->toArray();
            $level_info = (new ShareholderLevel())->where([['site_id', '=', $site_id], ['level_num', '>', $shareholder_level_info['level_num']]])->order("level_num asc")->field('level_id,level_num, upgrade_type, order_goods_id, order_num, order_money, recharge_money')->findOrEmpty()->toArray();
            if (empty($level_info)) return;//等级信息不存在
            
            //检测升级条件
            //查询股东自购订单数与订单金额(订单完成)
            $shareholder_info['order_num'] = (new Order())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $shareholder_member_id], ['site_id', '=', $site_id]])->count();
            $shareholder_info['order_money'] = (new Order())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $shareholder_member_id], ['site_id', '=', $site_id]])->sum('order_money');
            $shareholder_info['recharge_money'] = (new RechargeOrder())->where([['order_status', '=', RechargeOrderDict::FINISH], ['member_id', '=', $shareholder_member_id], ['site_id', '=', $site_id], ['refund_status', '=', 0]])->sum('order_money');
            
            $goodsIds = [];
            $memberOrders = (new OrderGoods())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $shareholder_member_id], ['site_id', '=', $site_id]])->select();
            foreach ($memberOrders as $order) {
                $goodsIdsInOrder = explode(',', $order['goods_id']);
                $goodsIds = array_merge($goodsIds, $goodsIdsInOrder);
            }

            $upgrade_level = [];
            if ($level_info['upgrade_type'] == 1) {
                if (($shareholder_info['order_num'] >= $level_info['order_num']) &&
                    ($shareholder_info['order_money'] >= $level_info['order_money']) &&
                    ($shareholder_info['recharge_money'] >= $level_info['recharge_money']) &&
                    in_array($level_info['order_goods_id'], $goodsIds)){   //购买指定商品之一
                    $upgrade_level = $level_info;
                }
            } else {
                if (($shareholder_info['order_num'] >= $level_info['order_num']) ||
                    ($shareholder_info['order_money'] >= $level_info['order_money']) ||
                    ($shareholder_info['recharge_money'] >= $level_info['recharge_money']) ||
                    in_array($level_info['order_goods_id'], $goodsIds)) {
                    $upgrade_level = $level_info;
                }
            }
            if ($upgrade_level) {
                (new Shareholder())->where([['site_id', '=', $site_id], ['member_id', '=', $shareholder_member_id]])->update(['level_id' => $upgrade_level['level_id']]);
            }
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }


    //自动成为股东
    public  function autoToShareholder($site_id, $member_id){
        $member = (new Member())->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->find();
        if (empty($member)) return;

        $level = $this->model->where([['site_id', '=', $site_id], ['level_num', '=', 1]])->find();
        if(empty($level)) return;

        $member['order_money'] = (new Order())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $member_id], ['site_id', '=', $site_id]])->sum('order_money');
        $member['order_num'] = (new Order())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $member_id], ['site_id', '=', $site_id]])->count();
        $member['recharge_money'] = (new RechargeOrder())->where([['order_status', '=', RechargeOrderDict::WAIT_PAY], ['member_id', '=', $member_id], ['site_id', '=', $site_id], ['refund_status', '=', 0]])->sum('order_money');
        
        $goodsIds = [];
        $memberOrders = (new OrderGoods())->where([['status', '=', OrderDict::FINISH], ['member_id', '=', $member_id], ['site_id', '=', $site_id]])->select();
        foreach ($memberOrders as $order) {
            $goodsIdsInOrder = explode(',', $order['goods_id']);
            $goodsIds = array_merge($goodsIds, $goodsIdsInOrder);
        }

        if($level['upgrade_type'] != 1){
            if(($member['order_num'] >= $level['order_num']) && $member['order_money'] >= $level['order_money'] && $member['recharge_money'] >= $level['recharge_money'] && in_array($level['order_goods_id'], $goodsIds)){
                (new CoreShareholderService())->add($site_id, $member_id,$level['level_id']);
            }
        }else{
            if(($member['order_num'] >= $level['order_num']) || $member['order_money'] >= $level['order_money'] || $member['recharge_money'] >= $level['recharge_money'] || in_array($level['order_goods_id'], $goodsIds)){
                (new CoreShareholderService())->add($site_id, $member_id,$level['level_id']);
                Log::write('==========走到这里了==========', 'INFO');
            }
        }

        Log::write([
            'member_id' => $member_id,
            'order_num' => $member['order_num'],
            'order_money' => $member['order_money'],
            'recharge_money' => $member['recharge_money'],
            'order_goods_id' => $goodsIds,
            'comment' => '自动成为股东',
        ]);
    }

    //**

    /**
     * 获取默认股东等级
     * @param $site_id
     * @return ShareholderLevel|array|mixed|Model
     */
    public function findDefaultShareholderLevel($site_id)
    {
        return $this->model->where([['site_id', '=', $site_id]])->findOrEmpty();
    }

    public function findShareholderLevel($site_id, $level_id)
    {
        return $this->model->where([['site_id', '=', $site_id], ['level_id', '=', $level_id]])->findOrEmpty();
    }

    /**
     * 获取所有等级信息
     * @param $site_id 站点ID
     * @return array|\think\Collection
     */
    public function getAllLevel($site_id)
    {
        return $this->model->where([['site_id', '=', $site_id]])->select();
    }

    public function getLevelByMember($site_id, $member){
        $level = $this->model->where([['site_id', '=', $site_id], ['level_id', '=', $member['level_id']]])->findOrEmpty();
        return $level;
    }

}
