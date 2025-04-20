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

namespace addon\huodong\app\model\act;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use addon\huodong\app\model\cate\Cate;

/**
 * 活动列模型
 * Class Act
 * @package addon\huodong\app\model\act
 */
class Act extends BaseModel
{

    

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'huodong_act';

    

    

    /**
     * 搜索器:活动列id
     * @param $value
     * @param $data
     */
    public function searchIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("id", $value);
        }
    }
    
    /**
     * 搜索器:活动列活动标题
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("name", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:活动列活动分类
     * @param $value
     * @param $data
     */
    public function searchCateIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("cate_id", $value);
        }
    }
    
    /**
     * 搜索器:活动列开始时间
     * @param $value
     * @param $data
     */
    public function searchStartimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
            $query->where([["adddate", "between time", [ date('Y-m-d H:i:s',$start), date('Y-m-d H:i:s',$end)]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["adddate", ">= time", date('Y-m-d H:i:s',$start)]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["adddate", "<= time", date('Y-m-d H:i:s',$end)]]);
        }
    }
    
    /**
     * 搜索器:活动列结束时间
     * @param $value
     * @param $data
     */
    public function searchEndtimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
            $query->where([["adddate", "between time", [ date('Y-m-d H:i:s',$start), date('Y-m-d H:i:s',$end)]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["adddate", ">= time", date('Y-m-d H:i:s',$start)]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["adddate", "<= time", date('Y-m-d H:i:s',$end)]]);
        }
    }
    
    /**
     * 搜索器:活动列状态
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
        if ($value!=='') {
            $query->where("status", $value);
        }
    }
    
    /**
     * 搜索器:活动列添加时间
     * @param $value
     * @param $data
     */
    public function searchAdddateAttr($query, $value, $data)
    {

        if(!empty($value)){
            $start = empty($value[0]) ? 0 : strtotime($value[0]);

            $end = empty($value[1]) ? 0 : strtotime($value[1]);
            if ($start > 0 && $end > 0) {
                $query->where([["adddate", "between time", [ date('Y-m-d H:i:s',$start), date('Y-m-d H:i:s',$end)]]]);
            } else if ($start > 0 && $end == 0) {
                $query->where([["adddate", ">= time", date('Y-m-d H:i:s',$start)]]);
            } else if ($start == 0 && $end > 0) {
                $query->where([["adddate", "<= time", date('Y-m-d H:i:s',$end)]]);
            }
        }


    }
    
    

    

    
    public function cate(){
       return $this->hasOne(Cate::class, 'id', 'cate_id')->joinType('left')->withField('name,id')->bind(['cate_id_name'=>'name']);
    }

}
