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

namespace addon\tourism\app\listener\order;

use addon\tourism\app\dict\order\HotelOrderDict;
use addon\tourism\app\dict\order\ScenicOrderDict;
use addon\tourism\app\dict\order\WayOrderDict;
use addon\tourism\app\model\TourismOrder;

/**
 * 通过支付信息获取订单详情
 * Class TourismOrderTradeInfoListener
 * @package addon\tourism\app\listener\order
 */
class TourismOrderTradeInfoListener
{

    public function handle($params)
    {
        $trade_type = $params[ 'trade_type' ] ?? '';
        if (in_array($trade_type, [ HotelOrderDict::TYPE, ScenicOrderDict::TYPE, WayOrderDict::TYPE ])) {
            $order_info = ( new TourismOrder() )->where([ [ 'order_id', '=', $params[ 'trade_id' ] ] ])->field('order_id, hotel_id, scenic_id, way_id')->with([ 'item' => function($query) {
                $query->field('site_id, order_id, price, num, year, month, day, goods_name, goods_image')->append([ 'goods_image_thumb_mid' ]);
            }, 'hotel' => function($query) {
                $query->field('hotel_id, hotel_name');
            }, 'scenic' => function($query) {
                $query->field('scenic_id, scenic_name');
            }, 'way' => function($query) {
                $query->field('way_id, way_name');
            } ])->findOrEmpty()->toArray();
            $info = [];
            $item = [];
            if (!empty($order_info)) {
                if ($order_info[ 'item' ]) {
                    foreach ($order_info[ 'item' ] as $k => $v) {
                        $item[ $k ][ 'item_image' ] = empty($v[ 'goods_image_thumb_mid' ]) ? $v[ 'goods_image' ] : $v[ 'goods_image_thumb_mid' ];//订单项图片
                        $item[ $k ][ 'item_sub_name' ] = $v[ 'year' ] . '年' . $v[ 'month' ] . '月' . $v[ 'day' ] . '日';//订单项副标题
                        $item[ $k ][ 'item_price' ] = $v[ 'price' ];//订单项金额
                        $item[ $k ][ 'item_num' ] = $v[ 'num' ];//订单项数量
                        if ($order_info[ 'hotel' ]) {
                            $item[ $k ][ 'item_name' ] = $order_info[ 'hotel' ][ 'hotel_name' ] . '【' . $v[ 'goods_name' ] . '】';//订单项名称
                        } elseif ($order_info[ 'scenic' ]) {
                            $item[ $k ][ 'item_name' ] = $order_info[ 'scenic' ][ 'scenic_name' ] . '【' . $v[ 'goods_name' ] . '】';//订单项名称
                        } elseif ($order_info[ 'way' ]) {
                            $item[ $k ][ 'item_name' ] = $order_info[ 'way' ][ 'way_name' ] . '【' . $v[ 'goods_name' ] . '】';//订单项名称
                        }
                    }
                    $info[ 'item_list' ] = $item;//订单项列表
                    if ($order_info[ 'hotel' ]) {
                        $info[ 'item_total' ] = '共' . count($order_info[ 'item' ]) . '晚';//订单项总计
                    } elseif ($order_info[ 'scenic' ]) {
                        $info[ 'item_total' ] = '共' . count($order_info[ 'item' ]) . '个景点';//订单项总计
                    } elseif ($order_info[ 'way' ]) {
                        $info[ 'item_total' ] = '共' . count($order_info[ 'item' ]) . '条线路';//订单项总计
                    }
                    $info[ 'detail_url' ] = '/addon/tourism/pages/order/detail?order_id=' . $params[ 'trade_id' ];//订单详情跳转路径
                }
            }
            return $info;
        }
    }
}
