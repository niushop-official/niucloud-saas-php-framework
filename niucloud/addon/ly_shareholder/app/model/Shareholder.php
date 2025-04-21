<?php

namespace addon\ly_shareholder\app\model;

use addon\ly_shareholder\app\dict\shareholder\ShareholderDict;
use app\model\member\Member;
use core\base\BaseModel;
use think\db\Query;

/**
 * 股东
 */
class Shareholder extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'shareholder_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'ly_shareholder';

    protected $type = [
        'audit_time' => 'timestamp',
        'lock_time' => 'timestamp',
        
    ];

    /**
     * 关联会员
     * @return \think\model\relation\hasOne
     */
    public function member()
    {
        // return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('member_id, username, nickname, headimg, mobile');
        return $this->hasOne(Member::class, 'member_id', 'member_id');
    }

    /**
     * 关联上级会员
     * @return \think\model\relation\hasOne
     */
    public function parentShareholder()
    {
        return $this->hasOne(Member::class, 'member_id', 'parent');
    }

    /**
     * 股东等级
     * @return \think\model\relation\HasOne
     */
    public function shareholderLevel(){
        return $this->hasOne(ShareholderLevel::class, 'level_id', 'level_id');
    }

    /**
     *  股东状态
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status']))
            return '';
        return ShareholderDict::getStatus()[$data['status']] ?? '';
    }
 


    /**
     * 股东
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchStatusAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('status', $value);
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
     * 状态
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchJoinStatusAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('shareholder.status', $value);
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
            $query->whereBetweenTime('shareholder.create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['shareholder.create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['shareholder.create_time', '<=', $end_time]]);
        }
    }
}
