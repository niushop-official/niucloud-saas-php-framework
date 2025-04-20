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

namespace addon\tk_vip\app\model\order;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;

use app\model\member\Member;

use app\model\member\MemberLevel;

/**
 * VIP订单模型
 * Class Order
 * @package addon\tk_vip\app\model\order
 */
class Order extends BaseModel
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
    protected $name = 'tkvip_order';


    protected $type = [
        'pay_time' => 'timestamp',
        'close_time' => 'timestamp',
    ];
    

    /**
     * 搜索器:VIP订单用户id
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
     * 搜索器:VIP订单订单来源
     * @param $value
     * @param $data
     */
    public function searchOrderFromAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_from", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:VIP订单订单id
     * @param $value
     * @param $data
     */
    public function searchOrderIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_id", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:VIP订单内容
     * @param $value
     * @param $data
     */
    public function searchBodyAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("body", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:VIP订单会员等级
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
     * 搜索器:VIP订单状态
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
     * 搜索器:VIP订单支付单号
     * @param $value
     * @param $data
     */
    public function searchOutTradeNoAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("out_trade_no", "like", "%".$value."%");
        }
    }
    
    /**
     * 搜索器:VIP订单更新时间
     * @param $value
     * @param $data
     */
    public function searchUpdateTimeAttr($query, $value, $data)
    {
        $start = empty($value[0]) ? 0 : strtotime($value[0]);
        $end = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start > 0 && $end > 0) {
             $query->where([["update_time", "between", [$start, $end]]]);
        } else if ($start > 0 && $end == 0) {
            $query->where([["update_time", ">=", $start]]);
        } else if ($start == 0 && $end > 0) {
            $query->where([["update_time", "<=", $end]]);
        }
    }
    
    

    

    
    public function member(){
       return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,member_id')->bind(['member_id_name'=>'nickname']);
    }

    public function memberLevel(){
       return $this->hasOne(MemberLevel::class, 'level_id', 'level_id')->joinType('left')->withField('level_name,level_id')->bind(['level_id_name'=>'level_name']);
    }

}
