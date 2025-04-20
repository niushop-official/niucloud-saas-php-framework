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

namespace addon\shop_fenxiao\app\model\fenxiao;

use addon\shop\app\model\order\Order;
use app\model\member\Member;
use core\base\BaseModel;
use think\db\Query;

/**
 * 分销订单
 */
class FenxiaoOrder extends BaseModel
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
    protected $name = 'shop_fenxiao_order';

    // 设置json类型字段
    protected $json = ['team_members', 'agent_members'];

    // 设置JSON数据返回数组
    protected $jsonAssoc = true;
    /**
     * 关联会员
     * @return \think\model\relation\hasOne
     */
    public function shopOrder()
    {
        return $this->hasOne(Order::class, 'order_id', 'order_id')->joinType('left')->withField('order_id, order_no, goods_money,delivery_money,discount_money,order_money,pay_money');
    }

    /**
     * 分销商品
     * @return \think\model\relation\HasMany
     */
    public function fenxiaoOrderGoods()
    {
        return $this->hasMany(FenxiaoOrderGoods::class, 'order_id', 'order_id');
    }
    /**
     * 关联会员
     * @return \think\model\relation\hasOne
     */
    public function member()
    {
        return $this->hasOne(Member::class, 'member_id', 'member_id')->joinType('left')->withField('member_id, username, headimg');
    }

    /**
     * 一级分销商
     * @return \think\model\relation\HasOne
     */
    public function firstFenxiaoMember(){
        return $this->hasOne(Member::class, 'member_id', 'fenxiao_member_id1')->joinType('left')->withField('member_id, username, headimg');
    }

    /**
     * 二级分销商
     * @return \think\model\relation\HasOne
     */
    public function secondFenxiaoMember(){
        return $this->hasOne(Member::class, 'member_id', 'fenxiao_member_id2')->joinType('left')->withField('member_id, username, headimg');
    }

    /**
     * 是否是已经结算
     * @param $query
     * @param $value
     * @param $data
     * @return void
     */
    public function searchIsSettlementAttr($query, $value, $data)
    {
        if ($value != 'all') {
            $query->where('is_settlement', $value);
        }
    }

    /**
     * 创建时间搜索器
     * @param Query $query
     * @param $value
     * @param $data
     */
    public function searchCreateTimeAttr(Query $query, $value, $data)
    {
        $start_time = empty($value[0]) ? 0 : strtotime($value[0]);
        $end_time = empty($value[1]) ? 0 : strtotime($value[1]);
        if ($start_time > 0 && $end_time > 0) {
            $query->whereBetweenTime('create_time', $start_time, $end_time);
        } else if ($start_time > 0 && $end_time == 0) {
            $query->where([['create_time', '>=', $start_time]]);
        } else if ($start_time == 0 && $end_time > 0) {
            $query->where([['create_time', '<=', $end_time]]);
        }
    }
}
