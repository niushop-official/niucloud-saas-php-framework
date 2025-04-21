<?php
declare ( strict_types = 1 );

namespace addon\shop\app\listener\point_exchange;


use addon\shop\app\service\core\pointexchange\CoreGoodsSaleNumService;
use addon\shop\app\service\core\pointexchange\CoreGoodsStockService;
use think\facade\Log;


/**
 * 订单创建后 积分商城业务服务层
 */
class AfterShopOrderCreate
{


    public function handle($data)
    {

        Log::write('订单AfterShopOrderCreate' . json_encode($data));
        try {

            if (isset($data[ 'order_data' ]) && !empty($data[ 'order_data' ][ 'activity_type' ]) && $data[ 'order_data' ][ 'activity_type' ] == 'exchange') {

                $basic = $data[ 'basic' ];
                $order_data = $data[ 'order_data' ];
                $order_goods_data = $data[ 'order_goods_data' ] ?? [];
                $site_id = $order_data[ 'site_id' ];
                //减去商品主体库存
                $core_goods_stock_service = new CoreGoodsStockService();
                foreach ($order_goods_data as $v) {
                    $core_goods_stock_service->dec([
                        'num' => $v[ 'num' ],
                        'goods_id' => $v[ 'goods_id' ],
                        'sku_id' => $v[ 'sku_id' ],
                        'site_id' => $site_id
                    ]);
                }
                //累增销量 +  兑换数量 +累积分消费..
                $core_goods_sale_num_service = new CoreGoodsSaleNumService();
                foreach ($order_goods_data as $v) {
                    //商品累计销量
                    $core_goods_sale_num_service->inc([
                        'num' => $v[ 'num' ],
                        'goods_id' => $v[ 'goods_id' ],
                        'sku_id' => $v[ 'sku_id' ],
                        'id' => $order_data[ 'relate_id' ],
                        'point' => $order_data[ 'point' ],
                        'goods_money' => $v[ 'goods_money' ],
                    ]);
                }
            }
        } catch (\Exception $e) {
            Log::write('订单AfterShopOrderCreate失败' . $e->getMessage() . $e->getFile() . $e->getLine());
        }
    }
}
