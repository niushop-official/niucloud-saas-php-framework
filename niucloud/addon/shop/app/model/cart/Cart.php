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

namespace addon\shop\app\model\cart;

use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\goods\GoodsSku;
use addon\shop\app\model\goods\GoodsSpec;
use core\base\BaseModel;

/**
 * 购物车模型
 */
class Cart extends BaseModel
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
    protected $name = 'shop_cart';

    //类型
    protected $type = [

    ];

    /**
     * 搜索器:购物车表ID
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
     * 搜索器:购物车会员ID
     * @param $value
     * @param $data
     */
    public function searchMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("member_id", $value);
        }
    }

    /**
     * 搜索器:购物车商品ID
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
     * 搜索器:购物车sku id
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
     * 搜索器:购物车活动类型
     * @param $value
     * @param $data
     */
    public function searchMarketTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("market_type", $value);
        }
    }

    /**
     * 搜索器:购物车活动id
     * @param $value
     * @param $data
     */
    public function searchMarketTypeIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("market_type_id", $value);
        }
    }

    /**
     * 搜索器:购物车添加时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("create_time", $value);
        }
    }

    /**
     * 搜索器:购物车商品状态
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("status", $value);
        }
    }

    /**
     * 搜索器:购物车失效原因
     * @param $value
     * @param $data
     */
    public function searchInvalidRemarkAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("invalid_remark", $value);
        }
    }

    /**
     * 关联商品主表
     * @return \think\model\relation\HasOne
     */
    public function goods()
    {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id')
            ->joinType('inner')
            ->withTrashed()
            ->withField('goods_id, site_id, goods_name, goods_type, sub_title, goods_cover, unit, stock, sale_num + virtual_sale_num as sale_num, status,delete_time')
            ->append([ 'goods_type_name', 'goods_cover_thumb_small', 'goods_cover_thumb_mid' ]);
    }

    /**
     * 关联商品规格
     * @return \think\model\relation\HasOne
     */
    public function goodsSku()
    {
        return $this->hasOne(GoodsSku::class, 'sku_id', 'sku_id')
            ->joinType('inner')
            ->withField('sku_id, site_id, sku_name, sku_image, sku_no, goods_id, sku_spec_format, price, market_price, sale_price, stock, weight, volume, is_default')
            ->append([ 'sku_image_thumb_small', 'sku_image_thumb_mid', 'sku_image_thumb_big' ]);
    }

    /**
     * 关联商品规格列表
     * @return \think\model\relation\HasMany
     */
    public function goodsSpec()
    {
        return $this->hasMany(GoodsSpec::class, 'goods_id', 'goods_id');
    }

}
