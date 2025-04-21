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

use addon\vipcard\app\dict\ReserveDict;
use core\base\BaseModel;
use think\db\Query;


/**
 * 预约模型
 * Class VipcardReserve
 * @package addon\vipcard\app\model
 */
class Reserve extends BaseModel
{

    protected $type = [
        'reserve_time' => 'timestamp'
    ];

    /**
     * 数据表主键
     * @var string
     */
    protected $pk = 'reserve_id';

    /**
     * 模型名称
     * @var string
     */
    protected $name = 'vipcard_reserve';

    /**
     * 关联商品信息
     * @return \think\model\relation\HasOne
     */
    public function goods(){
        return $this->hasOne( Goods::class,'goods_id', 'goods_id');
    }

    /**
     * 转化状态
     * @param $value
     * @param $data
     */
    public function getReserveStateNameAttr($value, $data){
        return $data['reserve_state'] ? ReserveDict::getStatus($data['reserve_state'])['name'] : '';
    }

    /**
     * @param $value
     * @param $data
     */
    public function getTradeTypeAttr($value, $data){
        return 'vipcard';
    }

    /**
     * @param $value
     * @param $data
     */
    public function getTradeIdAttr($value, $data){
        return $data['order_id'] ?? 0;
    }

    /**
     * 技师名称
     */
    public function getTechnicianNameAttr($value, $data){
        if($data['technician_id']){
            return (ReserveUser::find($data['technician_id']))->name;
        }
    }

    /**
     * 项目名称
     */
    public function getGoodsNameAttr($value, $data){
        if($data['goods_id']){
            return (Goods::find($data['goods_id']))->goods_name;
        }
    }

    /**
     * 搜索器:预约预约状态
     * @param $value
     * @param $data
     */
    public function searchReserveStateAttr($query, $value, $data)
    {
        if ($value) {
            $query->where("reserve_state", $value);
        }
    }

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

    /**
     * 关键字搜索
     */
    public function searchSearchNameAttr($query, $value, $data)
    {
        if ($value) {
            $query->where('reserve_name', 'like', '%' . $value . '%');
        }
    }

    /**
     * 关联技师
     * @return \think\model\relation\HasOne
     */
    public function technician() {
        return $this->hasOne(ReserveUser::class, 'id', 'technician_id');
    }

    /**
     * 关联订单
     */
    public function order(){
        return $this->hasOne(Order::class, 'order_id', 'order_id');
    }
}
