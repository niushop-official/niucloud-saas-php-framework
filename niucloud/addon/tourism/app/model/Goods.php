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

namespace addon\tourism\app\model;

use addon\tourism\app\dict\goods\GoodsDict;
use addon\tourism\app\dict\goods\GoodsTagDict;
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
    protected $name = 'tourism_goods';

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

    /**
     * 状态字段转化
     * @param $value
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if (isset($data[ 'status' ])) {
            return GoodsTagDict::getStatus()[ $data[ 'status' ] ][ 'name' ] ?? '';
        }

    }

    /**
     * 合并房型参数
     * @param $value
     * @param $data
     */
    public function getAttrNameAttr($value, $data)
    {
        if (isset($data[ 'room_bed' ]) && isset($data[ 'room_area' ]) && isset($data[ 'room_stay' ]) && isset($data[ 'room_floor' ])) {
            return $data[ 'room_bed' ] . '|' . $data[ 'room_area' ] . '㎡|' . $data[ 'room_stay' ] . '人|' . $data[ 'room_floor' ];
        }
    }

    /**
     * 获取图片缩略图
     */
    public function getImageThumbAttr($value, $data)
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
    public function getImageThumbBigAttr($value, $data)
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
    public function getImageThumbMidAttr($value, $data)
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
    public function getImageThumbSmallAttr($value, $data)
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
        return [];
    }

    /**
     * 商品类型名称
     * @param $value
     * @param $data
     * @return array|mixed
     * @throws \Exception
     */
    public function getGoodsTypeNameAttr($value, $data)
    {
        if (empty($data[ 'goods_type' ])) return '';
        return GoodsDict::getType($data[ 'goods_type' ]) ?? '';
    }

    /**
     * 获取封面缩略图（大）
     */
    public function getCoverThumbBigAttr($value, $data)
    {
        if ($data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::BIG);
        }
        return [];
    }

    /**
     * 获取封面缩略图（中）
     */
    public function getCoverThumbMidAttr($value, $data)
    {
        if ($data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::MID);
        }
        return [];
    }

    /**
     * 获取封面缩略图（小）
     */
    public function getCoverThumbSmallAttr($value, $data)
    {
        if ($data[ 'goods_cover' ] != '') {
            return get_thumb_images($data[ 'site_id' ], $data[ 'goods_cover' ], FileDict::SMALL);
        }
        return [];
    }

    /**
     * 商品类型
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchGoodsTypeAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('goods_type', $value);
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
     * 关联酒店
     * @return \think\model\relation\HasOne
     */
    public function hotel()
    {
        return $this->hasOne(Hotel::class, 'hotel_id', 'hotel_id')->joinType('inner');
    }

    /**
     * 关联景点
     * @return \think\model\relation\HasOne
     */
    public function scenic()
    {
        return $this->hasOne(Scenic::class, 'scenic_id', 'scenic_id')->joinType('inner');
    }

    /**
     * 关联路线
     * @return \think\model\relation\HasOne
     */
    public function way()
    {
        return $this->hasOne(Way::class, 'way_id', 'way_id')->joinType('inner');
    }

    /**
     * 房间名称搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchGoodsNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('goods_name', 'like', '%' . $value . '%');
        }
    }


}
