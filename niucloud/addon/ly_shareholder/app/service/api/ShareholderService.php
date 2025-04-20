<?php

namespace addon\ly_shareholder\app\service\api;

use addon\ly_shareholder\app\dict\shareholder\ShareholderDict;
use addon\ly_shareholder\app\model\Shareholder;
use addon\ly_shareholder\app\model\ShareholderLog;
use addon\recharge\app\model\RechargeOrder;
use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use app\model\member\MemberAccountLog;
use core\base\BaseApiService;

/**
 *  股东
 */
class ShareholderService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Shareholder();
    }

    /**
     * 查询股东信息
     * @return array
     */
    public function getInfo()
    {
        $field = 'shareholder_id,site_id,shareholder_no,member_id,level_id,rate,order_amount,amount,amount_get,amount_cash_outing,status,create_time,lock_time';
        $info = $this->model->where([['member_id', '=', $this->member_id]])
            ->with(
                [
                    'member' => function ($query) {
                        $query->field('member_id,nickname,headimg');
                    },

                    'shareholder_level' => function ($query) {
                        $query->withField('level_id, level_name, rate');
                    },
                    
                ]
            )->field($field)->append(['status_name'])->findOrEmpty()->toArray();

        return $info;
    }

    /**
     * 股东信息
     * @return array
     */
    public function getDetail()
    {
        $field = 'shareholder_id,site_id,shareholder_no,member_id,level_id,rate,order_amount,amount,amount_get,amount_cash_outing,status,create_time,lock_time';
        $info = $this->model->where([['member_id', '=', $this->member_id]])
            ->with(
                [
                    'member' => function ($query) {
                        $query->field('member_id,nickname,headimg');
                    },

                    'shareholder_level' => function ($query) {
                        $query->withField('level_id, level_name');
                    },

                ]
            )->field($field)->append(['status_name'])->findOrEmpty()->toArray();

        return $info;
    }

    /**
     * 获取股东账户信息
     */
    public function getAccount()
    {
        $field = 'shareholder_id,site_id,member_id,level_id,amount,amount_get,amount_cash_outing';

        $info = $this->model->where([['member_id', '=', $this->member_id]])->with([
            'member' => function ($query) {
                $query->field('member_id,username,headimg');
            },
        ])->field($field)->findOrEmpty()->toArray();
        
        return $info;
    }


    /**
     * 股东账户明细
     * @return array
     */
    public function getAccountDetail(){
        $config = (new ConfigService())->getShareholderConfig();
        $type = (new ShareholderLog())->getTakeTypeAttr($config['shareholder_config']['take_type']);

        $info = (new MemberAccountLog())->where('site_id', $this->site_id)
            ->where([['member_id', '=', $this->member_id]])
            ->where('account_type', $type)
            ->where('from_type', 'shareholder')
            ->order('create_time desc')->select()->toArray();
        
        return $info;
    }

   
    public function getShareholderOrderStat(){
        $order_stat = (new OrderGoods())->where('site_id', $this->site_id)->where('member_id', $this->member_id)->field('sum(order_goods_money) as order_money, count(order_goods_id) as order_num, goods_id')->findOrEmpty()->toArray();

        $recharge_stat = (new RechargeOrder())->where('site_id', $this->site_id)->where('member_id', $this->member_id)->field('sum(order_money) as recharge_money')->findOrEmpty()->toArray();
        
        // 根据goods_id获取商品信息
        $goods_ids = explode(',', $order_stat['goods_id'] ?? '');
        $goods_list = (new Goods())->where('site_id', $this->site_id)->where('goods_id', 'in', $goods_ids)->field('goods_id,goods_name,goods_cover')->select()->toArray();
        
        return [
            'order_money' => $order_stat['order_money'] ?? 0.00,
            'order_num' => $order_stat['order_num'] ?? 0.00,
            'recharge_money' => $recharge_stat['order_money'] ?? 0.00,
            'order_goods_id' => $order_stat['goods_id'] ?? [],
            'goods_list' => $goods_list
        ];
    }
}
