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

use core\base\BaseModel;
use think\db\Query;
use app\dict\sys\FileDict;
use think\model\concern\SoftDelete;
use addon\tourism\app\dict\hotel\HotelTagDict;

/**
 * 酒店模型
 * Class Hotel
 * @package app\model\hotel
 */
class Hotel extends BaseModel
{


    use SoftDelete;
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'hotel_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'tourism_hotel';

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
     * 关联房型
     */
    public function goods()
    {
        return $this->hasOne( Goods::class,'hotel_id', 'hotel_id')->joinType('inner');
    }

    /**
     * 状态字段转化
     * @param $value
     * @return mixed
     */
    public function getHotelStatusNameAttr($value, $data)
    {
        if(isset($data['hotel_status']))
        {
            return HotelTagDict::getStatus()[$data['hotel_status']]['name'] ?? '';
        }

    }

    /**
     * 获取图片缩略图(全)
     */
    public function getImageThumbAttr($value, $data){
        $thumb_arr = [];
        if($data['hotel_images'] != ""){
           $thumb_arr = [];
           $img_arr = explode(",", $data['hotel_images']);
           foreach ($img_arr as $item){
               $thumb_arr[] = get_thumb_images($data['site_id'], $item);
           }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图(大)
     */
    public function getImageThumbBigAttr($value, $data){
        $thumb_arr = [];
        if($data['hotel_images'] != ""){
            $thumb_arr = [];
            $img_arr = explode(",", $data['hotel_images']);
            foreach ($img_arr as $item){
                $thumb_arr[] = get_thumb_images($data['site_id'], $item, FileDict::BIG);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图(中)
     */
    public function getImageThumbMidAttr($value, $data){
        $thumb_arr = [];
        if($data['hotel_images'] != ""){
            $thumb_arr = [];
            $img_arr = explode(",", $data['hotel_images']);
            foreach ($img_arr as $item){
                $thumb_arr[] = get_thumb_images($data['site_id'], $item, FileDict::MID);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图(小)
     */
    public function getImageThumbSmallAttr($value, $data){
        $thumb_arr = [];
        if($data['hotel_images'] != ""){
            $thumb_arr = [];
            $img_arr = explode(",", $data['hotel_images']);
            foreach ($img_arr as $item){
                $thumb_arr[] = get_thumb_images($data['site_id'], $item, FileDict::SMALL);
            }
        }
        return $thumb_arr;
    }


    /**
     * 获取封面缩略图
     */
    public function getCoverThumbAttr($value, $data){
        if($data['hotel_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'hotel_cover']);
        }
        return [];
    }

    /**
     * 获取封面缩略图(大)
     */
    public function getCoverThumbBigAttr($value, $data){
        if($data['hotel_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'hotel_cover'], FileDict::BIG);
        }
        return [];
    }

    /**
     * 获取封面缩略图(中)
     */
    public function getCoverThumbMidAttr($value, $data){
        if($data['hotel_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'hotel_cover'], FileDict::MID);
        }
        return [];
    }

    /**
     * 获取封面缩略图（小）
     */
    public function getCoverThumbSmallAttr($value, $data){
        if($data['hotel_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'hotel_cover'], FileDict::SMALL);
        }
        return [];
    }


    /**
     * 搜索器:酒店酒店名称
     * @param $value
     * @param $data
     */
    public function searchHotelNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('hotel_name', 'like', '%'.$value.'%');
        }
    }

    /**
     * 关键词搜索
     * @param $value
     * @param $data
     */
    public function searchSearchNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('hotel_name', 'like', '%'.$value.'%');
        }
    }

    /**
     * 搜索器:酒店状态
     * @param $value
     * @param $data
     */
    public function searchHotelStatusAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('hotel_status', '=', $value);
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
}
