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

use addon\tourism\app\dict\scenic\ScenicTagDict;
use app\dict\sys\FileDict;
use core\base\BaseModel;
use think\db\Query;
use think\model\concern\SoftDelete;

/**
 * 景点模型
 * Class Scenic
 * @package addon\tourism\app\model
 */
class Scenic extends BaseModel
{

//    use SoftDelete;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'scenic_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'tourism_scenic';

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
        if(isset($data['scenic_status']))
        {
            return ScenicTagDict::getStatus()[$data['scenic_status']]['name'] ?? '';
        }

    }

    /**
     * 获取图片缩略图
     */
    public function getImageThumbAttr($value, $data){
        $thumb_arr = [];
        if($data['scenic_images'] != ""){
            $thumb_arr = [];
            $img_arr = explode(",", $data['scenic_images']);
            foreach ($img_arr as $item){
                $thumb_arr[] = get_thumb_images($data['site_id'], $item);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图（大）
     */
    public function getImageThumbBigAttr($value, $data){
        $thumb_arr = [];
        if($data['scenic_images'] != ""){
            $thumb_arr = [];
            $img_arr = explode(",", $data['scenic_images']);
            foreach ($img_arr as $item){
                $thumb_arr[] = get_thumb_images($data['site_id'], $item, FileDict::BIG);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图
     */
    public function getImageThumbMidAttr($value, $data){
        $thumb_arr = [];
        if($data['scenic_images'] != ""){
            $thumb_arr = [];
            $img_arr = explode(",", $data['scenic_images']);
            foreach ($img_arr as $item){
                $thumb_arr[] = get_thumb_images($data['site_id'], $item, FileDict::MID );
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图
     */
    public function getImageThumbSmallAttr($value, $data){
        $thumb_arr = [];
        if($data['scenic_images'] != ""){
            $thumb_arr = [];
            $img_arr = explode(",", $data['scenic_images']);
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
        if($data['scenic_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'scenic_cover']);
        }
        return [];
    }

    /**
     * 获取封面缩略图（大）
     */
    public function getCoverThumbBigAttr($value, $data){
        if($data['scenic_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'scenic_cover'], FileDict::BIG);
        }
        return [];
    }

    /**
     * 获取封面缩略图（中）
     */
    public function getCoverThumbMidAttr($value, $data){
        if($data['scenic_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'scenic_cover'], FileDict::MID);
        }
        return [];
    }

    /**
     * 获取封面缩略图（小）
     */
    public function getCoverThumbSmallAttr($value, $data){
        if($data['scenic_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'scenic_cover'], FileDict::SMALL);
        }
        return [];
    }

    /**
     * 关联门票
     */
    public function goods()
    {
        return $this->hasOne( Goods::class,'scenic_id', 'scenic_id')->joinType('inner');
    }

    /**
     * 景点名称搜索
     */
    public function searchScenicNameAttr($query, $value, $data){
        if ($value) {
            $query->where('scenic_name', 'like', '%'.$value.'%');
        }
    }

    /**
     * 关键词搜索
     */
    public function searchSearchNameAttr($query, $value, $data){
        if ($value) {
            $query->where('scenic_name', 'like', '%'.$value.'%');
        }
    }


    /**
     * 景点级别搜索
     */
    public function searchScenicLevelAttr($query, $value, $data){
        if ($value) {
            $query->where('scenic_level', '=', $value);
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
