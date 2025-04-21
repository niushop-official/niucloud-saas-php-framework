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

namespace addon\tk_vip\app\model\real;

use app\dict\common\CommonDict;
use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use app\model\member\Member;

/**
 * 实名认证模型
 * Class Real
 * @package addon\tk_vip\app\model\real
 */
class Real extends BaseModel
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
    protected $name = 'tkvip_real';



    // 设置json类型字段
    protected $json = [ 'field','card_img_back','card_img_front' ];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;
    public function getSexNameAttr($value, $data)
    {
        if (empty($data[ 'sex' ]))
            return '';
        return CommonDict::getSexType()[ $data[ 'sex' ] ] ?? '';
    }

    /**
     * 搜索器:实名认证会员ID
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
     * 搜索器:实名认证实名
     * @param $value
     * @param $data
     */
    public function searchRealNameAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("real_name", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:实名认证手机号
     * @param $value
     * @param $data
     */
    public function searchMobileAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("mobile", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:实名认证身份证
     * @param $value
     * @param $data
     */
    public function searchCardNumAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("card_num", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:实名认证认证状态
     * @param $value
     * @param $data
     */
    public function searchStatusAttr($query, $value, $data)
    {
       if ($value!='') {
            $query->where("status", $value);
        }
    }
    
    /**
     * 搜索器:实名认证创建时间
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

}
