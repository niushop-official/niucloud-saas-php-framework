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

use addon\tourism\app\dict\order\RefundDict;
use app\model\member\Member;
use core\base\BaseModel;
use think\db\Query;

/**
 * 旅游订单模型
 * Class Scenic
 * @package addon\tourism\app\model
 */
class TourismOrderRefund extends BaseModel
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
    protected $name = 'tourism_order_refund';

    protected $type = [
        'create_time' => 'timestamp',
        'audit_time' => 'timestamp',
        'transfer_time' => 'timestamp'
    ];

    /**
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'create_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'create_time', '<=', $end_time ] ]);
        }
    }

    public function searchRefundNoAttr(Query $query, $value, $data)
    {
        if (!empty($value)) {
            $query->where([ [ 'refund_no', 'like', "%$value%" ] ]);
        }
    }

    public function searchStatusAttr(Query $query, $value, $data)
    {
        if (!empty($value)) {
            $query->where([ [ 'status', '=', $value ] ]);
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
    public function tourismOrder() {
        return $this->hasOne(TourismOrder::class, 'order_id', 'order_id');
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
        return $this->hasMany(TourismOrderRefundLog::class, 'refund_id', 'refund_id');
    }
}