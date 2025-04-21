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

use addon\tourism\app\dict\goods\GoodsTagDict;
use addon\vipcard\app\dict\GoodsDict;
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
    protected $name = 'vipcard_goods';

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
     * 关联
     * @return mixed
     */
    public function item()
    {
        return $this->hasMany( GoodsCardItem::class,'main_goods_id', 'goods_id');
    }

    /**
     * @return HasOne
     */
    public function category()
    {
        return $this->hasOne( GoodsCategory::class, 'category_id', 'category_id')->joinType('left')->withField('category_id, category_name')->bind(['category_name' => 'category_name']);
    }


    /**
     * 状态字段转化
     * @param $value
     * @return mixed
     */
    public function getStatusNameAttr($value, $data)
    {
        if(isset($data['status']))
        {
            return GoodsTagDict::getStatus()[$data['status']]['name'] ?? '';
        }
    }

    /**
     * 卡项类型转化
     * @param $value
     * @param $data
     * @return array|array[]
     */
    public function getCardTypeNameAttr($value, $data)
    {
        if(isset($data['card_type']))
        {
            return GoodsDict::getCardType($data['card_type']);
        }
    }

    /**
     * 商品类型转化
     * @param $value
     * @param $data
     * @return array|array[]
     */
    public function getGoodsTypeNameAttr($value, $data)
    {
        if(isset($data['goods_type']))
        {
            return GoodsDict::getGoodsType($data['goods_type'])['name'];
        }
    }

    /**
     * 获取图片缩略图
     */
    public function getImageThumbAttr($value, $data){
        $thumb_arr = [];
        if($data['goods_image'] != ''){
            $img_arr = explode(",", $data['goods_image']);
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
        if($data['goods_image'] != ''){
            $img_arr = explode(",", $data['goods_image']);
            foreach ($img_arr as $item){
                $thumb_arr[] = get_thumb_images($data['site_id'], $item, FileDict::BIG);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图（中）
     */
    public function getImageThumbMidAttr($value, $data){
        $thumb_arr = [];
        if($data['goods_image'] != ''){
            $img_arr = explode(",", $data['goods_image']);
            foreach ($img_arr as $item){
                $thumb_arr[] = get_thumb_images($data['site_id'], $item, FileDict::MID);
            }
        }
        return $thumb_arr;
    }

    /**
     * 获取图片缩略图（小）
     */
    public function getImageThumbSmallAttr($value, $data){
        $thumb_arr = [];
        if($data['goods_image'] != ''){
            $img_arr = explode(",", $data['goods_image']);
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
        if($data['goods_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'goods_cover']);
        }
        return '';
    }

    /**
     * 获取封面缩略图（大）
     */
    public function getCoverThumbBigAttr($value, $data){
        if($data['goods_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'goods_cover'], FileDict::BIG);
        }
        return '';
    }

    /**
     * 获取封面缩略图（中）
     */
    public function getCoverThumbMidAttr($value, $data){
        if($data['goods_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'goods_cover'], FileDict::MID);
        }
        return '';
    }

    /**
     * 获取封面缩略图（小）
     */
    public function getCoverThumbSmallAttr($value, $data){
        if($data['goods_cover'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'goods_cover'], FileDict::SMALL);
        }
        return '';
    }

    /**
     * 计算销量
     */
    public function getSaleNumAttr($value, $data){
        if(isset($data['virtually_sale']) && $data['virtually_sale'] > 0){
            return $data['virtually_sale'] + $data['sale_num'];
        }else{
            return $data['sale_num'];
        }
    }


    /**
     * 搜索器:商品表商品名称
     * @param $value
     * @param $data
     */
    public function searchGoodsNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("goods_name", "like", "%$value%");
        }
    }

    /**
     * 搜索器:商品表商品种类1.项目 2.次卡
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
     * 搜索器:商品表商品分类
     * @param $value
     * @param $data
     */
    public function searchCategoryIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("category_id", $value);
        }
    }

    /**
     * 搜索器:商品表商品状态（1.正常0下架）
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
     * 搜索器:商品表卡项类型1计次卡2计时卡3通卡
     * @param $value
     * @param $data
     */
    public function searchCardTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("card_type", $value);
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
    public function goodsItem() {
        return $this->hasMany(GoodsCardItem::class, 'main_goods_id');
    }
}
