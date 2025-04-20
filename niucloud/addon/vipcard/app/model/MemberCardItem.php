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

use core\base\BaseModel;

/**
 *  会员卡项
 * Class VipcardGoodsCategory
 * @package app\model\vipcard_goods_category
 */
class MemberCardItem extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'item_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'vipcard_member_card_item';

    /**
     * 关联卡项表
     * @return \think\model\relation\HasOne
     */
    public function card() {
        return $this->hasOne(MemberCard::class, 'card_id', 'card_id');
    }

    /**
     * 关联会员卡项核销记录(多项)
     * @return \think\model\relation\HasMany
     */
    public function memberCardVerify(){
        return $this->hasMany( MemberCardVerify::class,'card_item_id', 'item_id');
    }

    /**
     * 关联会员卡项核销记录(单项)
     * @return \think\model\relation\HasMany
     */
    public function memberCardVerifyOne(){
        return $this->hasOne( MemberCardVerify::class,'card_item_id', 'item_id');
    }

    /**
     * 关联商品
     * @return \think\model\relation\HasOne
     */
    public function goods() {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id')->bind(['goods_name', 'goods_cover', 'price', 'cover_thumb_small', "goods_type", "goods_type_name"]);
    }

    public function getExpireTimeNameAttr($value, $data){
        return $data['expire_time'] ? get_date_by_time($data['expire_time']) : '永久有效';
    }
}
