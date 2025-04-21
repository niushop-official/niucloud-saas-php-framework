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

namespace addon\huodong\app\model\user;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use app\model\member\Member;

/**
 * 报名者信息模型
 * Class User
 * @package addon\huodong\app\model\user
 */
class User extends BaseModel
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
    protected $name = 'huodong_user';

    

    

    /**
     * 搜索器:报名者信息用户信息
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
     * 搜索器:报名者信息姓名
     * @param $value
     * @param $data
     */
    public function searchRealnameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("realname", 'like','%'.$value.'%');
        }
    }
    
    /**
     * 搜索器:报名者信息联系电话
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
     * 搜索器:报名者信息身份证号码
     * @param $value
     * @param $data
     */
    public function searchIdcardAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("idcard", $value);
        }
    }
    
    /**
     * 搜索器:报名者信息添加时间
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
