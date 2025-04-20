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

use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoApplyDict;
use app\model\member\Member;
use core\base\BaseModel;
use think\db\Query;

/**
 * 分销商
 */
class FenxiaoApply extends BaseModel
{


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'apply_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'shop_fenxiao_apply';

    protected $type = [
        'audit_time' => 'timestamp'
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
     * 分销会员
     * @return \think\model\relation\HasOne
     */
    public function fenxiaoMember()
    {
        return $this->hasOne(FenxiaoMember::class, 'member_id', 'member_id');
    }

    /**
     * 状态
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getStatusNameAttr($value, $data)
    {
        if (empty($data['status']))
            return '';
        return FenxiaoApplyDict::getStatus()[$data['status']] ?? '';
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
            $query->where('fenxiao_apply.status', $value);
        }
    }
    /**
     * 审核时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchAuditTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('audit_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['audit_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['audit_time', '<=', $end_time]]);
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
            $query->whereBetweenTime('fenxiao_apply.create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['fenxiao_apply.create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['fenxiao_apply.create_time', '<=', $end_time]]);
        }
    }
}
