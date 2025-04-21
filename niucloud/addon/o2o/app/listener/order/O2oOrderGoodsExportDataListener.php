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
use addon\o2o\app\model\OrderItem;

/**
 * 订单项导出数据源查询
 * Class MemberExportTypeListener
 * @package app\listener\member
 */
class O2oOrderGoodsExportDataListener
{

    public function handle($param)
    {
        $data = [];
        if ($param['type'] == 'o2o_order_goods') {

            $model = new Order();
            $order_goods_model = new OrderItem();
            $where = $param['where'];
            $where['site_id']= $param['site_id'];
            $field = 'order_id, site_id, member_id, dispatch_time,service_time,finish_time,member_message,remark,order_from, order_type, order_no, out_trade_no, technician_id,order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money, taker_name,taker_mobile,taker_address,taker_full_address,check_code';
            $order = 'create_time desc';
            $order_ids = $model->where([ ['site_id', '=', $param['site_id']] ])->withSearch([ 'order_no', 'order_from', 'order_status', 'member_id', 'out_trade_no', 'create_time', 'order_name', 'pay_time', 'member_search_text', 'technician_search_text'], $where)->field($field)
               ->order($order)->column('order_id');
            $data = $order_goods_model->where([['site_id', '=', $param['site_id']], ['order_id', 'in', $order_ids]])
                ->append(['item_type_name', 'refund_status_name'])->select()->toArray();

            foreach ($data as $k => $v){
                $data[$k]['is_enable_refund'] = $v['is_enable_refund'] ? '允许' : '不允许';
            }
        }
        return $data;
    }
}
