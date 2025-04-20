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

namespace addon\o2o\app\listener\order;

/**
 * 订单项导出数据类型查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class O2oOrderGoodsExportTypeListener
{

    public function handle()
    {
        return [
            'o2o_order_goods' => [
                'name' => '订单项列表',
                'column' => [
                    'order_item_id' => [ 'name' => '订单项id'],
                    'order_id' => [ 'name' => '订单id'],
                    'member_id' => [ 'name' => '会员id'],
                    'item_name' => [ 'name' => '服务名称'],
                    'price' => [ 'name' => '商品单价'],
                    'num' => [ 'name' => '购买数量'],
                    'unit' => [ 'name' => '单位'],
                    'item_money' => [ 'name' => '服务总价'],
                    'item_type_name' => [ 'name' => '服务类型'],
                    'pay_time' => [ 'name' => '支付时间'],
                    'is_enable_refund' => [ 'name' => '是否允许退款'],
                    'refund_no' => [ 'name' => '退款单号'],
                ],
            ]
        ];
    }
}