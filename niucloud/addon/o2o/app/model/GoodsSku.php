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

namespace addon\o2o\app\model;

use app\dict\sys\FileDict;
use core\base\BaseModel;

/**
 * 商品规格模型
 * Class GoodsSku
 * @package addon\o2o\app\model\goods_sku
 */
class GoodsSku extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'sku_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'o2o_goods_sku';

    /**
     * 获取商品缩略图（小）
     */
    public function getSkuImageThumbSmallAttr($value, $data)
    {
        if (isset($data[ 'sku_image' ]) && $data[ 'sku_image' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'sku_image' ], FileDict::SMALL);
        }
        return [];
    }

    /**
     * 获取商品缩略图（中）
     */
    public function getSkuImageThumbMidAttr($value, $data)
    {
        if (isset($data[ 'sku_image' ]) && $data[ 'sku_image' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'sku_image' ], FileDict::MID);
        }
        return [];
    }

    /**
     * 获取商品缩略图（大）
     */
    public function getSkuImageThumbBigAttr($value, $data)
    {
        if (isset($data[ 'sku_image' ]) && $data[ 'sku_image' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'sku_image' ], FileDict::BIG);
        }
        return [];
    }

    /**
     * 搜索器:商品规格商品sku_id
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
     * 搜索器:商品规格商品sku名称
     * @param $value
     * @param $data
     */
    public function searchSkuNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("sku_name", "like", "%" . $value . "%");
        }
    }

    /**
     * 搜索器:商品规格商品sku编码
     * @param $value
     * @param $data
     */
    public function searchSkuNoAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("sku_no", "like", "%" . $value . "%");
        }
    }

    /**
     * 搜索器:商品规格商品id
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
     * 搜索器:商品规格sku单价
     * @param $value
     * @param $data
     */
    public function searchPriceAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("price", $value);
        }
    }

    /**
     * 搜索器:商品规格划线价
     * @param $value
     * @param $data
     */
    public function searchMarketPriceAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("market_price", $value);
        }
    }

    /**
     * 搜索器:商品规格sku主图
     * @param $value
     * @param $data
     */
    public function searchSkuImageAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("sku_image", $value);
        }
    }

    /**
     * 搜索器:商品规格是否默认
     * @param $value
     * @param $data
     */
    public function searchIsDefaultAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("is_default", $value);
        }
    }

    /**
     * 关联商品主表
     * @return \think\model\relation\HasOne
     */
    public function goods()
    {
        return $this->hasOne(Goods::class, 'goods_id', 'goods_id')
            ->joinType('left')
            ->withField('goods_id, poster_id, member_discount, site_id, goods_name, goods_cover, goods_image, sale_num + virtually_sale as sale_num, status, goods_category,after_sales,buy_type,price_list,goods_content,buy_info')
            ->append([ 'goods_cover_thumb_small', 'goods_cover_thumb_mid', 'goods_image_thumb_small', 'goods_image_thumb_mid', 'goods_image_thumb_big', 'buy_type_name' ]);
    }

    /**
     * 关联商品规格列表
     * @return \think\model\relation\HasMany
     */
    public function skuList()
    {
        return $this->hasMany(GoodsSku::class, 'goods_id', 'goods_id');
    }

}
