<?php

namespace addon\ly_lian\app\service\api;

use addon\ly_lian\app\model\Level;
use core\base\BaseApiService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

class LianLevelService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Level();
    }

    /**
     * 获取链动等级
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getList()
    {
        $list = $this->model->where([['site_id', "=", $this->site_id]])->order('level_num')->select()->toArray();
        return $list;
    }

    /**
     * 获取链动等级信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = '*';

        $info = $this->model->field($field)->where([['site_id', '=', $this->site_id], ['level_id', '=', $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取最低的链动等级
     * @param array $condition
     * @param string $field
     * @return array
     */
    public function getMinLevel()
    {
        $field = '*';

        $info = $this->model->field($field)->where(['site_id', '=', $this->site_id])->order("level_num asc")->findOrEmpty()->toArray();
        return $info;
    }


    /**
     * 等级升级卡片
     * @param $data
     * @return array[]
     */
    public function getLianCardList($data)
    {
        if ($data['id'] != 0) {
            $field = '*';
            $info = $this->model->field($field)->where([['site_id', '=', $this->site_id], ['level_id', "=", $data['id']]])->findOrEmpty()->toArray();
        } else {
            $info = [
                'recommend_num' => 0,
                'up_goods_num' => 0,
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
                'card_id' => 1,
                'card_name' => '直推人数',
                'card_desc' => '直推等级一的人数',
                'recommend_num' => $info['recommend_num'] ?? 0,
                'is_checkbox' => $info['recommend_num'] > 0 ? 1 : 0,
                'unit' => '人',
                'key' => 'recommend_num'
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
                'card_id' => 2,
                'card_name' => '购买指定商品数量',
                'card_desc' => '指定件数，指定商品可到商品管理列表进行设置',
                'up_goods_num' => $info['up_goods_num'] ?? 0,
                'is_checkbox' => $info['up_goods_num'] > 0 ? 1 : 0,
                'unit' => '件',
                'key' => 'up_goods_num'
            ],
           
        ];

        return $card;
    }
}