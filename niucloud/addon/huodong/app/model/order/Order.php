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

namespace addon\huodong\app\model\order;

use core\base\BaseModel;
use think\model\concern\SoftDelete;
use think\model\relation\HasMany;
use think\model\relation\HasOne;
use addon\huodong\app\model\act\Act;

use app\model\member\Member;
use app\model\pay\Pay;
/**
 * 报名记录模型
 * Class Order
 * @package addon\huodong\app\model\order
 */
class Order extends BaseModel
{

    

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'order_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'huodong_order';



    public function searchActIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("act_id", $value);
        }
    }
    public function searchPidAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("pid", $value);
        }
    }
    /**
     * 搜索器:报名记录
     * @param $value
     * @param $data
     */
    public function searchOrderIdAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_id", $value);
        }
    }
    
    /**
     * 搜索器:报名记录订单编号
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
     * 搜索器:报名记录订单来源
     * @param $value
     * @param $data
     */
    public function searchOrderFromAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_from", $value);
        }
    }
    
    /**
     * 搜索器:报名记录支付流水号
     * @param $value
     * @param $data
     */
    public function searchOutTradeNoAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("out_trade_no", $value);
        }
    }
    
    /**
     * 搜索器:报名记录订单状态
     * @param $value
     * @param $data
     */
    public function searchOrderStatusAttr($query, $value, $data)
    {
       if ($value!=='') {
            $query->where("order_status",$value);
        }
    }
    
    /**
     * 搜索器:报名记录退款状态
     * @param $value
     * @param $data
     */
    public function searchRefundStatusAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("refund_status", $value);
        }
    }
    public function searchFxuserIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("pid", $value);
        }
    }
    /**
     * 搜索器:报名记录会员id
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
     * 搜索器:报名记录订单金额
     * @param $value
     * @param $data
     */
    public function searchOrderMoneyAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("order_money", $value);
        }
    }
    
    /**
     * 搜索器:报名记录创建时间
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
       if ($value) {
            $query->where("create_time", $value);
        }
    }



    public function member(){
       return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('nickname,member_id,headimg')->bind(['member_id_name'=>'nickname','headimg'=>'headimg']);
    }



    /**
     * 支付记录
     * @return HasOne
     */
    public function pay()
    {
        return $this->hasOne(Pay::class, 'out_trade_no', 'out_trade_no')->bind([ 'pay_type_name' => 'type_name' ]);
    }


    public function act(){
        return $this->hasOne(Act::class, 'id', 'act_id')->joinType('left')->withField('name,id')->bind(['act_name'=>'name','act_startime'=>'startime','act_endtime'=>'endtime','act_address'=>'address']);
    }

}
