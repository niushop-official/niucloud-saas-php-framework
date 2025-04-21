<?php

namespace addon\ly_shareholder\app\service\api;

use addon\ly_shareholder\app\model\ShareholderLevel;
use core\base\BaseApiService;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;


/**
 * 股东等级服务层
 * Class ShareholderLevelService
 * @package addon\ly_shareholder\app\service\api
 */
class ShareholderLevelService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new ShareholderLevel();
    }

    /**
     * 获取股东等级
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
     * 获取股东等级信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'level_id,site_id,level_num,level_name,rate,upgrade_type,upgrade_order_money,order_num,order_money,order_goods_id,recharge_money,status,create_time,update_time,is_default';

        $info = $this->model->field($field)->where([['site_id', '=', $this->site_id], ['level_id', '=', $id]])->findOrEmpty()->toArray();
        return $info;
    }

    /**
     * 获取最低的分销商等级
     * @param array $condition
     * @param string $field
     * @return array
     */
    public function getMinLevel()
    {
        $field = 'level_id,site_id,level_num,level_name,rate,upgrade_type,upgrade_order_money,order_num,order_money,order_goods_id,recharge_money,status,create_time,update_time';

        $info = $this->model->field($field)->where(['site_id', '=', $this->site_id])->order("level_num desc")->findOrEmpty()->toArray();
        return $info;
    }


    /**
     * 等级升级卡片
     * @param $data
     * @return array[]
     */
    public function getShareholderCardList($data)
    {
        if ($data['id'] != 0) {
            $field = 'level_id,site_id,level_num,level_name,rate,upgrade_type,upgrade_order_money,order_num,order_money,order_goods_id,recharge_money,status,create_time,update_time';
            $info = $this->model->field($field)->where([['site_id', '=', $this->site_id], ['level_id', "=", $data['id']]])->findOrEmpty()->toArray();
        } else {
            $info = [
                'order_num' => 0,
                'order_money' => 0,
                'recharge_money' => 0,
                'order_goods_id' => '',
            ];
        }
        $card = [
            
            [
                'card_id' => 1,
                'card_name' => '自购订单总数',
                'card_desc' => '会员自己购买的订单次数',
                'order_num' => $info['order_num'] ?? 0,
                'is_checkbox' => $info['order_num'] > 0 ? 1 : 0,
                'unit' => '个',
                'key' => 'order_num'
            ],
            [
                'card_id' => 2,
                'card_name' => '自购订单总额',
                'card_desc' => '会员自己购买的订单总额',
                'order_money' => $info['order_money'] ?? 0,
                'is_checkbox' => $info['order_money'] > 0 ? 1 : 0,
                'unit' => '元',
                'key' => 'order_money'
            ],
            [
                'card_id' => 3,
                'card_name' => '充值总额',
                'card_desc' => '会员充值的总额',
                'recharge_money' => $info['recharge_money'] ?? 0,
                'is_checkbox' => $info['recharge_money'] > 0 ? 1 : 0,
                'unit' => '元',
                'key' => 'recharge_money'
            ],
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
