<?php

namespace addon\ly_area\app\model;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;
use addon\ly_area\app\model\AreaLevel;

/**
 * 区域代理模型
 * Class Agent
 * @package app\model\area
 */
class AreaAgent extends BaseModel
{

    

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'agent_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_area_agent';

    
    /**
     * 软删除
     */
    use SoftDelete;
    protected $deleteTime = 'delete_time';
    

    /**
     * 搜索器:区域代理主键Id
     * @param $value
     * @param $data
     */
    public function searchAgentIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("agent_id", $value);
        }
    }


    public function searchLevelIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("level_id", $value);
        }
    }
    
    /**
     * 搜索器:区域代理用户id
     * @param $value
     * @param $data
     */
    public function searchMemberIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("member_id", $value);
        }
    }
    
    /**
     * 搜索器:区域代理省名称
     * @param $value
     * @param $data
     */
    public function searchProvinceNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("province_name", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:区域代理市名称
     * @param $value
     * @param $data
     */
    public function searchCityNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("city_name", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:区域代理区名称
     * @param $value
     * @param $data
     */
    public function searchDistrictNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("district_name", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:区域代理街道名称
     * @param $value
     * @param $data
     */
    public function searchStreetNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("street_name", "like", "%".$value."%");
        }
    }

    /**
     * 搜索器:区域代理区域
     * @param $value
     * @param $data
     */
    public function searchFullAreaAttr($query, $value, $data){
       if ($value) {
            $query->where("full_area", "like", "%".$value."%");
       }
    }
    
    /**
     * 搜索器:区域代理状态
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
     * 搜索器:区域代理代理级别
     * @param $value
     * @param $data
     */
    public function searchAgentLevelAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("agent_level", $value);
        }
    }
    
    /**
     * 搜索器:区域代理成为代理的时间
     * @param $value
     * @param $data
     */
    public function searchAgentAtAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
             $query->where([["agent_at", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["agent_at", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["agent_at", "<=", $end]]);
        }
    }
    
    

    public function member()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'member_id');
    }


    // public function agentLevel(){
    //     return $this->hasOne((new AreaLevel())::class, 'level_id', 'level_id');
    //     // return $this->hasOne((new AreaLevel())::class, 'level_area', 'agent_level');
    // }


    public function agentLevel()
    {
        return $this->hasOne(AreaLevel::class, 'level_area', 'agent_level');
    }

    public function hasLevel()
    {
        return $this->hasOne(AreaLevel::class, 'level_id', 'level_id');
    }


    //根据会员id获取代理信息
    public function getAgentByMemberId($member_id){
        return $this->where('member_id', $member_id)->findOrEmpty();
    }
    
}