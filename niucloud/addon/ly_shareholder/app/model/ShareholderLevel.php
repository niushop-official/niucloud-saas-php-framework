<?php

namespace addon\ly_shareholder\app\model;

use core\base\BaseModel;

/**
 * 股东等级
 */
class ShareholderLevel extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'level_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_shareholder_level';


    /**
     * 等级升级说明
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getLevelTextAttr($value, $data)
    {
        $condition = [];
        if($data['upgrade_type'] == 1) {
            $condition['text'] = '或';
        }else{
            $condition['text'] = '且';
        }
        $list = [];

        if($data['order_num'] > 0) {
            $list[] = '自购订单总数大于等于'.$data['order_num'];
        }
        if($data['order_money'] > 0) {
            $list[] = '自购订单总额大于等于'.$data['order_money'];
        }
        if($data['recharge_money'] > 0) {
            $list[] = '充值金额大于等于'.$data['recharge_money'];
        }
        if($data['order_goods_id'] != '') {
            $list[] = '购买指定商品';
        }

        $condition['list'] = $list;
        return $condition;

    }
}
