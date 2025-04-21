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

namespace addon\shop_giftcard\app\model\giftcard;

use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\goods\GoodsSku;
use core\base\BaseModel;

/**
 * 礼品卡关联商品模型
 * Class GiftcardGoods
 * @package addon\shop_giftcard\app\model\giftcard
 */
class GiftcardGoods extends BaseModel
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
    protected $name = 'shop_giftcard_goods';


    /**
     * 搜索器:礼品卡关联商品主键id
     * @param $value
     * @param $data
     */
    public function searchIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("id", $value);
        }
    }

    /**
     * 搜索器:礼品卡关联商品礼品卡活动id
     * @param $value
     * @param $data
     */
    public function searchGiftcardIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("giftcard_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡关联商品关联商品id
     * @param $value
     * @param $data
     */
    public function searchGoodsIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("goods_id", $value);
        }
    }

    /**
     * 搜索器:礼品卡关联商品关联商品规格id
     * @param $value
     * @param $data
     */
    public function searchSkuIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("sku_id", $value);
        }
    }

    /**
     * 关联商品规格
     * @return \think\model\relation\HasOne
     */
    public function sku()
    {
        return $this->hasOne(GoodsSku::class, 'sku_id', 'sku_id')
            ->joinType('left')
            ->withField('sku_id,sku_name,sku_image,goods_id,price,sku_no,stock,member_price,sale_price');
    }

    /**
     * 关联商品主表
     * @return \think\model\relation\HasOne
     */
    public function goods()
    {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id')
            ->joinType('left')
            ->withField('goods_id, goods_name,member_discount,is_discount');
    }

}
