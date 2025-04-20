<?php

namespace addon\ly_lian\app\model;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

/**
 * 链动2+1关系变动模型
 * Class LianChange
 * @package addon\ly_lian\app\model
 */
class LianChange extends BaseModel
{

     use SoftDelete;

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_lian_change';

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
     * 搜索器:链动2+1关系变动会员id
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
     * 搜索器:链动2+1关系变动直推上级会员ID
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
     * 搜索器:链动2+1关系变动有链动身份的上级会员ID
     * @param $value
     * @param $data
     */
    public function searchLianPidAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("lian_pid", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1关系变动新链动上级会员ID
     * @param $value
     * @param $data
     */
    public function searchNewLianPidAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("new_lian_pid", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1关系变动等级ID
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
     * 搜索器:链动2+1关系变动下级会员ID
     * @param $value
     * @param $data
     */
    public function searchChildMidAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("child_mid", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1关系变动下级类型：0直推、1继承、2离队、3老板
     * @param $value
     * @param $data
     */
    public function searchChildTypeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("child_type", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1关系变动创建时间
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
    
    

    public function lianLevel()
    {
        return $this->hasOne(\addon\ly_lian\app\model\Level::class, 'level_id', 'level_id');
    }

    //新链动上级
    public function newLianParent()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'new_lian_pid');
    }

    //链动上级
    public function lianParent()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'lian_pid');
    }

    //直推上级
    public function parentMember()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'pid');
    }

    //链动会员
    public function lianMember()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'member_id');
    }



    
}