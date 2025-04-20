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
 * 发票导出数据类型查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class ShopInvoiceExportTypeListener
{

    public function handle()
    {
        return [
            'shop_invoice' => [
                'name' => '发票列表',
                'column' => [
                    'order_no' => [ 'name' => '订单号'],
                    'nickname' => [ 'name' => '会员昵称'],
                    'order_money' => [ 'name' => '订单金额'],
                    'header_name' => [ 'name' => '发票抬头'],
                    'header_type_name' => [ 'name' => '抬头类型'],
                    'type_name' => [ 'name' => '发票类型'],
                    'tax_number' => [ 'name' => '纳税人识别号'],
                    'bank_name' => [ 'name' => '开户银行'],
                    'bank_card_number' => [ 'name' => '银行账号'],
                    'address' => [ 'name' => '注册地址'],
                    'name' => [ 'name' => '发票内容'],
                    'money' => [ 'name' => '开票金额'],
                    'invoice_number' => [ 'name' => '发票代码'],
                    'remark' => [ 'name' => '备注'],
                    'create_time' => [ 'name' => '申请时间'],
                    'invoice_time' => [ 'name' => '开票时间'],
                    'is_invoice_name' => [ 'name' => '开票状态'],
                ],
            ]
        ];
    }
}