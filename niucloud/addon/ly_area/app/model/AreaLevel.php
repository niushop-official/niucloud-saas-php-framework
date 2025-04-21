<?php

namespace addon\ly_area\app\model;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 区域代理等级模型
 * Class Level
 * @package app\model\area
 */
class AreaLevel extends BaseModel
{

    

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'level_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_area_level';

    

    

    /**
     * 搜索器:区域代理等级主键Id
     * @param $value
     * @param $data
     */
    public function searchLevelIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("level_id", $value);
        }
    }
    
    /**
     * 搜索器:区域代理等级等级名称
     * @param $value
     * @param $data
     */
    public function searchLevelNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("level_name", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:区域代理等级代理区域：0无，1省，2市，3区，4街道
     * @param $value
     * @param $data
     */
    public function searchLevelAreaAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("level_area", $value);
        }
    }
    
    /**
     * 搜索器:区域代理等级状态（0关闭 1启用）
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
     * 搜索器:区域代理等级创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : $value[0];
        $end = empty($value[1]) ? 0 : $value[1];
        if ($start > 0 && $end > 0) {
             $query->where([["create_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["create_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["create_time", "<=", $end]]);
        }
    }
    
    
    public function getLevelTextAttr($value, $data)
    {
        $condition = [];
        if($data['up_type'] == 0){
            $condition['text'] = '或';
        }else{
            $condition['text'] = '且';
        }

        $list = [];
        if($data['order_money'] > 0){
            $list[] = '订单金额满'.$data['order_money'].'元';
        }

        if(!empty($data['order_goods_id'])){
            // $list[] = '购买商品：'.implode(',', $data['order_goods_id']);
            $list[] = '购买指定商品';
        }

        $condition['list'] = $list;
        return $condition;

    }
    

    
}