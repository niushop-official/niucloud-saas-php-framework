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

namespace addon\shop\app\listener\order_export;

/**
 * 订单项导出数据类型查询
 * Class ShopOrderGoodsExportTypeListener
 * @package addon\shop\app\listener\order_export
 */
class ShopOrderGoodsExportTypeListener
{

    public function handle()
    {
        return [
            'shop_order_goods' => [
                'name' => '订单项列表',
                'column' => [
                    'order_no' => ['name' => '订单编号'],
                    'order_goods_id' => ['name' => '子订单编号'],
                    'goods_name' => [ 'name' => '商品名称'],
                    'sku_name' => [ 'name' => '商品规格名称'],
                    'member_no' => ['name' => '会员编号'],
                    'nickname' => ['name' => '买家昵称'],
                    'mobile' => ['name' => '买家手机号'],
                    'price' => [ 'name' => '商品单价'],
                    'num' => [ 'name' => '购买数量'],
                    'goods_money' => [ 'name' => '商品总价'],
                    'discount_money' => [ 'name' => '优惠金额'],
                    'order_goods_money' => [ 'name' => '订单项实付金额'],
                    'order_from_name' => ['name' => '订单来源'],
                    'goods_type_name' => [ 'name' => '商品类型'],
                    'taker_name' => ['name' => '收货人姓名'],
                    'taker_mobile' => ['name' => '收货人手机号'],
                    'taker_full_address' => ['name' => '收货地址'],
                    'delivery_type_name' => ['name' => '配送方式'],
                    'delivery_status_name' => [ 'name' => '配送状态'],
                    'delivery_money' => ['name' => '配送金额'],
                    'express_number' => [ 'name' => '物流单号'],
                    'company_name' => [ 'name' => '物流公司'],

                    'order_status_name' => ['name' => '订单状态'],
                    'create_time' => ['name' => '订单创建时间'],
                    'pay_time' => ['name' => '订单支付时间'],
                    'delivery_time' => ['name' => '订单发货时间'],
                    'finish_time' => ['name' => '订单完成时间'],
                    'member_remark' => ['name' => '买家留言'],
                    'shop_remark' => ['name' => '商家备注'],
                    'out_trade_no' => ['name' => '支付流水号'],
                    'pay_type' => ['name' => '支付方式'],

                    'order_refund_no' => [ 'name' => '退款单号'],
                    'status_name' => [ 'name' => '退款状态']
                ],
            ]
        ];
    }
}