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

use app\dict\sys\FileDict;
use core\base\BaseModel;


/**
 *  商品分类模型
 * Class O2oGoodsCategory
 * @package app\model\o2o_goods_category
 */
class GoodsCategory extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'category_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'o2o_goods_category';

    /**
     * 获取小图
     * @param $value
     * @param $data
     * @return mixed|string
     * @throws \Exception
     */
    public function getImageThumbSmallAttr($value, $data){
        if($data['image'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'image'], FileDict::SMALL);
        }
        return '';
    }

    /**
     * 获取小图
     * @param $value
     * @param $data
     * @return mixed|string
     * @throws \Exception
     */
    public function getImageThumbMidAttr($value, $data){
        if($data['image'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'image'], FileDict::MID);
        }
        return '';
    }

    /**
     * 获取小图
     * @param $value
     * @param $data
     * @return mixed|string
     * @throws \Exception
     */
    public function getImageThumbBigAttr($value, $data){
        if($data['image'] != ''){
            return get_thumb_images($data['site_id'], $data[ 'image'], FileDict::BIG);
        }
        return '';
    }

    /**
     * 搜索器: 商品分类分类名称
     * @param $value
     * @param $data
     */
    public function searchCategoryNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("category_name", $value);
        }
    }
    
    /**
     * 搜索器: 商品分类分类上级
     * @param $value
     * @param $data
     */
    public function searchPidAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("pid", $value);
        }
    }
    
    /**
     * 搜索器: 商品分类层级
     * @param $value
     * @param $data
     */
    public function searchLevelAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("level", $value);
        }
    }
    
    /**
     * 搜索器: 商品分类排序
     * @param $value
     * @param $data
     */
    public function searchSortAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("sort", $value);
        }
    }

    
    /**
     * 搜索器: 商品分类添加时间
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
     * 搜索器: 商品分类更新时间
     * @param $value
     * @param $data
     */
    public function searchUpdateTimeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("update_time", $value);
        }
    }

}
