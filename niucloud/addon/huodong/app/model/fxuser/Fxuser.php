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

namespace addon\huodong\app\model\fxuser;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use app\model\member\Member;

/**
 * 推广员模型
 * Class Fxuser
 * @package addon\huodong\app\model\fxuser
 */
class Fxuser extends BaseModel
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
    protected $name = 'huodong_fxuser';

    

    

    /**
     * 搜索器:推广员ID
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
     * 搜索器:推广员用户信息
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
     * 搜索器:推广员身份类型 1企业 2用户
     * @param $value
     * @param $data
     */
    public function searchTypeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("type", $value);
        }
    }
    
    /**
     * 搜索器:推广员名称
     * @param $value
     * @param $data
     */
    public function searchNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("name", 'like','%'.$value.'%');
        }
    }
    
    /**
     * 搜索器:推广员联系电话
     * @param $value
     * @param $data
     */
    public function searchMobileAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("mobile", $value);
        }
    }
    
    /**
     * 搜索器:推广员状态1通过0待审核
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
     * 搜索器:推广员提交时间
     * @param $value
     * @param $data
     */
    public function searchAdddateAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
            $query->where([["adddate", "between time", [ date('Y-m-d H:i:s',$start), date('Y-m-d H:i:s',$end)]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["adddate", ">= time", date('Y-m-d H:i:s',$start)]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["adddate", "<= time", date('Y-m-d H:i:s',$end)]]);
        }
    }

    

    
    public function member(){
       return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,member_id')->bind(['member_id_name'=>'nickname']);
    }

}
