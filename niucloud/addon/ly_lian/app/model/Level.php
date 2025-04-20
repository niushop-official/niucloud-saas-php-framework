<?php

namespace addon\ly_lian\app\model;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 链动2+1等级模型
 * Class Level
 * @package addon\ly_lian\app\model\level
 */
class Level extends BaseModel
{

     use SoftDelete;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'level_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_lian_level';

    /**
    * 定义软删除标记字段.
    * @var string
    */
    protected $deleteTime = 'delete_time';

    /**
    * 定义软删除字段的默认值.
    * @var int
    */
    protected $defaultSoftDelete = 0;

    /**
     * 搜索器:链动2+1等级等级名称
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
     * 搜索器:链动2+1等级等级权重
     * @param $value
     * @param $data
     */
    public function searchLevelNumAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("level_num", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1等级创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
             $query->where([["create_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["create_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["create_time", "<=", $end]]);
        }
    }
    
    
    /**
     * 等级升级说明
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getLevelTextAttr($value, $data)
    {
        $condition = [];
        if($data['upgrade_type'] == 0) {
            $condition['text'] = '或';
        }else{
            $condition['text'] = '且';
        }
        $list = [];

        // if($data['fenxiao_order_num'] > 0) {
        //     $list[] = '一级分销订单总数大于等于'.$data['fenxiao_order_num'];
        // }
        // if($data['fenxiao_commission'] > 0) {
        //     $list[] = '一级分销订单佣金总额大于等于'.$data['fenxiao_commission'];
        // }
        // if($data['fenxiao_order_money'] > 0) {
        //     $list[] = '一级分销订单总额大于等于'.$data['fenxiao_order_money'];
        // }
        if($data['recommend_num'] > 0) {
            $list[] = '直推人数大于等于'.$data['recommend_num'] . '人';
        }
        if($data['order_money'] > 0) {
            $list[] = '自购订单总额大于等于'.$data['order_money'];
        }
        if($data['recharge_money'] > 0) {
            $list[] = '充值金额大于等于'.$data['recharge_money'];
        }
        if($data['up_goods_num'] != 0) {
            $list[] = '购买商品数量'.$data['up_goods_num'] . '件';
        }
        // if($data['child_fenxiao_num'] > 0) {
        //     $list[] = '下线分销商人数大于等于'.$data['child_fenxiao_num'];
        // }
        $condition['list'] = $list;
        return $condition;

    }

    
    public function getLevelList($condition = [], $field = '*', $order = 'level_num asc', $limit = null){
        return $this->field($field)->where($condition)->order($order)->limit($limit)->select()->toArray();
    }
    
}