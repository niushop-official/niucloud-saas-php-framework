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

namespace addon\shop_fenxiao\app\model\fenxiao;

use addon\shop_fenxiao\app\dict\agent\AgentDict;
use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoDict;
use addon\shop_fenxiao\app\model\agent\AgentLevel;
use app\model\member\Member;
use core\base\BaseModel;
use think\db\Query;

/**
 * 分销商
 */
class Fenxiao extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'fenxiao_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao';

    protected $type = [
        'audit_time' => 'timestamp',
        'lock_time' => 'timestamp',
        'agent_time' => 'timestamp',
    ];

    /**
     * 关联会员
     * @return \think\model\relation\hasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('member_id, username');
    }

    /**
     * 关联上级会员
     * @return \think\model\relation\hasOne
     */
    public function parentFenxiao()
    {
        return $this->hasOne(Member::class, 'member_id', 'parent');
    }

    /**
     * 分销商等级
     * @return \think\model\relation\HasOne
     */
    public function fenxiaoLevel(){
        return $this->hasOne(FenxiaoLevel::class, 'level_id', 'level_id');
    }

    /**
     * 代理商等级
     * @return \think\model\relation\HasOne
     */
    public function agentLevel(){
        return $this->hasOne(AgentLevel::class, 'level_id', 'agent_level');
    }
    /**
     *  代理商状态
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status']))
            return '';
        return FenxiaoDict::getStatus()[$data['status']] ?? '';
    }
    /**
     *  代理商状态
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getAgentStatusNameAttr($value, $data)
    {
        if (empty($data['agent_status']))
            return '';
        return AgentDict::getStatus()[$data['agent_status']] ?? '';
    }

    /**
     * 分销商
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchIsAgentAttr(Query $query, $value, $data)
    {
        if ($value != 'all') {
            $query->where('is_agent', $value);
        }
    }

    /**
     * 分销商
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
     * 查询分销商等级
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
     * 查询分销商等级
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
            $query->where('fenxiao.status', $value);
        }
    }

    /**
     * 代理商状态搜索
     * @param Query $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchAgentStatusAttr(Query $query, $value, $data)
    {
        if ($value) {
            $query->where('fenxiao.status', $value);
        }
    }
    /**
     * 成为代理商时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchAgentTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('agent_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['agent_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['agent_time', '<=', $end_time]]);
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
            $query->whereBetweenTime('fenxiao.create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['fenxiao.create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['fenxiao.create_time', '<=', $end_time]]);
        }
    }
}
