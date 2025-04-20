<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shop_fenxiao\app\model\fenxiao;

use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoGoodsDict;
use app\model\member\Member;
use core\base\BaseModel;

/**
 * 分销订单项目
 */
class FenxiaoOrderGoods extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao_order_goods';

    protected $type = [
        'settlement_time' =>'timestamp',
    ];


    /**
     * 关联会员
     * @return \think\model\relation\hasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'fenxiao_member_id')->joinType('left');
    }

    /**
     * 订单关联
     * @return \think\model\relation\HasOne
     */
    public function shopOrder(){
        return $this->hasOne(Order::class, 'order_id', 'order_id')->joinType('left');
    }
    /**
     * 订单项关联
     * @return \think\model\relation\HasOne
     */
    public function orderGoods(){
        return $this->hasOne(OrderGoods::class, 'order_goods_id', 'order_goods_id')->joinType('left');
    }
    /**
     * 计算方式
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getCalculateTypeNameAttr($value, $data)
    {
        if (empty($data['calculate_type']))
            return '';
        return FenxiaoGoodsDict::getCalculateType()[$data['calculate_type']] ?? '';
    }

    /**
     * 是否是已经结算
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchIsSettlementAttr($query, $value, $data)
    {
        if ($value != 'all') {
            $query->where('is_settlement', $value);
        }
    }
}
