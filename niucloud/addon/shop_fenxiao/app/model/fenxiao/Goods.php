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

use addon\shop\app\dict\goods\GoodsDict;
use addon\shop\app\service\core\delivery\CoreDeliveryService;
use app\dict\sys\FileDict;
use core\base\BaseModel;
use think\model\concern\SoftDelete;
use addon\shop\app\model\goods\GoodsSku;
use addon\shop\app\model\goods\GoodsSpec;

/**
 * 商品模型(分销使用)
 * Class Goods
 * @package addon\shop\app\model\goods
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
    protected $name = 'shop_goods';

    /**
     * 定义软删除标记字段.
     * @var string
     */
    protected $deleteTime = 'delete_time';

    /**
     * 定义软删除字段的默认值
     * @var int
     */
    protected $defaultSoftDelete = 0;

    // 设置json类型字段
    protected $json = [ 'goods_category', 'label_ids' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getGoodsTypeNameAttr($value, $data)
    {
        if (!empty($data[ 'goods_type' ])) {
            return GoodsDict::getType($data[ 'goods_type' ])[ 'name' ] ?? '';
        }
        return '';
    }

    /**
     * 状态字段转化
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getGoodsEditPathAttr($value, $data)
    {
        if (!empty($data[ 'goods_type' ])) {
            return GoodsDict::getType($data[ 'goods_type' ])[ 'path' ] ?? '';
        }
        return '';
    }

    /**
     * 状态字段转化：配送方式
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getDeliveryTypeListAttr($value, $data)
    {
        if (!empty($data[ 'delivery_type' ])) {
            $deliver_list = ( new CoreDeliveryService() )->getDeliveryConfig($data[ 'site_id' ]);
            $res = [];
            foreach ($data[ 'delivery_type' ] as $k => $v) {
                if (isset($deliver_list[ $v ]) && $deliver_list[ $v ][ 'status' ] == 1) {
                    $res[ $v ] = $deliver_list[ $v ];
                }
            }
            return $res;
        }
        return '';
    }

    /**
     * 获取封面缩略图（小）
     */
    public function getGoodsCoverThumbSmallAttr($value, $data)
    {
        if (isset($data[ 'goods_cover' ]) && $data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::SMALL);
        }
        return [];
    }

    /**
     * 获取封面缩略图（中）
     */
    public function getGoodsCoverThumbMidAttr($value, $data)
    {
        if (isset($data[ 'goods_cover' ]) && $data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::MID);
        }
        return [];
    }

    /**
     * 获取封面缩略图（大）
     */
    public function getGoodsCoverThumbBigAttr($value, $data)
    {
        if (isset($data[ 'goods_cover' ]) && $data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::BIG);
        }
        return [];
    }

    /**
     * 获取商品图片缩略图（小）
     */
    public function getGoodsImageThumbSmallAttr($value, $data)
    {
        if (isset($data[ 'goods_image' ]) && $data[ 'goods_image' ] != '') {
            $goods_image = explode(',', $data[ 'goods_image' ]);
            $img_arr = [];
            foreach ($goods_image as $k => $v) {
                $img = get_thumb_images($data[ 'site_id' ], $v, FileDict::SMALL);
                if (!empty($img)) {
                    $img_arr[] = $img;
                }
            }
            return $img_arr;
        }
        return [];
    }

    /**
     * 获取商品图片缩略图（中）
     */
    public function getGoodsImageThumbMidAttr($value, $data)
    {
        if (isset($data[ 'goods_image' ]) && $data[ 'goods_image' ] != '') {
            $goods_image = explode(',', $data[ 'goods_image' ]);
            $img_arr = [];
            foreach ($goods_image as $k => $v) {
                $img = get_thumb_images($data[ 'site_id' ], $v, FileDict::MID);
                if (!empty($img)) {
                    $img_arr[] = $img;
                }
            }
            return $img_arr;
        }
        return [];
    }

    /**
     * 获取商品图片缩略图（大）
     */
    public function getGoodsImageThumbBigAttr($value, $data)
    {
        if (isset($data[ 'goods_image' ]) && $data[ 'goods_image' ] != '') {
            $goods_image = explode(',', $data[ 'goods_image' ]);
            $img_arr = [];
            foreach ($goods_image as $k => $v) {
                $img = get_thumb_images($data[ 'site_id' ], $v, FileDict::BIG);
                if (!empty($img)) {
                    $img_arr[] = $img;
                }
            }
            return $img_arr;
        }
        return [];
    }

    /**
     * 获取商品分类
     */
    public function getGoodsCategoryAttr($value, $data)
    {
        if (!empty($value)) {
            return array_map(function($item) {
                return (int) $item;
            }, $value);
        }
        return [];
    }

    /**
     * 搜索器:商品商品id
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
     * 搜索器:商品商品名称
     * @param $value
     * @param $data
     */
    public function searchGoodsNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("goods_name", "like", "%" . $this->handelSpecialCharacter($value) . "%");
        }
    }

    /**
     * 搜索器:商品副标题
     * @param $value
     * @param $data
     */
    public function searchSubTitleAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where("sub_title", "like", "%" . $value . "%");
        }
    }

    /**
     * 搜索器:商品商品类型
     * @param $value
     * @param $data
     */
    public function searchGoodsTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("goods_type", $value);
        }
    }

    /**
     * 搜索器:商品商品分类
     * @param $value
     * @param $data
     */
    public function searchGoodsCategoryAttr($query, $value, $data)
    {
        if ($value) {
            if (gettype($value) == 'array') {
                $like_arr = [];
                foreach ($value as $k => $v) {
                    $like_arr[] = "%" . $v . "%";
                }
                $query->where("goods_category", "like", $like_arr, 'or');
            } else {
                $query->where("goods_category", "like", '%' . $value . '%');
            }
        }
    }

    /**
     * 搜索器:商品标签组
     * @param $value
     * @param $data
     */
    public function searchLabelIdsAttr($query, $value, $data)
    {
        if ($value) {
            if (gettype($value) == 'array') {
                $like_arr = [];
                foreach ($value as $k => $v) {
                    $like_arr[] = "%" . $v . "%";
                }
                $query->where("label_ids", "like", $like_arr, 'or');
            } else {
                $query->where("label_ids", "like", '%' . $value . '%');
            }
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
     * 搜索器:商品商品状态（1.正常0下架）
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
     * 关联默认商品规格
     * @return \think\model\relation\HasOne
     */
    public function goodsSku()
    {
        return $this->hasOne(GoodsSku::class, 'goods_id', 'goods_id');
    }

    /**
     * 关联分销商品
     * @return \think\model\relation\hasOne
     */
    public function fenxiaoGoods()
    {
        return $this->hasOne(FenxiaoGoods::class, 'goods_id', 'goods_id');
    }

    /**
     * 关联分销商品规则
     * @return \think\model\relation\hasOne
     */
    public function fenxiaoGoodsRule()
    {
        return $this->hasMany(FenxiaoGoodsRule::class, 'goods_id', 'goods_id');
    }

    /**
     * 关联商品规格列表
     * @return \think\model\relation\HasMany
     */
    public function skuList()
    {
        return $this->hasMany(GoodsSku::class, 'goods_id', 'goods_id');
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
