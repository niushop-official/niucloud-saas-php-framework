<?php
declare ( strict_types = 1 );

namespace addon\o2o\app\listener\poster;

use addon\o2o\app\model\Goods;
use addon\o2o\app\model\GoodsSku;
use app\model\member\Member;
use app\service\core\sys\CoreSysConfigService;

/**
 * 项目海报数据
 */
class O2oPoster
{
    /**
     * 项目海报
     * @param $data
     * @return array
     */
    public function handle($data)
    {
        $type = $data[ 'type' ];
        if ($type == 'o2o_goods') {
            // 项目 海报模板数据

            $site_id = $data[ 'site_id' ];
            $param = $data[ 'param' ];
            $sku_id = $param[ 'sku_id' ] ?? 0;
            $member_id = $param[ 'member_id' ] ?? 0;
            $mode = $param[ 'mode' ] ?? '';

            if ($mode == 'preview') {
                // 预览模式
                $url_data = [
                    [ 'key' => 'sku_id', 'value' => $sku_id ]
                ];
                $return_data = [
                    'nickname' => '会员昵称',
                    'headimg' => 'static/resource/images/default_headimg.png',
                    'goods_name' => '项目名称',
                    'goods_price' => '￥369.00',
                    'goods_img' => 'addon/o2o/goods_template.png',
                    'url' => [
                        'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                        'page' => 'addon/o2o/pages/goods/detail',
                        'data' => $url_data,
                    ],
                ];
                return $return_data;
            }

            // 查询sku信息
            $sku = ( new GoodsSku() )->where([ [ 'sku_id', '=', $sku_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();

            if ($sku->isEmpty()) return [];

            $goods_id = $sku[ 'goods_id' ];
            $goods = ( new Goods() )->where([ [ 'goods_id', '=', $goods_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
            if ($goods->isEmpty()) return [];
            $goods_name = $goods[ 'goods_name' ] . $sku[ 'sku_name' ];
            if($goods[ 'goods_name' ] == $sku[ 'sku_name' ]){
                $goods_name = $goods[ 'goods_name' ];
            }

            if (mb_strlen($goods_name, 'UTF-8') > 14) {
                $goods_name = mb_substr($goods_name, 0, 14, 'UTF-8') . '...';
            }

            $sku_img = $sku[ 'sku_image' ];
            if (empty($sku_img)) {
                $sku_img = $goods[ 'goods_cover' ];
            }
            if (empty($sku_img)) {
                $sku_img = 'addon/o2o/goods_template.png';
            }
            $url_data = [
                [ 'key' => 'sku_id', 'value' => $sku_id ]
            ];

            $member_info = [];

            if ($member_id > 0) {
                $url_data[] = [ 'key' => 'mid', 'value' => $member_id ];

                //查询会员信息
                $member_info = ( new Member() )->where([ [ 'member_id', '=', $member_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();

                if (!empty($member_info)) {
                    if (empty($member_info[ 'headimg' ]) || !is_file($member_info[ 'headimg' ])) {
                        $member_info[ 'headimg' ] = 'static/resource/images/default_headimg.png';
                    }
                }
            }

            $return_data = [
                'goods_name' => $goods_name,
                'goods_price' => '￥' . $sku[ 'price' ],
                'goods_img' => $sku_img,
                'url' => [
                    'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                    'page' => 'addon/o2o/pages/goods/detail',
                    'data' => $url_data,
                ],
            ];

            if (!empty($member_info)) {
                $return_data[ 'nickname' ] = mb_strlen($member_info[ 'nickname' ]) > 10 ? mb_substr($member_info[ 'nickname' ], 0, 7, 'utf-8') . '...' : $member_info[ 'nickname' ];
                $return_data[ 'headimg' ] = $member_info[ 'headimg' ];
            }
            return $return_data;
        }
    }
}
