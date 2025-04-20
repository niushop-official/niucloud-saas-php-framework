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

namespace addon\transfer\app\model\log;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use app\model\member\Member;


/**
 * 资产转赠记录模型
 * Class Log
 * @package addon\transfer\app\model\log
 */
class Log extends BaseModel
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
    protected $name = 'transfer_log';

    

    

    /**
     * 搜索器:资产转赠记录资产类型
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
     * 搜索器:资产转赠记录编号
     * @param $value
     * @param $data
     */
    public function searchOrderNoAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_no", $value);
        }
    }
    
    /**
     * 搜索器:资产转赠记录转移用户
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
     * 搜索器:资产转赠记录受赠用户
     * @param $value
     * @param $data
     */
    public function searchToMemberIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("to_member_id", $value);
        }
    }
    
    /**
     * 搜索器:资产转赠记录备注说明
     * @param $value
     * @param $data
     */
    public function searchMenoAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("meno", $value);
        }
    }
    
    /**
     * 搜索器:资产转赠记录创建时间
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


    public function member(){
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,member_id')->bind(['member_id_name'=>'nickname']);
    }
    

    
    public function tomember(){
       return $this->hasOne(Member::class, 'member_id', 'to_member_id')->joinType('left')->withField('nickname,member_id')->bind(['to_member_id_name'=>'nickname']);
    }


}
