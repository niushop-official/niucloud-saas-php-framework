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


use addon\tourism\app\model\TourismOrderRefund;

/**
 * 订单退款维权导出数据源查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class TourismOrderRefundExportDataListener
{
    public function handle($param)
    {
        $list = [];
        if ($param['type'] == 'tourism_order_refund') {

            $order = 'create_time desc';
            $where = $param['where'];
            $list = (new TourismOrderRefund())->where([ ['site_id', '=', $param['site_id']], ['source', '=', 'member' ] ])->withSearch([ 'refund_no', 'create_time', 'status'], $where)->with([ 'tourismOrder' => function($query){
                $query->field('goods_name,mobile,num,days,start_time,end_time');
            },'member' => function($query) {
                $query->field('member_id, nickname, mobile, headimg');
            }])->order($order)->append(['status_name'])->select()->toArray();

            foreach ($list as $k => $v){
                $list[$k]['nickname'] = $v['member']['nickname'] ?? '';
            }

        }
        return $list;
    }
}