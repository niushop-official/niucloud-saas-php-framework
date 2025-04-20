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

namespace addon\o2o\app\listener\refund;

/**
 * 订单退款维权导出数据类型查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class O2oOrderRefundExportTypeListener
{
    public function handle()
    {
        return [
            'o2o_order_refund' => [
                'name' => '退款维权',
                'column' => [
                    'refund_no' => [ 'name' => '退款单号'],
                    'member_id' => [ 'name' => '会员id'],
                    'nickname' => [ 'name' => '会员昵称'],
                    'reason' => [ 'name' => '退款原因'],
                    'remark' => [ 'name' => '描述'],
                    'apply_money' => [ 'name' => '申请退款'],
                    'money' => [ 'name' => '实际退款'],
                    'status_name' => [ 'name' => '退款状态'],
                    'refuse_reason' => [ 'name' => '拒绝原因'],
                    'create_time' => [ 'name' => '申请时间'],
                    'transfer_time' => [ 'name' => '完成时间'],
                ]
            ]
        ];
    }
}