<?php

namespace addon\ly_area\app\service\api;
use addon\ly_area\app\model\AreaLevel;
use core\base\BaseApiService;

class AreaLevelService extends BaseApiService
{
    public function __construct(){
        parent::__construct();
        $this->model = new AreaLevel();
    }


    public function getInfo($id){
        $info = $this->model->where('site_id', $this->site_id)->where('level_id', $id)->findOrEmpty()->toArray();
        if(empty($info['order_goods_id'])){
            $info['order_goods_id'] = [];
        }else{
            $info['order_goods_id'] = explode(',', $info['order_goods_id']);
        }

        return $info;
    }


    public function getList(){
        $list = $this->model->where('site_id', $this->site_id)->order('level_num asc')->select()->toArray();

        return $list;
    }


     /**
     * 等级升级卡片
     * @param $data
     * @return array[]
     */
    public function getAreaCardList($data)
    {
        if ($data['id'] != 0) {
            $field = '*';
            $info = $this->model->field($field)->where([['site_id', '=', $this->site_id], ['level_id', "=", $data['id']]])->findOrEmpty()->toArray();
        } else {
            $info = [
                // 'order_num' => 0,
                'order_money' => 0,
                // 'recharge_money' => 0,
                'order_goods_id' => '',
            ];
        }
        $card = [
            
            // [
            //     'card_id' => 1,
            //     'card_name' => '自购订单总数',
            //     'card_desc' => '会员自己购买的订单次数',
            //     'order_num' => $info['order_num'] ?? 0,
            //     'is_checkbox' => $info['order_num'] > 0 ? 1 : 0,
            //     'unit' => '个',
            //     'key' => 'order_num'
            // ],
            [
                'card_id' => 2,
                'card_name' => '自购订单总额',
                'card_desc' => '会员自己购买的订单总额',
                'order_money' => $info['order_money'] ?? 0,
                'is_checkbox' => $info['order_money'] > 0 ? 1 : 0,
                'unit' => '元',
                'key' => 'order_money'
            ],
            // [
            //     'card_id' => 3,
            //     'card_name' => '充值总额',
            //     'card_desc' => '会员充值的总额',
            //     'recharge_money' => $info['recharge_money'] ?? 0,
            //     'is_checkbox' => $info['recharge_money'] > 0 ? 1 : 0,
            //     'unit' => '元',
            //     'key' => 'recharge_money'
            // ],
            [
                'card_id' => 4,
                'card_name' => '购买指定商品',
                'card_desc' => '自己购买指定商品之一',
                'order_goods_id' => is_string($info['order_goods_id'])? $info['order_goods_id'] : '',
                'is_checkbox' =>!empty($info['order_goods_id']) && strlen($info['order_goods_id']) > 0? 1 : 0,
                'unit' => 'ID',
                'key' => 'order_goods_id'
            ],
           
        ];

        return $card;
    }

}