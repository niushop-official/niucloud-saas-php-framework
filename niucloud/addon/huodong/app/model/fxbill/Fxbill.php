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

namespace addon\huodong\app\model\fxbill;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use app\model\member\Member;

/**
 * 活动佣金明细模型
 * Class Fxbill
 * @package addon\huodong\app\model\fxbill
 */
class Fxbill extends BaseModel
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
    protected $name = 'huodong_fxbill';

    

    

    /**
     * 搜索器:活动佣金明细用户id
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
     * 搜索器:活动佣金明细账户类型
     * @param $value
     * @param $data
     */
    public function searchAccountTypeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("account_type", $value);
        }
    }
    
    /**
     * 搜索器:活动佣金明细账户数据
     * @param $value
     * @param $data
     */
    public function searchAccountDataAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("account_data", $value);
        }
    }
    
    /**
     * 搜索器:活动佣金明细变动后的账户余额
     * @param $value
     * @param $data
     */
    public function searchAccountSumAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("account_sum", $value);
        }
    }
    
    /**
     * 搜索器:活动佣金明细来源类型
     * @param $value
     * @param $data
     */
    public function searchFromTypeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("from_type", $value);
        }
    }
    
    /**
     * 搜索器:活动佣金明细关联Id
     * @param $value
     * @param $data
     */
    public function searchRelatedIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("related_id", $value);
        }
    }
    
    /**
     * 搜索器:活动佣金明细创建时间
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
     * 搜索器:活动佣金明细备注信息
     * @param $value
     * @param $data
     */
    public function searchMemoAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("memo", $value);
        }
    }
    
    /**
     * 搜索器:活动佣金明细来源用户
     * @param $value
     * @param $data
     */
    public function searchFromMemberIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("from_member_id", $value);
        }
    }
    
    /**
     * 搜索器:活动佣金明细分销层级
     * @param $value
     * @param $data
     */
    public function searchFxlevelAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("fxlevel", $value);
        }
    }
    
    /**
     * 搜索器:活动佣金明细佣金状态
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("status", $value);
        }
    }
    
    

    

    
    public function member(){
       return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,member_id')->bind(['member_id_name'=>'nickname']);
    }

}
