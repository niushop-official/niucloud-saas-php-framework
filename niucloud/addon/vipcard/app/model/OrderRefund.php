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

namespace addon\vipcard\app\model;

use addon\vipcard\app\dict\order\RefundDict;
use app\model\member\Member;
use core\base\BaseModel;

/**
 *  卡项订单维权表
 * Class VipcardGoodsCategory
 * @package app\model\vipcard_goods_category
 */
class OrderRefund extends BaseModel
{

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'refund_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'vipcard_order_refund';

    protected $type = [
        'create_time' => 'timestamp',
        'audit_time' => 'timestamp',
        'transfer_time' => 'timestamp'
    ];

    public function searchStatusAttr($query, $value, $data)
    {
        if (!empty($value)) {
            $query->where([ [ 'status', '=', $value ] ]);
        }
    }

    public function searchRefundNoAttr($query, $value, $data)
    {
        if (!empty($value)) {
            $query->where([ [ 'refund_no', 'like', "%$value%" ] ]);
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
     * 获取退款状态
     * @param $value
     * @param $data
     * @return array|mixed|string
     */
    public function getStatusNameAttr($value, $data) {
        return RefundDict::getRefundStatus($data['status'])['name'] ?? '';
    }

    /**
     * 关联订单表
     * @return void
     */
    public function mainOrder() {
        return $this->hasOne(Order::class, 'order_id', 'order_id');
    }

    /**
     * 关联会员
     * @return \think\model\relation\HasOne
     */
    public function member() {
        return $this->hasOne(Member::class, 'member_id', 'member_id');
    }

    /**
     * 关联退款日志表
     * @return void
     */
    public function refundLog() {
        return $this->hasMany(OrderRefundLog::class, 'refund_id', 'refund_id');
    }
}
