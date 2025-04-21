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

namespace addon\tourism\app\listener\refund;

/**
 * 订单退款维权导出数据类型查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class TourismOrderRefundExportTypeListener
{
    public function handle()
    {
        return [
            'tourism_order_refund' => [
                'name' => '退款维权',
                'column' => [
                    'refund_no' => [ 'name' => '退款单号'],
                    'member_id' => [ 'name' => '会员id'],
                    'nickname' => [ 'name' => '会员昵称'],
                    'money' => [ 'name' => '退款金额'],
                    'status_name' => [ 'name' => '退款状态'],
                    'refuse_reason' => [ 'name' => '拒绝原因'],
                    'create_time' => [ 'name' => '申请时间'],
                    'transfer_time' => [ 'name' => '完成时间'],
                ]
            ]
        ];
    }
}