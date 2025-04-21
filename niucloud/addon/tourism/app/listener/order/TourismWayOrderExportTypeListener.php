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

namespace addon\tourism\app\listener\order;

/**
 * 路线订单导出数据类型查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class TourismWayOrderExportTypeListener
{

    public function handle()
    {
        return [
            'tourism_way_order' => [
                'name' => '路线订单列表',
                'column' => [
                    'order_id' => [ 'name' => '订单id'],
                    'order_no' => [ 'name' => '订单编号'],
                    'order_from_name' => [ 'name' => '订单来源'],
                    'out_trade_no' => [ 'name' => '支付流水号'],
                    'member_id' => [ 'name' => '会员id'],
                    'member_no' => [ 'name' => '会员编号'],
                    'nickname' => [ 'name' => '会员昵称'],
                    'goods_name' => [ 'name' => '路线名称'],
                    'price' => [ 'name' => '价格'],
                    'num' => [ 'name' => '购买数量'],
                    'order_money' => [ 'name' => '订单金额'],
                    'start_time' => [ 'name' => '预订日期'],
                    'buyer' => [ 'name' => '游客姓名'],
                    'mobile' => [ 'name' => '联系电话'],
                    'type' => [ 'name' => '证件类型'],
                    'id_card' => [ 'name' => '证件号码'],
                    'create_time' => [ 'name' => '创建时间'],
                    'status_name' => [ 'name' => '订单状态'],
                    'pay_time' => [ 'name' => '订单支付时间'],
                ],
            ]
        ];
    }
}