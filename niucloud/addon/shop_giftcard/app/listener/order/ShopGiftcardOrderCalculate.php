<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\shop_giftcard\app\listener\order;

use addon\shop\app\dict\active\ActiveDict;
use addon\shop_giftcard\app\service\core\records\CoreUseRecordsService;

/**
 * 兑换卡使用订单计算
 * Class ShopGiftcardOrderCalculate
 * @package addon\shop_giftcard\app\listener\order
 */
class ShopGiftcardOrderCalculate
{
    public function handle(array $params)
    {
        $sku_info = $params[ 'sku_info' ] ?? [];
        $sku_data = $params[ 'sku_data' ] ?? [];
        $order_obj = $params[ 'order_obj' ];
        if (!isset($sku_info['impulse_buy_goods_id'])&&!empty($order_obj->extend_data) && $order_obj->extend_data[ 'activity_type' ] == ActiveDict::GIFTCARD && $sku_info && $sku_data) {
            $data = [
                'card_id' => $order_obj->extend_data[ 'relate_id' ],
                'sku_data' => $sku_data
            ];
            //兑换卡使用校验
            $res = ( new CoreUseRecordsService() )->goodsCardUseCheck($sku_info[ 'site_id' ], $data);
            $order_obj->extend_data[ 'delivery_money' ] = 0;
//            $order_obj->extend_data[ 'relate_id' ] = $order_obj->extend_data[ 'relate_id' ];
            $order_obj->extend_data[ 'activity_type' ] = ActiveDict::GIFTCARD;
            if ($res) {
                $sku_info[ 'goods_money' ] = 0;
                return [
                    'sku_info' => $sku_info,
                    'basic' => [
                        'delivery_money' => 0,
                    ],
                    'relate_id' => $order_obj->extend_data[ 'relate_id' ],
                    'activity_type' => ActiveDict::GIFTCARD
                ];
            }
        }
    }
}
