<?php

namespace addon\ly_lian\app\model;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;
use addon\ly_lian\app\model\Level;

/**
 * 链动2+1会员模型
 * Class LianMember
 * @package addon\ly_lian\app\model\member
 */
class LianMember extends BaseModel
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
    protected $name = 'ly_lian_member';

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
     * 搜索器:链动2+1会员会员id
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
     * 搜索器:链动2+1会员等级ID
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
     * 搜索器:链动2+1会员状态：0正常，1冻结
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
     * 搜索器:链动2+1会员解冻任务状态：0未解冻，1已解冻
     * @param $value
     * @param $data
     */
    public function searchThawStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("thaw_status", $value);
        }
    }
    
    /**
     * 搜索器:链动2+1会员升级为老板时间
     * @param $value
     * @param $data
     */
    public function searchUpTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : $value[0];
        $end = empty($value[1]) ? 0 : $value[1];
        if ($start > 0 && $end > 0) {
             $query->where([["up_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["up_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["up_time", "<=", $end]]);
        }
    }
    
    /**
     * 搜索器:链动2+1会员创建时间,成为代理时间
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


    public function getUpTimeAttr($value, $data){
        if($data['up_time']){
            return date('Y-m-d H:i:s', $data['up_time']);
        }else{
            return '';
        }
    }


    public function lianMember()
    {
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'member_id');
    }


    public function parentMember(){
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'pid');
    }

    public function lianParentMember(){
        return $this->hasOne(\app\model\member\Member::class, 'member_id', 'lian_pid');
    }


    public function lianLevel(){
        return $this->hasOne(Level::class, 'level_id', 'level_id');
    }




    
}