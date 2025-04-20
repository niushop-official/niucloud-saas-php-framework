<?php
declare ( strict_types = 1 );

namespace addon\shop_fenxiao\app\listener\poster;


use addon\shop\app\model\goods\GoodsSku;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;
use addon\shop\app\model\goods\Goods;
use app\model\member\Member;
use app\service\core\sys\CoreSysConfigService;

/**
 * 订单收货完成后事件
 */
class ShopFenxiaoPoster
{
    /**
     * 分销商海报
     * @param $data
     * @return void
     */
    public function handle($data)
    {
        $type = $data[ 'type' ];
        if ($type == 'fenxiao') {

            $site_id = $data[ 'site_id' ];
            $param = $data[ 'param' ];
            $member_id = $param[ 'member_id' ] ?? 0;
            $mode = $param[ 'mode' ] ?? '';

            if ($mode == 'preview') {
                $return_data = [
                    'nickname' => '会员昵称',
                    'headimg' => 'static/resource/images/default_headimg.png',
                    'url' => [
                        'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                        'page' => 'addon/shop/pages/index',
                        'data' => [
                            [ 'key' => 'mid', 'value' => $member_id ]
                        ],
                    ],
                ];
                return $return_data;
            }

            //查询会员信息
            $member = ( new Member() )->where([ [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
            if ($member->isEmpty()) return [];

            if (empty($member[ 'headimg' ])) {
                $member[ 'headimg' ] = 'static/resource/images/default_headimg.png';
            }

            $return_data = [
                'nickname' => mb_strlen($member[ 'nickname' ]) > 10 ? mb_substr($member[ 'nickname' ], 0, 7, 'utf-8') . '...' : $member[ 'nickname' ],
                'headimg' => $member[ 'headimg' ],
                'url' => [
                    'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                    'page' => 'addon/shop/pages/index',
                    'data' => [
                        [ 'key' => 'mid', 'value' => $member_id ]
                    ],
                ],
            ];
            $fenxiao = ( new Fenxiao() )->where([ [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])
                ->with([ 'fenxiao_level' ])
                ->findOrEmpty();
            if (!$fenxiao->isEmpty()) {
                $return_data[ 'level' ] = $fenxiao[ 'fenxiao_level' ][ 'level_name' ];
            }
            return $return_data;
        } else if ($type == 'fenxiao_goods') {

            $site_id = $data[ 'site_id' ];
            $param = $data[ 'param' ];
            $sku_id = $param[ 'sku_id' ] ?? 0;
            $member_id = $param[ 'member_id' ] ?? 0;
            $mode = $param[ 'mode' ] ?? '';

            if ($mode == 'preview') {
                $url_data = [
                    [ 'key' => 'sku_id', 'value' => $sku_id ]
                ];
                $return_data = [
                    'goods_name' => '商品名称',
                    'goods_price' => '￥269.00',
                    'goods_market_price' => '￥2690.00',
                    'goods_img' => 'addon/shop/goods_template.png',
                    'nickname' => '会员昵称',
                    'headimg' => 'static/resource/images/default_headimg.png',
                    'url' => [
                        'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                        'page' => 'addon/shop/pages/goods/detail',
                        'data' => $url_data,
                    ],
                ];
                return $return_data;
            }

            //查询sku信息
            $sku = ( new GoodsSku() )->where([ [ 'sku_id', '=', $sku_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
            if ($sku->isEmpty()) return [];

            $goods_id = $sku[ 'goods_id' ];
            $goods = ( new Goods() )->where([ [ 'goods_id', '=', $goods_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
            if ($goods->isEmpty()) return [];

            $goods_name = $goods[ 'goods_name' ] . $sku[ 'sku_name' ];
//            if (mb_strlen($goods_name, 'UTF-8') > 14) {
//                $goods_name = mb_substr($goods_name, 0, 14, 'UTF-8') . '...';
//            }
            //查询会员信息
            $member = ( new Member() )->where([ [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
            if ($member->isEmpty()) return [];

//            $service_ids = $goods['service_ids'];
//            if(!empty($service_ids)){
//                // 商品服务
//                $goods_service_model = new Service();
//                $services = $goods_service_model->where([
//                    [ 'site_id', '=', $site_id ],
//                    [ 'service_id', 'in', $service_ids ]
//                ])->column('service_name');
//                $services = implode('·', $services);
//            }

            $sku_img = $sku[ 'sku_image' ];
            if (empty($sku_img)) {
                $sku_img = $goods[ 'goods_cover' ];
            }
            if (empty($sku_img)) {
                $sku_img = 'addon/shop/goods_template.png';
            }
            $market_price_text = $sku[ 'market_price' ] > 0 ? '￥' . $sku[ 'market_price' ] : '';
            $url_data = [
                [ 'key' => 'sku_id', 'value' => $sku_id ]
            ];

            $url_data[] = [ 'key' => 'mid', 'value' => $member_id ];
            if (empty($member[ 'headimg' ])) {
                $member[ 'headimg' ] = 'static/resource/images/default_headimg.png';
            }
            $return_data = [
                'goods_name' => $goods_name,
//                'services' => $services,
                'goods_price' => '￥' . $sku[ 'price' ],
                'nickname' => mb_strlen($member[ 'nickname' ], 'utf-8') > 10 ? mb_substr($member[ 'nickname' ], 0, 10, 'utf-8') . '...' : $member[ 'nickname' ],
                'headimg' => $member[ 'headimg' ],
                'goods_market_price' => $market_price_text,
                'goods_img' => $sku_img,
                'url' => [
                    'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                    'page' => 'addon/shop/pages/goods/detail',
                    'data' => $url_data,
                ],
            ];
            return $return_data;
        }
    }
}
