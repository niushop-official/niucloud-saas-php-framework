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

namespace addon\tourism\app\model;

use app\dict\common\ChannelDict;
use app\dict\sys\FileDict;
use app\model\member\Member;
use app\model\pay\Pay;
use app\model\sys\SysUser;
use core\base\BaseModel;
use think\model\concern\SoftDelete;

/**
 * 旅游订单模型
 * Class Scenic
 * @package addon\tourism\app\model
 */
class TourismOrder extends BaseModel
{
    use SoftDelete;
    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'order_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'tourism_order';

    /**
     * 定义软删除标记字段
     * @var string
     */
    protected $deleteTime = 'delete_time';

    /**
     * 定义软删除字段的默认值
     * @var int
     */
    protected $defaultSoftDelete = 0;

    protected $type = [
        'pay_time' => 'timestamp',
        'verify_time' => 'timestamp',
        'close_time' => 'timestamp',
        'buyer_info' => 'json'
    ];

    /**
     * 登录渠道字段转化
     * @param $value
     * @return mixed
     */
    public function getOrderFromNameAttr($value, $data)
    {
        if(isset($data['order_from']))
        {
            return ChannelDict::getType()[$data['order_from']] ?? '';
        }
    }

    /**
     * 获取订单类型名称
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getOrderTypeNameAttr($value, $data) {
        $order_type = ucwords($data['order_type']);
        $class = "\\addon\\tourism\\app\\dict\\order\\{$order_type}OrderDict";
        return $class::getOrderType()['name'];
    }

    public function getVerifyerAttr($value, $data) {
        $nick_name = '';
        if (!empty($data['verifier_id'])) {
            if ($data['verifier_type'] == 'user') {
                $nick_name = (SysUser::find($data['verifier_id']))['username'] ?? '';
            } else {
                $nick_name = (Member::find($data['verifier_id']))['nickname'] ?? '';
            }
        }
        return $nick_name;
    }

    /**
     * 小图生成
     * @param $value
     * @param $data
     * @return mixed
     */
    public function getImageThumbSmallAttr($value, $data) {
        if(!empty($data['goods_image'])){
            return get_thumb_images($data['site_id'], $data['goods_image'], FileDict::SMALL);
        }
    }

    /**
     * 会员id搜索
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchMemberIdAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('member_id', '=', $value);
        }
    }

    /**
     * 订单来源
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderFromAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('order_from', '=', $value);
        }
    }

    /**
     * 订单类型
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderTypeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('order_type', '=', $value);
        }
    }

    /**
     * 按核销码查询
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchVerifyCodeAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("verify_code", "like", "%$value%");
        }
    }

    /**
     * 订单号
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("order_no", "like", "%$value%");
        }
    }

    /**
     * 查询手机号
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchMobileAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('mobile', 'like', '%'.$value.'%');
        }
    }

    /**
     * 订单金额
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchOrderMoneyAttr($query, $value, $data)
    {
        if (!empty($data['start_money']) && !empty($data['end_money'])) {
            $money = [ $data['start_money'], $data['end_money'] ];
            sort($money);
            $query->where('order_money', 'between', $money);
        } else if (!empty($data['start_money'])) {
            $query->where('order_money', '>=', $data['start_money']);
        } else if (!empty($data['end_money'])) {
            $query->where('order_money', '<=', $data['end_money']);
        }
    }

    /**
     * 支付流水号
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOutTradeNoAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('out_trade_no', 'like', '%'.$value.'%');
        }
    }

    /**
     * 订单状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderStatusAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('order_status', '=', $value);
        }
    }
    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['create_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['create_time', '<=', $end_time]]);
        }
    }

    /**
     * 支付时间筛选
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchPayTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('pay_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['pay_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['pay_time', '<=', $end_time]]);
        }
    }

    /**
     * 核销时间搜索器
     * @param $value
     */
    public function searchVerifyTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]) ;
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]) ;
        if($start_time > 0 && $end_time > 0){
            $query->whereBetweenTime('verify_time', $start_time, $end_time);
        }else if($start_time > 0 && $end_time == 0){
            $query->where([['verify_time', '>=', $start_time]]);
        }else if($start_time == 0 && $end_time > 0){
            $query->where([['verify_time', '<=', $end_time]]);
        }
    }

    /**
     * 订单项目
     * @return \think\model\relation\HasMany
     */
    public function item()
    {
        return $this->hasMany( TourismOrderItem::class,'order_id', 'order_id');
    }

    /**
     * 关联酒店
     */
    public function hotel()
    {
        return $this->hasOne( Hotel::class,'hotel_id', 'hotel_id');
    }

    /**
     * 关联酒店
     */
    public function way()
    {
        return $this->hasOne( Way::class,'way_id', 'way_id');
    }

    /**
     * 关联酒店
     */
    public function scenic()
    {
        return $this->hasOne( Scenic::class,'scenic_id', 'scenic_id');
    }

    /**
     * 订单会员
     * @return \think\model\relation\HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class,'member_id', 'member_id');
    }

    /**
     * 支付记录
     * @return \think\model\relation\HasOne
     */
    public function pay() {
        return $this->hasOne(Pay::class,'out_trade_no', 'out_trade_no');
    }

    /**
     * 订单日志
     * @return \think\model\relation\HasMany
     */
    public function orderlog() {
        return $this->hasMany( TourismOrderLog::class,'order_id', 'order_id');
    }

    public function refund() {
        return $this->hasOne(TourismOrderRefund::class,'refund_no', 'refund_no')->bind(['refund_id' => 'refund_id']);
    }
}
