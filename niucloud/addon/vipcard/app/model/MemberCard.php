<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\vipcard\app\model;

use addon\vipcard\app\dict\GoodsDict;
use addon\vipcard\app\dict\MemberCardDict;
use app\model\member\Member;
use core\base\BaseModel;

/**
 *  会员卡
 * Class VipcardGoodsCategory
 * @package app\model\vipcard_goods_category
 */
class MemberCard extends BaseModel
{
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'card_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'vipcard_member_card';

    protected $type = [
    ];

    /**
     * 关联会员领取项表
     * @return \think\model\relation\HasMany
     */
    public function memberCardItem(){
        return $this->hasMany( MemberCardItem::class,'card_id', 'card_id');
    }

    /**
     * 关联会员信息
     * @return \think\model\relation\HasOne
     */
    public function member()
    {
        return $this->hasOne( Member::class,'member_id', 'member_id')->joinType('left');
    }

    /**
     * 关联商品信息
     * @return \think\model\relation\HasOne
     */
    public function goods(){
        return $this->hasOne( Goods::class,'goods_id', 'goods_id');
    }

    /**
     * 关联核销记录
     * @return \think\model\relation\HasOne
     */
    public function verify(){
        return $this->hasOne( MemberCardVerify::class,'card_id', 'card_id');
    }

    /**
     * 关联订单
     * @return \think\model\relation\HasOne
     */
    public function order(){
        return $this->hasOne( Order::class,'order_id', 'order_id');
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'create_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'create_time', '<=', $end_time ] ]);
        }
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCardTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_type", $value);
        }
    }

    /**
     * 购买单号搜索器
     * @param $value
     */
    public function searchCardNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_no", "like", "%$value%");
        }
    }

    /**
     * 状态搜索器
     * @param $value
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("status", $value);
        }
    }

    /**
     * goodsid搜索器
     * @param $value
     */
    public function searchGoodsIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("goods_id", $value);
        }
    }

    /**
     * 时间类型转换
     * @param $value
     * @param $data
     * @return string
     */
    public function getExpireTimeNameAttr($value, $data){
        return $data['expire_time'] ? get_date_by_time($data['expire_time']) : '永久有效';
    }

    /**
     *
     * @param $value
     * @param $data
     * @return array|mixed|string|void
     */
    public function getStatusNameAttr($value, $data) {
        if (isset($data['status'])) {
            return MemberCardDict::getStatus($data['status'])['name'] ?? '';
        }
    }

    /**
     * 商品类型转换
     * @param $value
     * @param $data
     * @return array|mixed
     */
    public function getGoodsTypeNameAttr($value, $data) {
        if ($data['goods_type']) {
            return GoodsDict::getGoodsType($data['goods_type'])['name'];
        }
    }

    /**
     * 卡项类型转换
     * @param $value
     * @param $data
     * @return array|mixed
     */
    public function getCardTypeNameAttr($value, $data) {
        if($data['card_type']){
            return GoodsDict::getCardType($data['card_type'])['name'];
        }
    }

    /**
     * 核销记录
     * @return \think\model\relation\HasMany
     */
    public function verifyRecord() {
        return $this->hasMany(MemberCardVerify::class, 'card_id', 'card_id');
    }
}
