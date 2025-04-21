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


use addon\o2o\app\model\OrderRefund;

/**
 * 订单退款维权导出数据源查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class O2oOrderRefundExportDataListener
{
    public function handle($param)
    {
        $data = [];
        if ($param['type'] == 'o2o_order_refund') {

            $refund_order_model = new OrderRefund();
            $field = 'refund_id, order_id, site_id, member_id, refund_no, status, create_time, audit_time, transfer_time, money,refuse_reason,reason,apply_money,remark,voucher';
            $order = 'create_time desc';
            $where = $param['where'];
            $list = $refund_order_model->where([ ['site_id', '=', $param['site_id']], ['source', '=', 'member' ] ])->withSearch([ 'refund_no', 'create_time', 'status'], $where)->field($field)->with([ 'order_item' => function($query){
                $query->field('order_id,item_type,order_item_id,item_name,item_image,unit,price,item_money,refund_no,refund_status')->append([ 'item_image_thumb_small' ]);
            },'member' => function($query) {
                $query->field('member_id, nickname, mobile, headimg');
            }])->order($order)->append(['status_name'])->select()->toArray();

            foreach($list as $k => $v){
                $list[$k]['nickname'] = $v['member']['nickname'] ?? '';
            }

            return $list;
        }
        return $data;
    }
}