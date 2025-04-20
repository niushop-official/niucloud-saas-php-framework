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

use addon\shop\app\dict\order\InvoiceDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use think\db\Query;

/**
 * 订单导出数据源查询
 * Class ShopOrderExportDataListener
 * @package addon\shop\app\listener\order_export
 */
class ShopOrderExportDataListener
{

    public function handle($param)
    {
        $data = [];
        if ($param[ 'type' ] == 'shop_order') {
            $model = new Order();
            $orderGoodsModel = new OrderGoods();
            $pay_where = [];
            if ($param[ 'where' ][ 'pay_type' ]) {
                $pay_where[] = [ 'pay.type', '=', $param[ 'where' ][ 'pay_type' ] ];
            }
            //查询导出订单项数据
            $order_ids = $model->where([ [ 'order.site_id', '=', $param[ 'site_id' ] ] ])->withSearch([ 'search_type', 'order_from', 'join_status', 'create_time', 'join_pay_time' ], $param[ 'where' ])
                ->withJoin([
                    'pay' => function(Query $query) use ($pay_where) {
                        $query->where($pay_where);
                    } ], 'left')
                ->field('order_id')->order('order.create_time desc')->column('order_id');

            $order_goods_field = 'extend,order_goods_id,order_id,member_id,goods_id,sku_id,delivery_id,goods_name,sku_name,goods_image,sku_image,price,num,goods_money,is_enable_refund,goods_type,delivery_status,status';
            $search_model = $orderGoodsModel->where([ [ 'site_id', '=', $param[ 'site_id' ] ], [ 'order_id', 'in', $order_ids ] ])
                ->with([
                    'order_delivery' => function($query) {
                        $query->field('id, express_company_id, express_number')->with('company');
                    }
                ])
                ->field($order_goods_field)->append([ 'status_name', 'delivery_status_name', 'goods_type_name' ]);
            if ($param[ 'page' ][ 'page' ] > 0 && $param[ 'page' ][ 'limit' ] > 0) {
                $data = $search_model->page($param[ 'page' ][ 'page' ], $param[ 'page' ][ 'limit' ])->select()->toArray();
            } else {
                $data = $search_model->select()->toArray();
            }

            $is_first = true;
            $encountered = array();
            foreach ($data as $key => $val) {

                if (isset($encountered[ $val[ 'order_id' ] ])) {
                    $is_first = false;
                } else {
                    $encountered[ $val[ 'order_id' ] ] = true;
                    $is_first = true;
                }
                $order_field = 'order_id,site_id,invoice_id,order_no,order_type,order_from,out_trade_no,status,member_id,ip,goods_money,delivery_money,order_money,point,discount_money,create_time,pay_time,delivery_type,delivery_time,take_time,finish_time,close_time,taker_name,taker_mobile,taker_full_address,take_store_id,is_enable_refund,member_remark,shop_remark,close_remark';
                $order_data = $model
                    ->where([ [ 'order_id', '=', $val[ 'order_id' ] ], [ 'order.site_id', '=', $param[ 'site_id' ] ] ])->field($order_field)
                    ->withJoin([ 'pay' ], 'left')
                    ->with([
                        'member' => function($query) {
                            $query->field('member_id, nickname, mobile, member_no');
                        },
                        'store' => function($query) {
                            $query->field('store_id, store_name, store_mobile');
                        },
                        'invoice' => function($query) {
                            $query->where([ [ 'status', '=', InvoiceDict::OPEN ] ])->field('id,header_name,tax_number,type')->append([ 'type_name' ]);
                        }
                    ])->order('order.create_time desc')->append([ 'order_from_name', 'order_type_name', 'status_name', 'delivery_type_name' ])->findOrEmpty();

                $pay = $order_data[ 'pay' ];
                if (!empty($pay)) {
                    $pay->append([ 'type_name' ]);
                }
                $order_data = $order_data->toArray();

                $data[ $key ][ 'order_no' ] = $is_first ? $order_data[ 'order_no' ] . "\t" : '';
                $data[ $key ][ 'order_from_name' ] = $is_first ? $order_data[ 'order_from_name' ] : '';
                $data[ $key ][ 'goods_total_money' ] = $is_first ? $order_data[ 'goods_money' ] : '';
                $data[ $key ][ 'delivery_money' ] = $is_first ? $order_data[ 'delivery_money' ] : '';
                $data[ $key ][ 'discount_money' ] = $is_first ? $order_data[ 'discount_money' ] : '';
                $data[ $key ][ 'order_money' ] = $is_first ? $order_data[ 'order_money' ] : '';
                $data[ $key ][ 'point' ] = $is_first ? $order_data[ 'point' ] : '';
                $data[ $key ][ 'taker_name' ] = $is_first ? $order_data[ 'taker_name' ] : '';
                $data[ $key ][ 'taker_mobile' ] = $is_first ? $order_data[ 'taker_mobile' ] . "\t" : '';
                $data[ $key ][ 'taker_full_address' ] = $is_first ? $order_data[ 'taker_full_address' ] : '';
                $data[ $key ][ 'delivery_type_name' ] = $is_first ? $order_data[ 'delivery_type_name' ] : '';
                $data[ $key ][ 'create_time' ] = $is_first ? $order_data[ 'create_time' ] : '';
                $data[ $key ][ 'pay_time' ] = $is_first ? $order_data[ 'pay_time' ] : '';
                $data[ $key ][ 'delivery_time' ] = $is_first ? $order_data[ 'delivery_time' ] : '';
                $data[ $key ][ 'finish_time' ] = $is_first ? $order_data[ 'finish_time' ] : '';
                $data[ $key ][ 'member_remark' ] = $is_first ? $order_data[ 'member_remark' ] : '';
                $data[ $key ][ 'shop_remark' ] = $is_first ? $order_data[ 'shop_remark' ] : '';
                $data[ $key ][ 'close_remark' ] = $is_first ? $order_data[ 'close_remark' ] : '';
                $data[ $key ][ 'out_trade_no' ] = $is_first ? $order_data[ 'out_trade_no' ] . "\t" : '';

                $data[ $key ][ 'status_name' ] = $is_first ? $order_data[ 'status_name' ][ 'name' ] : '';
                $data[ $key ][ 'nickname' ] = $is_first ? ( !empty($order_data[ 'member' ]) ? $order_data[ 'member' ][ 'nickname' ] : '' ) : '';
                $data[ $key ][ 'mobile' ] = $is_first ? ( !empty($order_data[ 'member' ]) ? $order_data[ 'member' ][ 'mobile' ] . "\t" : '' ) : '';
                $data[ $key ][ 'member_no' ] = $is_first ? ( !empty($order_data[ 'member' ]) ? $order_data[ 'member' ][ 'member_no' ] . "\t" : '' ) : '';
                $data[ $key ][ 'pay_type' ] = $is_first ? ( !empty($order_data[ 'pay' ]) ? $order_data[ 'pay' ][ 'type_name' ] : '' ) : '';
                $data[ $key ][ 'invoice_type' ] = $is_first ? ( !empty($order_data[ 'invoice' ]) ? $order_data[ 'invoice' ][ 'type_name' ] : '' ) : '';
                $data[ $key ][ 'header_name' ] = $is_first ? ( !empty($order_data[ 'invoice' ]) ? $order_data[ 'invoice' ][ 'header_name' ] . "\t" : '' ) : '';
                $data[ $key ][ 'tax_number' ] = $is_first ? ( !empty($order_data[ 'invoice' ]) ? $order_data[ 'invoice' ][ 'tax_number' ] . "\t" : '' ) : '';
                $data[ $key ][ 'store_name' ] = $is_first ? ( !empty($order_data[ 'store' ]) ? $order_data[ 'store' ][ 'store_name' ] : '' ) : '';
                $data[ $key ][ 'pay_time' ] = $is_first ? ( !empty($order_data[ 'pay_time' ]) ? $order_data[ 'pay_time' ] : '' ) : '';
                $data[ $key ][ 'delivery_time' ] = $is_first ? ( !empty($order_data[ 'delivery_time' ]) ? $order_data[ 'delivery_time' ] : '' ) : '';
                $data[ $key ][ 'finish_time' ] = $is_first ? ( !empty($order_data[ 'finish_time' ]) ? $order_data[ 'finish_time' ] : '' ) : '';

                $data[ $key ][ 'express_number' ] = !empty($val[ 'order_delivery' ]) ? $val[ 'order_delivery' ][ 'express_number' ] . "\t" : '';
                $data[ $key ][ 'company_name' ] = !empty($val[ 'order_delivery' ]) ? ( !empty($val[ 'order_delivery' ][ 'company' ]) ? $val[ 'order_delivery' ][ 'company' ][ 'company_name' ] : '' ) : '';

            }
        }
        return $data;
    }
}