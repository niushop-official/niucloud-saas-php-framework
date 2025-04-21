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

use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use think\db\Query;

/**
 * 订单项导出数据源查询
 * Class ShopOrderGoodsExportDataListener
 * @package addon\shop\app\listener\order_export
 */
class ShopOrderGoodsExportDataListener
{

    public function handle($param)
    {
        $data = [];
        if ($param['type'] == 'shop_order_goods') {
            $model = new Order();
            $orderGoodsModel = new OrderGoods();
            $order = 'order.create_time desc';
            $pay_where = [];
            if($param['where'][ 'pay_type' ]){
                $pay_where[] = ['pay.type', '=',  $param['where'][ 'pay_type' ] ];
            }
            //查询导出订单项数据
            $order_ids = $model->where([['order.site_id', '=', $param['site_id']]])->withSearch([ 'search_type', 'order_from', 'join_status', 'create_time', 'join_pay_time' ], $param['where'])
                ->withJoin([
                    'pay' => function(Query $query) use($pay_where){
                        $query->where($pay_where);
                    }], 'left')
                ->field('order_id')->order($order)->column('order_id');

            $order_goods_field = 'order_goods_id,order_id,member_id,delivery_id,goods_name,sku_name,price,num,goods_money,discount_money,order_refund_no,order_goods_money,goods_type,delivery_status,status';
            $order_field = 'order_id,order_no,order_from,taker_name,taker_mobile,taker_full_address,create_time,pay_time,delivery_money,delivery_type,delivery_time,finish_time,member_remark,shop_remark,out_trade_no,status';
            $search_model = $orderGoodsModel->where([['site_id', '=', $param['site_id']], ['order_id', 'in', $order_ids]])
                ->with([
                    'order_delivery' => function($query) {
                        $query->field('id, express_company_id, express_number')->with('company');
                    },
                    'orderMain' =>function ($query) use($order_field) {
                        $query->field($order_field)->with(['pay'])->append([ 'order_from_name', 'status_name', 'delivery_type_name' ]);
                    },
                    'member' => function($query) {
                        $query->field('member_id, nickname, mobile, member_no');
                    },
                ])
                ->field($order_goods_field)->append(['status_name', 'delivery_status_name', 'goods_type_name']);

            $page = intval($param['page']['page']);
            $limit = intval($param['page']['limit']);
            if ($page > 0 && $limit > 0) {
                $data = $search_model->page($page, $limit)->select();
            } else {
                $data = $search_model->select();
            }
            foreach ($data as $key => $val){
                $pay = $val['orderMain']['pay'];
                if(!empty($pay)){
                    $pay->append(['type_name']);
                }
                $data[$key]['order_no'] = $val['orderMain']['order_no']."\t";
                $data[$key]['nickname'] = !empty($val['member']) ? $val['member']['nickname'] : '';
                $data[$key]['mobile'] = !empty($val['member']) ? $val['member']['mobile'] . "\t" : '';
                $data[$key]['member_no'] = !empty($val['member']) ? $val['member']['member_no'] . "\t" : '';
                $data[$key]['order_from_name'] = $val['orderMain']['order_from_name'];
                $data[$key]['taker_name'] = $val['orderMain']['taker_name'];
                $data[$key]['taker_mobile'] = $val['orderMain']['taker_mobile'];
                $data[$key]['taker_full_address'] = $val['orderMain']['taker_full_address'];
                $data[$key]['delivery_type_name'] = $val['orderMain']['delivery_type_name'];
                $data[$key]['delivery_money'] = $val['orderMain']['delivery_money'];
                $data[$key]['order_status_name'] = $val['orderMain']['status_name']['name'];
                $data[$key]['create_time'] = $val['orderMain']['create_time'];
                $data[$key]['pay_time'] = !empty($val['orderMain']['pay_time']) ? $val['orderMain']['pay_time'] : '';
                $data[$key]['delivery_time'] = !empty($val['orderMain']['delivery_time']) ? $val['orderMain']['delivery_time'] : '';
                $data[$key]['finish_time'] = !empty($val['orderMain']['finish_time']) ? $val['orderMain']['finish_time'] : '';
                $data[$key]['member_remark'] = $val['orderMain']['member_remark'];
                $data[$key]['shop_remark'] = $val['orderMain']['shop_remark'];
                $data[$key]['out_trade_no'] = $val['orderMain']['out_trade_no']."\t";
                $data[$key]['pay_type'] = !empty($val['orderMain']['pay']) ? $val['orderMain']['pay']['type_name'] : '';
                $data[$key]['order_refund_no'] = $val['order_refund_no']."\t";
                $data[$key]['express_number'] = !empty($val['order_delivery']) ? $val['order_delivery']['express_number']."\t" : '';
                $data[$key]['company_name'] = !empty($val['order_delivery']) ? (!empty($val['order_delivery']['company']) ? $val['order_delivery']['company']['company_name'] : '') : '';
            }
            $data = $data->toArray();
        }
        return $data;
    }
}