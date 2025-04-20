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
 * 订单导出数据类型查询
 * Class ShopOrderExportTypeListener
 * @package addon\shop\app\listener\order_export
 */
class ShopOrderExportTypeListener
{

    public function handle()
    {
        return [
            'shop_order' => [
                'name' => '订单列表',
                'column' => [
                    'order_no' => ['name' => '订单编号'],
                    'member_no' => ['name' => '会员编号'],
                    'nickname' => ['name' => '买家昵称'],
                    'mobile' => ['name' => '买家手机号'],
                    'goods_name' => ['name' => '商品名称'],
                    'sku_name' => ['name' => '商品规格'],
                    'num' => ['name' => '商品数量'],
                    'price' => ['name' => '商品售价'],
                    'goods_money' => ['name' => '商品小计'],
                    'order_from_name' => ['name' => '订单来源'],
                    'goods_total_money' => ['name' => '商品总价'],
                    'delivery_money' => ['name' => '配送金额'],
                    'discount_money' => ['name' => '优惠金额'],
                    'order_money' => ['name' => '订单金额'],
                    'point' => [ 'name' => '积分'],
                    'taker_name' => ['name' => '收货人姓名'],
                    'taker_mobile' => ['name' => '收货人手机号'],
                    'taker_full_address' => ['name' => '收货地址'],
                    'delivery_type_name' => ['name' => '配送方式'],
                    'status_name' => ['name' => '订单状态'],
                    'create_time' => ['name' => '订单创建时间'],
                    'pay_time' => ['name' => '订单支付时间'],
                    'delivery_time' => ['name' => '订单发货时间'],
                    'finish_time' => ['name' => '订单完成时间'],
                    'member_remark' => ['name' => '买家留言'],
                    'shop_remark' => ['name' => '商家备注'],
                    'close_remark' => ['name' => '关闭原因'],
                    'out_trade_no' => ['name' => '支付流水号'],
                    'pay_type' => ['name' => '支付方式'],
                    'store_name' => ['name' => '自提门店'],
                    'express_number' => ['name' => '物流单号'],
                    'company_name' => ['name' => '物流公司'],
                    'invoice_type' => ['name' => '发票类型'],
                    'header_name' => ['name' => '发票抬头'],
                    'tax_number' => ['name' => '发票税号'],
                ]
            ]
        ];
    }
}