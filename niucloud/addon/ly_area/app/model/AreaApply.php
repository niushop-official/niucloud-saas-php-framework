<?php

namespace addon\ly_area\app\model;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 区域代理申请记录模型
 * Class Apply
 * @package addon\ly_area\app\model
 */
class AreaApply extends BaseModel
{
    use SoftDelete;
    

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'apply_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_area_apply';

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
     * 搜索器:区域代理申请记录用户id
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
     * 搜索器:区域代理申请记录代理id
     * @param $value
     * @param $data
     */
    public function searchAgentIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("agent_id", $value);
        }
    }

    /**
     * 搜索器:区域代理申请记录代理等级
     * @param $value
     * @param $data
     * */
    public function searchLevelIdAttr($query, $value, $data){
        if ($value) {
            $query->where("level_id", $value);
        }
    }
    
    /**
     * 搜索器:区域代理申请记录代理区域：0无，1省，2市，3区，4街道
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
     * 搜索器:区域代理申请记录代理区域
     * @param $value
     * @param $data
     */
    public function searchApplyAreaAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("apply_area", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:区域代理申请记录状态（0待审核, 1通过,2拒绝）
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
     * 搜索器:区域代理申请记录创建时间
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
    
    

    public function levelArea()
    {
        return $this->hasOne(\addon\ly_area\app\model\AreaLevel::class, 'level_area', 'level_area');
    }

    public function level()
    {
        return $this->hasOne(\addon\ly_area\app\model\AreaLevel::class, 'level_id', 'level_id');
    }

    public function agent()
    {
        return $this->hasOne(\addon\ly_area\app\model\AreaAgent::class, 'agent_id', 'agent_id');
    }

    public function member()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'member_id');
    }



    
}