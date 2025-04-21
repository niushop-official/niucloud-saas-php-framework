<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\model\member;

use app\dict\member\MemberSignDict;
use core\base\BaseModel;
use think\db\Query;
use think\model\relation\HasOne;

/**
 * 会员签到模型
 * Class MemberSign
 * @package app\model\member
 */
class MemberSign extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'sign_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'member_sign';

    // 设置json类型字段
    protected $json = ['day_award', 'continue_award'];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;

    /**
     * 会员模型关联
     * @return HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left');
    }

    /**
     * 是否签到名称
     * @param $value
     * @param $data
     * @return mixed|string
     */
    public function getIsSignNameAttr($value, $data)
    {
        if (empty($data['is_sign']))
            return '';
        return MemberSignDict::getStatus()[$data['is_sign']] ?? '';
    }

    /**
     * 创建时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('member_sign.create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['member_sign.create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['member_sign.create_time', '<=', $end_time]]);
        }
    }
}
