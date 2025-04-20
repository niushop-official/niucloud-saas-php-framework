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

namespace addon\o2o\app\model;

use addon\o2o\app\dict\GoodsDict;
use app\dict\sys\FileDict;
use core\base\BaseModel;
use think\db\Query;
use think\model\concern\SoftDelete;

/**
 * 商品模型
 * Class Goods
 * @package app\model\goods
 */
class Goods extends BaseModel
{


    use SoftDelete;
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'goods_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'o2o_goods';

    /**
     * 定义软删除标记字段
     * @var string
     */
    protected $deleteTime = 'delete_time';

    /**
     * 定义软删除字段的默认值
     * @var int
     */
    protected $defaultSoftDelete = 0;

    // 设置json类型字段
    protected $json = [ 'price_list' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 关联默认商品规格
     * @return \think\model\relation\HasOne
     */
    public function goodsSku()
    {
        return $this->hasOne(GoodsSku::class, 'goods_id', 'goods_id');
    }

    /**
     * @return HasOne
     */
    public function category()
    {
        return $this->hasOne(GoodsCategory::class, 'category_id', 'goods_category')->joinType('left')->withField('category_id, category_name')->bind([ 'category_name' => 'category_name' ]);
    }

    /**
     * 通过分类ID获取数量
     * @param $category_id
     * @return int
     * @throws \think\db\exception\DbException
     */
    public function getCountByCategoryID($category_id){
        /**获取商品表中未删除且使用该分类的数据条数**/
        return $this->where([['goods_category','=',$category_id],[$this->deleteTime,'=',0]])->count();
    }
    /**
     * 状态字段转化
     * @param $value
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (isset($data[ 'status' ])) {
            return GoodsDict::getStatus()[ $data[ 'status' ] ][ 'name' ] ?? '';
        }
    }

    /**
     * 购买类型字段转化
     * @param $value
     * @return mixed
     */
    public function getBuyTypeNameAttr($value, $data)
    {
        if (isset($data[ 'buy_type' ])) {
            return GoodsDict::getBuyType($data[ 'buy_type' ])[ 'name' ] ?? '';
        }
    }

    /**
     * 获取图片缩略图
     */
    public function getGoodsImageThumbAttr($value, $data)
    {
        $thumb_arr = [];
        if ($data[ 'goods_image' ] != '') {
            $img_arr = explode(",", $data[ 'goods_image' ]);
            foreach ($img_arr as $item) {
                $thumb_arr[] = get_thumb_images($data[ 'site_id' ], $item);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图（大）
     */
    public function getGoodsImageThumbBigAttr($value, $data)
    {
        $thumb_arr = [];
        if ($data[ 'goods_image' ] != '') {
            $img_arr = explode(",", $data[ 'goods_image' ]);
            foreach ($img_arr as $item) {
                $thumb_arr[] = get_thumb_images($data[ 'site_id' ], $item, FileDict::BIG);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图（中）
     */
    public function getGoodsImageThumbMidAttr($value, $data)
    {
        $thumb_arr = [];
        if ($data[ 'goods_image' ] != '') {
            $img_arr = explode(",", $data[ 'goods_image' ]);
            foreach ($img_arr as $item) {
                $thumb_arr[] = get_thumb_images($data[ 'site_id' ], $item, FileDict::MID);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图（小）
     */
    public function getGoodsImageThumbSmallAttr($value, $data)
    {
        $thumb_arr = [];
        if ($data[ 'goods_image' ] != '') {
            $img_arr = explode(",", $data[ 'goods_image' ]);
            foreach ($img_arr as $item) {
                $thumb_arr[] = get_thumb_images($data[ 'site_id' ], $item, FileDict::SMALL);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取封面缩略图
     */
    public function getCoverThumbAttr($value, $data)
    {
        if ($data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ]);
        }
        return '';
    }

    /**
     * 获取封面缩略图（大）
     */
    public function getCoverThumbBigAttr($value, $data)
    {
        if ($data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::BIG);
        }
        return '';
    }

    /**
     * 获取封面缩略图（中）
     */
    public function getCoverThumbMidAttr($value, $data)
    {
        if ($data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::MID);
        }
        return '';
    }

    /**
     * 获取封面缩略图（小）
     */
    public function getCoverThumbSmallAttr($value, $data)
    {
        if ($data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::SMALL);
        }
        return '';
    }

    /**
     * 计算销量
     */
    public function getsaleNumAttr($value, $data)
    {
        if (isset($data[ 'virtually_sale' ]) && $data[ 'virtually_sale' ] > 0) {
            return $data[ 'virtually_sale' ] + $data[ 'sale_num' ];
        } else {
            return $data[ 'sale_num' ];
        }
    }


    /**
     * 搜索器:商品表商品名称
     * @param $value
     * @param $data
     */
    public function searchGoodsNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("goods_name", 'like', '%' . $value . '%');
        }
    }

    /**
     * 搜索器:商品销量
     * @param $value
     * @param $data
     */
    public function searchSaleNumAttr($query, $value, $data)
    {
        if (!empty($data[ 'start_sale_num' ]) && !empty($data[ 'end_sale_num' ])) {
            $money = [ $data[ 'start_sale_num' ], $data[ 'end_sale_num' ] ];
            sort($money);
            $query->where('goods.sale_num', 'between', $money);
        } else if (!empty($data[ 'start_sale_num' ])) {
            $query->where('goods.sale_num', '>=', $data[ 'start_sale_num' ]);
        } else if (!empty($data[ 'end_sale_num' ])) {
            $query->where('goods.sale_num', '<=', $data[ 'end_sale_num' ]);
        }

    }

    /**
     * 搜索器:商品表商品id
     * @param $value
     * @param $data
     */
    public function searchGoodsIdsAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("goods_id", 'in', $value);
        }
    }


    /**
     * 搜索器:商品表商品分类
     * @param $value
     * @param $data
     */
    public function searchGoodsCategoryAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("goods_category", $value);
        }
    }

    /**
     * 搜索器:商品表商品状态（1.正常0下架）
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value !== '') {
            $query->where("status", $value);
        }
    }

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
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
     *
     * @return \think\model\relation\HasMany
     */
    public function goodsItem()
    {
        return $this->hasMany(GoodsCardItem::class, 'main_goods_id');
    }
}
