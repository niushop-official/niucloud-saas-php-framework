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

namespace addon\tk_vip\app\model\vip;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use app\model\member\Member;

use app\model\member\MemberLevel;

/**
 * 会员VIP管理模型
 * Class Vip
 * @package addon\tk_vip\app\model\vip
 */
class Vip extends BaseModel
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
    protected $name = 'tkvip_vip';

    protected $type = [
        'over_time' => 'timestamp',
    ];

    /**
     * 搜索器:会员VIP管理会员
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
     * 搜索器:会员VIP管理等级
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
     * 搜索器:会员VIP管理到期时间
     * @param $value
     * @param $data
     */
    public function searchOverTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
             $query->where([["over_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["over_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["over_time", "<=", $end]]);
        }
    }

    public function member(){
       return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,member_id')->bind(['member_id_name'=>'nickname']);
    }

    public function memberLevel(){
       return $this->hasOne(MemberLevel::class, 'level_id', 'level_id')->joinType('left')->withField('level_name,level_id')->bind(['level_id_name'=>'level_name']);
    }
    public function memberInfo()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id');
    }
}
