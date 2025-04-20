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

namespace addon\shop\app\listener\order;

use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\model\order\Order;

/**
 * 通过支付信息获取订单详情
 * Class ShopOrderTradeInfoListener
 * @package addon\shop\app\listener\order
 */
class ShopOrderTradeInfoListener
{

    public function handle($params)
    {
        $trade_type = $params[ 'trade_type' ] ?? '';
        if (in_array($trade_type, [ OrderDict::TYPE ])) {
            $order_info = ( new Order() )->where([ [ 'order_id', '=', $params[ 'trade_id' ] ] ])->field('order_id')
                ->with([
                    'order_goods' => function($query) {
                        $query->field('site_id,order_id,goods_name,sku_name,sku_image,price,num')->append([ 'sku_image_thumb_mid' ]);
                    }
                ])->findOrEmpty()->toArray();
            $info = [];
            $item = [];
            if (!empty($order_info)) {
                if ($order_info[ 'order_goods' ]) {
                    foreach ($order_info[ 'order_goods' ] as $k => $v) {
                        $item[ $k ][ 'item_image' ] = empty($v[ 'sku_image_thumb_mid' ]) ? $v[ 'sku_image' ] : $v[ 'sku_image_thumb_mid' ];//订单项图片
                        $item[ $k ][ 'item_name' ] = $v[ 'goods_name' ];//订单项名称
                        $item[ $k ][ 'item_sub_name' ] = $v[ 'sku_name' ];//订单项副标题
                        $item[ $k ][ 'item_price' ] = $v[ 'price' ];//订单项金额
                        $item[ $k ][ 'item_num' ] = $v[ 'num' ];//订单项数量
                    }
                    $info[ 'item_list' ] = $item;//订单项列表
                    $info[ 'item_total' ] = '共' . count($order_info[ 'order_goods' ]) . '种商品';//订单项总计
                    $info[ 'detail_url' ] = '/addon/shop/pages/order/detail?order_id=' . $params[ 'trade_id' ];//订单详情跳转路径
                }
            }
            return $info;
        }
    }
}
