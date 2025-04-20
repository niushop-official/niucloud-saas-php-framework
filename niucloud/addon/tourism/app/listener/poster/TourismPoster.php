<?php
declare ( strict_types = 1 );

namespace addon\tourism\app\listener\poster;

use addon\tourism\app\dict\goods\GoodsDict;
use addon\tourism\app\model\Goods;
use addon\tourism\app\model\Hotel;
use addon\tourism\app\model\Scenic;
use addon\tourism\app\model\Way;
use app\model\member\Member;
use app\service\core\sys\CoreSysConfigService;

/**
 * 项目海报数据
 */
class TourismPoster
{
    /**
     * 项目海报
     * @param $data
     * @return array
     */
    public function handle($data)
    {
        $type = $data[ 'type' ];

        switch ($type){
            case 'tourism_hotel':
                //酒店
                $site_id = $data[ 'site_id' ];
                $param = $data[ 'param' ];
                $id = $param[ 'id' ] ?? 0;
                $member_id = $param[ 'member_id' ] ?? 0;
                $mode = $param[ 'mode' ] ?? '';

                if ($mode == 'preview') {
                    // 预览模式
                    $url_data = [
                        [ 'key' => 'id', 'value' => $id ]
                    ];
                    $return_data = [
                        'nickname' => '会员昵称',
                        'headimg' => 'static/resource/images/default_headimg.png',
                        'goods_name' => '酒店名称',
                        'price' => '￥369.00',
                        'goods_cover' => 'addon/tourism/goods_template.png',
                        'url' => [
                            'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                            'page' => 'addon/tourism/pages/hotel/detail',
                            'data' => $url_data,
                        ],
                    ];
                    return $return_data;
                }

                $info = (new Hotel())->where([ [ 'hotel_id', '=', $id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();

                if ($info->isEmpty()) return [];

                $goods_name = $info[ 'hotel_name' ];
                if (mb_strlen($goods_name, 'UTF-8') > 14) {
                    $goods_name = mb_substr($goods_name, 0, 14, 'UTF-8') . '...';
                }

                $goods_img = $info[ 'hotel_cover' ];

                if (empty($goods_img)) {
                    $goods_img = 'addon/tourism/goods_template.png';
                }
                $url_data = [
                    [ 'key' => 'id', 'value' => $id ]
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

                $goods = (new Goods())->where([ ['goods_type', '=', GoodsDict::ROOM], ['hotel_id', '=', $id], ['site_id', '=', $site_id] ])->field('price')->order('price asc')->findOrEmpty()->toArray();

                $return_data = [
                    'goods_name' => $goods_name,
                    'price' => '￥' . $goods['price'] ?? '0.00',
                    'goods_cover' => $goods_img,
                    'url' => [
                        'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                        'page' => 'addon/tourism/pages/hotel/detail',
                        'data' => $url_data,
                    ],
                ];

                if (!empty($member_info)) {
                    $return_data[ 'nickname' ] = mb_strlen($member_info[ 'nickname' ]) > 10 ? mb_substr($member_info[ 'nickname' ], 0, 7, 'utf-8') . '...' : $member_info[ 'nickname' ];
                    $return_data[ 'headimg' ] = $member_info[ 'headimg' ];
                }
                return $return_data;

                break;
            case 'tourism_scenic':

                //景点
                $site_id = $data[ 'site_id' ];
                $param = $data[ 'param' ];
                $id = $param[ 'scenic_id' ] ?? 0;
                $member_id = $param[ 'member_id' ] ?? 0;
                $mode = $param[ 'mode' ] ?? '';

                if ($mode == 'preview') {
                    // 预览模式
                    $url_data = [
                        [ 'key' => 'scenic_id', 'value' => $id ]
                    ];
                    $return_data = [
                        'nickname' => '会员昵称',
                        'headimg' => 'static/resource/images/default_headimg.png',
                        'goods_name' => '景点名称',
                        'price' => '￥369.00',
                        'goods_cover' => 'addon/tourism/goods_template.png',
                        'url' => [
                            'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                            'page' => 'addon/tourism/pages/scenic/detail',
                            'data' => $url_data,
                        ],
                    ];
                    return $return_data;
                }

                $info = (new Scenic())->where([ [ 'scenic_id', '=', $id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();

                if ($info->isEmpty()) return [];

                $goods_name = $info[ 'scenic_name' ];
                if (mb_strlen($goods_name, 'UTF-8') > 14) {
                    $goods_name = mb_substr($goods_name, 0, 14, 'UTF-8') . '...';
                }

                $goods_img = $info[ 'scenic_cover' ];

                if (empty($goods_img)) {
                    $goods_img = 'addon/tourism/goods_template.png';
                }
                $url_data = [
                    [ 'key' => 'scenic_id', 'value' => $id ]
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

                $goods = (new Goods())->where([ ['goods_type', '=', GoodsDict::SCENIC], ['scenic_id', '=', $id], ['site_id', '=', $site_id] ])->field('price')->order('price asc')->findOrEmpty()->toArray();

                $return_data = [
                    'goods_name' => $goods_name,
                    'price' => '￥' . $goods['price'] ?? '0.00',
                    'goods_cover' => $goods_img,
                    'url' => [
                        'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                        'page' => 'addon/tourism/pages/scenic/detail',
                        'data' => $url_data,
                    ],
                ];

                if (!empty($member_info)) {
                    $return_data[ 'nickname' ] = mb_strlen($member_info[ 'nickname' ]) > 10 ? mb_substr($member_info[ 'nickname' ], 0, 7, 'utf-8') . '...' : $member_info[ 'nickname' ];
                    $return_data[ 'headimg' ] = $member_info[ 'headimg' ];
                }

                return $return_data;

                break;
            case 'tourism_way':

                //线路
                $site_id = $data[ 'site_id' ];
                $param = $data[ 'param' ];
                $id = $param[ 'way_id' ] ?? 0;
                $member_id = $param[ 'member_id' ] ?? 0;
                $mode = $param[ 'mode' ] ?? '';

                if ($mode == 'preview') {
                    // 预览模式
                    $url_data = [
                        [ 'key' => 'way_id', 'value' => $id ]
                    ];
                    $return_data = [
                        'nickname' => '会员昵称',
                        'headimg' => 'static/resource/images/default_headimg.png',
                        'goods_name' => '线路名称',
                        'price' => '￥369.00',
                        'goods_cover' => 'addon/tourism/goods_template.png',
                        'url' => [
                            'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                            'page' => 'addon/tourism/pages/way/detail',
                            'data' => $url_data,
                        ],
                    ];
                    return $return_data;
                }

                $info = (new Way())->where([ [ 'way_id', '=', $id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();

                if ($info->isEmpty()) return [];

                $goods_name = $info[ 'way_name' ];
                if (mb_strlen($goods_name, 'UTF-8') > 14) {
                    $goods_name = mb_substr($goods_name, 0, 14, 'UTF-8') . '...';
                }


                $url_data = [
                    [ 'key' => 'way_id', 'value' => $id ]
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

                $goods = (new Goods())->where([ ['goods_type', '=', GoodsDict::WAY], ['way_id', '=', $id], ['site_id', '=', $site_id] ])->field('price,goods_cover')->order('price asc')->findOrEmpty()->toArray();

                $goods_img = $goods[ 'goods_cover' ];

                if (empty($goods_img)) {
                    $goods_img = 'addon/tourism/goods_template.png';
                }

                $return_data = [
                    'goods_name' => $goods_name,
                    'price' => '￥' . $goods['price'] ?? '0.00',
                    'goods_cover' => $goods_img,
                    'url' => [
                        'url' => ( new CoreSysConfigService() )->getSceneDomain($site_id)[ 'wap_url' ],
                        'page' => 'addon/tourism/pages/way/detail',
                        'data' => $url_data,
                    ],
                ];

                if (!empty($member_info)) {
                    $return_data[ 'nickname' ] = mb_strlen($member_info[ 'nickname' ]) > 10 ? mb_substr($member_info[ 'nickname' ], 0, 7, 'utf-8') . '...' : $member_info[ 'nickname' ];
                    $return_data[ 'headimg' ] = $member_info[ 'headimg' ];
                }

                return $return_data;


                break;

        }

    }
}
