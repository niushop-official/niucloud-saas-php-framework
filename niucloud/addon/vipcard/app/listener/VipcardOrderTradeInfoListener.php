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

namespace addon\vipcard\app\listener;

use addon\vipcard\app\dict\order\OrderDict;
use addon\vipcard\app\model\Order;

/**
 * 通过支付信息获取订单详情
 * Class VipcardOrderTradeInfoListener
 * @package addon\vipcard\app\listener
 */
class VipcardOrderTradeInfoListener
{

    public function handle($params)
    {
        $trade_type = $params[ 'trade_type' ] ?? '';
        if (in_array($trade_type, [ OrderDict::TYPE ])) {
            $order_info = ( new Order() )->where([ [ 'order_id', '=', $params[ 'trade_id' ] ] ])->field('order_id')->with([ 'item' => function($query) {
                $query->field('site_id, order_id, item_name, item_image, price, num')->append([ 'item_image_thumb_mid' ]);
            } ])->findOrEmpty()->toArray();
            $info = [];
            $item = [];
            if (!empty($order_info)) {
                if ($order_info[ 'item' ]) {
                    foreach ($order_info[ 'item' ] as $k => $v) {
                        $item[ $k ][ 'item_image' ] = empty($v[ 'item_image_thumb_mid' ]) ? $v[ 'item_image' ] : $v[ 'item_image_thumb_mid' ];//订单项图片
                        $item[ $k ][ 'item_name' ] = $v[ 'item_name' ];//订单项名称
                        $item[ $k ][ 'item_sub_name' ] = '';//订单项副标题
                        $item[ $k ][ 'item_price' ] = $v[ 'price' ];//订单项金额
                        $item[ $k ][ 'item_num' ] = $v[ 'num' ];//订单项数量
                    }
                    $info[ 'item_list' ] = $item;//订单项列表
                    $info[ 'item_total' ] = '共' . count($order_info[ 'item' ]) . '种卡项';//订单项总计
                    $info[ 'detail_url' ] = '/addon/vipcard/pages/order/detail?order_id=' . $params[ 'trade_id' ];//订单详情跳转路径
                }
            }
            return $info;
        }
    }
}
