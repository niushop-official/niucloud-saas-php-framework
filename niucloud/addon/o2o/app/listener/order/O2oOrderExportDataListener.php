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

use addon\o2o\app\model\Order;

/**
 * 订单导出数据源查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class O2oOrderExportDataListener
{

    public function handle($param)
    {
        $data = [];
        if ($param['type'] == 'o2o_order') {
            $model = new Order();
            $where = $param['where'];
            $where['site_id']= $param['site_id'];
            $field = 'order_id, site_id, member_id, dispatch_time,service_time,finish_time,member_message,remark,order_from, order_type, order_no, out_trade_no, technician_id,order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money, taker_name,taker_mobile,taker_address,taker_full_address,check_code';
            $order = 'create_time desc';
            $data = $model->where([ ['site_id', '=', $param['site_id']] ])->withSearch([ 'order_no', 'order_from', 'order_status', 'member_id', 'out_trade_no', 'create_time', 'order_name', 'pay_time', 'member_search_text', 'technician_search_text'], $where)->field($field)
                ->with([ 'item' => function ($query){
                    $query->field('order_id, item_name, order_item_id,refund_no,refund_status,item_image, price, num, item_money, site_id,item_type,goods_id')->append(['item_type_name','item_image_thumb_small']);
                }, 'member' => function($query){
                    $query->field('member_id, nickname, mobile, headimg');
                },'technician_info' => function($query){
                    $query->field('name,age,id,mobile,working_age,position_id,position_name,order_num,bad_evaluate');
                }, 'pay' => function($query){
                    $query->field('out_trade_no,type');
                } ])->order($order)->append(['order_status_info', 'order_from_name'])->select()->toArray();

            foreach ($data as $k => $v){
                $data[$k]['order_money'] = number_format(array_sum(array_column($v['item'], 'item_money')), 2, '.', '');
                $data[$k]['nickname'] = $v['member']['nickname'] ?? '';
                $data[$k]['technician'] = $v['technician_info']['name'] ?? '默认分配';
                $data[$k]['status_name'] = $v['order_status_info']['name'] ?? '';
                $data[$k]['is_enable_refund'] = $v['order_status_info']['name'] ?? '';
            }

        }
        return $data;
    }
}
