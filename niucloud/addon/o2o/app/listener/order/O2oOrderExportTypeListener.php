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
 * 订单导出数据类型查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class O2oOrderExportTypeListener
{

    public function handle()
    {
        return [
            'o2o_order' => [
                'name' => '订单列表',
                'column' => [
                    'order_id' => [ 'name' => '订单id'],
                    'order_no' => [ 'name' => '订单编号'],
                    'member_id' => [ 'name' => '会员id'],
                    'nickname' => [ 'name' => '会员昵称'],
                    'technician' => [ 'name' => '技师'],
                    'order_from_name' => [ 'name' => '订单来源'],
                    'out_trade_no' => [ 'name' => '支付流水号'],
                    'order_money' => [ 'name' => '订单金额'],
                    'taker_name' => [ 'name' => '联系人'],
                    'taker_mobile' => [ 'name' => '联系人手机号'],
                    'taker_full_address' => [ 'name' => '详细地址'],
                    'status_name' => [ 'name' => '订单状态'],
                    'create_time' => [ 'name' => '创建时间'],
                    'pay_time' => [ 'name' => '订单支付时间'],
                    'dispatch_time' => [ 'name' => '派单时间'],
                    'service_time' => [ 'name' => '服务时间'],
                    'finish_time' => [ 'name' => '订单完成时间'],
                    'close_time' => [ 'name' => '订单关闭时间'],
                    'member_message' => [ 'name' => '会员留言信息'],
//                    'remark' => [ 'name' => '商家留言'],
                    'check_code' => [ 'name' => '服务码'],
                ]
            ]
        ];
    }
}