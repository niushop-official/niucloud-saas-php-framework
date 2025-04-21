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

namespace addon\o2o\app\model;

use addon\o2o\app\dict\order\OrderDict;
use app\dict\common\ChannelDict;
use app\model\member\Member;
use app\model\pay\Pay;
use core\base\BaseModel;
use think\model\concern\SoftDelete;

/**
 *  卡项订单
 * Class O2oGoodsCategory
 * @package app\model\o2o_goods_category
 */
class Order extends BaseModel
{
    use SoftDelete;

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


    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'order_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'o2o_order';

    protected $type = [
        'pay_time' => 'timestamp',
        'create_time' => 'timestamp',
        'close_time' => 'timestamp',
        'service_time' => 'timestamp',
        'dispatch_time' => 'timestamp',
        'finish_time' => 'timestamp',
    ];

    /**
     * 登录渠道字段转化
     * @param $value
     * @return mixed
     */
    public function getOrderFromNameAttr($value, $data)
    {
        if (isset($data[ 'order_from' ])) {
            return ChannelDict::getType()[ $data[ 'order_from' ] ] ?? '';
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
     * 订单状态
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderNameAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('order_name', 'like', '%' . $value . '%');
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
     * 订单号
     * @param $query
     * @param $value
     * @param $data
     */
    public function searchOrderNoAttr($query, $value, $data)
    {
        if ($value != '') {
            $query->where('order_no', 'like', '%' . $value . '%');
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
     * 创建时间搜索器
     * @param $value
     */
    public function searchCreateTimeAttr($query, $value, $data)
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

    /**
     * 支付时间筛选
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchPayTimeAttr($query, $value, $data)
    {
        $start_time = empty($value[ 0 ]) ? 0 : strtotime($value[ 0 ]);
        $end_time = empty($value[ 1 ]) ? 0 : strtotime($value[ 1 ]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('pay_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([ [ 'pay_time', '>=', $start_time ] ]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([ [ 'pay_time', '<=', $end_time ] ]);
        }
    }

    /**
     * 购买会员筛选
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchMemberSearchTextAttr($query, $value, $data)
    {
        if ($value) {
            $member_ids = ( new Member )->where([ [ 'username|member_no|nickname|mobile', 'like', '%' . $value . '%' ], [ 'site_id', '=', $data[ 'site_id' ] ] ])->column('member_id');
            if ($member_ids) $query->where('member_id', 'in', $member_ids);
        }
    }

    /**
     * 技师筛选
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchTechnicianSearchTextAttr($query, $value, $data)
    {
        if ($value) {
            $ids = ( new Technician() )->where([ [ 'name|mobile', 'like', '%' . $value . '%' ], [ 'site_id', '=', $data[ 'site_id' ] ] ])->column('id');
            if ($ids) {
                $query->where('technician_id', 'in', $ids);
            } else {
                $query->where('technician_id', 'in', '-1');
            }
        }
    }

    /**
     * @param $value
     * @param $data
     * @return mixed|void
     * @throws \Exception
     */
    public function getOrderStatusInfoAttr($value, $data)
    {
        if (isset($data[ 'order_status' ])) {
            return OrderDict::getStatus($data[ 'order_status' ]);
        }
    }

    public function item()
    {

        return $this->hasMany(OrderItem::class, 'order_id', 'order_id')->append([ 'item_image_thumb_small', 'refund_status_name' ]);
    }

    /**
     * 关联会员
     * @return \think\model\relation\HasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id');
    }

    /**
     * 订单日志
     * @return \think\model\relation\HasMany
     */
    public function orderlog()
    {
        return $this->hasMany(OrderLog::class, 'order_id', 'order_id');
    }

    /**
     * 技师
     * @return \think\model\relation\HasMany
     */
    public function technicianInfo()
    {
        return $this->hasOne(Technician::class, 'id', 'technician_id');
    }

    /**
     * 支付记录
     * @return \think\model\relation\HasOne
     */
    public function pay()
    {
        return $this->hasOne(Pay::class, 'out_trade_no', 'out_trade_no');
    }

    public function refund()
    {
        return $this->hasOne(OrderRefund::class, 'refund_no', 'refund_no')->bind([ 'refund_id' => 'refund_id' ]);
    }
}
