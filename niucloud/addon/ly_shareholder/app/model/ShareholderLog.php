<?php

namespace addon\ly_shareholder\app\model;

use app\model\member\Member;
use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;
use think\db\Query;

use addon\ly_shareholder\app\model\ShareholderLevel;

/**
 * 股东分红记录模型
 * Class ShareholderLog
 * @package addon\ly_shareholder\app\model\fenhong
 */
class ShareholderLog extends BaseModel
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
    protected $name = 'ly_shareholder_log';


    /**
     * 搜索器:股东分红记录主键id
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
     * 搜索器:股东分红记录会员ID
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
     * 查询股东等级
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
     * 搜索器:股东分红记录创建时间
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
     * 创建时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchJoinCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('shareholder_log.create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['shareholder_log.create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['shareholder_log.create_time', '<=', $end_time]]);
        }
    }
    
    public function shareholderLevel(){
        return $this->hasOne(ShareholderLevel::class, 'level_id', 'level_id');
    }

    public function member()
    {
        // return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,username,headimg,mobile')->bind(['member_name'=>'nickname']);
        return $this->hasOne(Member::class, 'member_id', 'member_id');
    }



    public function getTakeTypeAttr($value){
        //0余额，1佣金，2积分
        $type = [
            '0' => 'balance',
            '1' => 'commission',
            '2' => 'score',
        ];
        return $type[$value];
    }


   

}