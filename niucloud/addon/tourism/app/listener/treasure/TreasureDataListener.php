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

namespace addon\tourism\app\listener\treasure;

use addon\tourism\app\model\Hotel;
use addon\tourism\app\model\Scenic;
use addon\tourism\app\model\Way;

/**
 * 宝贝数据查询
 * Class TreasureDataListener
 * @package addon\tourism\app\listener\treasure
 */
class TreasureDataListener
{

    public function handle($params)
    {
        $relate_type = $params[ 'relate_type' ] ?? '';
        if ($relate_type == 'hotel') {
            $field = 'site_id,hotel_id,hotel_name,hotel_cover';
            $order = 'create_time desc';
            $sku_where = [
                [ 'site_id', '=', $params[ 'site_id' ] ],
                [ 'hotel_status', '=', 1 ]
            ];
            if (!empty($params[ 'where' ][ 'keyword' ])) {
                $sku_where[] = [ 'hotel_name', 'like', '%' . $params[ 'where' ][ 'keyword' ] . '%' ];
            }
            if (!empty($params[ 'where' ][ 'relate_ids' ])) {
                $sku_where[] = [ 'hotel_id', 'in', $params[ 'where' ][ 'relate_ids' ] ];
            }
            if (!empty($params[ 'where' ][ 'join_ids' ])) {
                $sku_where[] = [ 'hotel_id', 'not in', $params[ 'where' ][ 'join_ids' ] ];
            }
            $search_model = ( new Hotel() )->field($field)
                ->with([ "goods" => function($query) {
                    $query->field('hotel_id,goods_name,price')->where([ [ 'is_default', '=', 1 ] ]);
                } ])->where($sku_where)->order($order)->append([ 'cover_thumb_mid' ]);
            $treasure_list = [];
            if (!empty($params[ 'page' ])) {
                $list = $search_model->paginate([
                    'list_rows' => $params[ 'page' ][ 'limit' ],
                    'page' => $params[ 'page' ][ 'page' ],
                ])->toArray();
                if (!empty($list[ 'data' ])) {
                    $data = [];
                    foreach ($list[ 'data' ] as $k => $v) {
                        $data[ $k ][ 'site_id' ] = $v[ 'site_id' ]; // 站点id
                        $data[ $k ][ 'treasure_name' ] = $v[ 'hotel_name' ]; // 宝贝名称
                        $data[ $k ][ 'treasure_sub_name' ] = ''; // 宝贝副标题
                        $data[ $k ][ 'treasure_image' ] = empty($v[ 'cover_thumb_mid' ]) ? $v[ 'hotel_cover' ] : $v[ 'cover_thumb_mid' ]; // 宝贝图片
                        $data[ $k ][ 'treasure_price' ] = $v[ 'goods' ][ 'price' ] ?? 0; // 宝贝价格
                        $data[ $k ][ 'treasure_url' ] = '/addon/tourism/pages/hotel/detail?id=' . $v[ 'hotel_id' ]; // 宝贝跳转链接
                        $data[ $k ][ 'relate_id' ] = $v[ 'hotel_id' ]; // 关联业务id
                        $data[ $k ][ 'relate_type' ] = 'hotel'; // 关联业务类型
                    }
                    $list[ 'data' ] = $data;
                }
                $treasure_list = $list;
            } else {
                $list = $search_model->select()->toArray();
                foreach ($list as $k => $v) {
                    $treasure_list[ $k ][ 'site_id' ] = $v[ 'site_id' ]; // 站点id
                    $treasure_list[ $k ][ 'treasure_name' ] = $v[ 'hotel_name' ]; // 宝贝名称
                    $treasure_list[ $k ][ 'treasure_sub_name' ] = ''; // 宝贝副标题
                    $treasure_list[ $k ][ 'treasure_image' ] = empty($v[ 'cover_thumb_mid' ]) ? $v[ 'hotel_cover' ] : $v[ 'cover_thumb_mid' ]; // 宝贝图片
                    $treasure_list[ $k ][ 'treasure_price' ] = $v[ 'goods' ][ 'price' ] ?? 0; // 宝贝价格
                    $treasure_list[ $k ][ 'treasure_url' ] = '/addon/tourism/pages/hotel/detail?id=' . $v[ 'hotel_id' ]; // 宝贝跳转链接
                    $treasure_list[ $k ][ 'relate_id' ] = $v[ 'hotel_id' ]; // 关联业务id
                    $treasure_list[ $k ][ 'relate_type' ] = 'hotel'; // 关联业务类型
                }
            }
            return $treasure_list;
        } elseif ($relate_type == 'scenic') {
            $field = 'site_id,scenic_id,scenic_name,scenic_cover';
            $order = 'create_time desc';
            $sku_where = [
                [ 'site_id', '=', $params[ 'site_id' ] ],
                [ 'scenic_status', '=', 1 ]
            ];
            if (!empty($params[ 'where' ][ 'keyword' ])) {
                $sku_where[] = [ 'scenic_name', 'like', '%' . $params[ 'where' ][ 'keyword' ] . '%' ];
            }
            if (!empty($params[ 'where' ][ 'relate_ids' ])) {
                $sku_where[] = [ 'scenic_id', 'in', $params[ 'where' ][ 'relate_ids' ] ];
            }
            if (!empty($params[ 'where' ][ 'join_ids' ])) {
                $sku_where[] = [ 'scenic_id', 'not in', $params[ 'where' ][ 'join_ids' ] ];
            }
            $search_model = ( new Scenic() )->field($field)
                ->with([ "goods" => function($query) {
                    $query->field('scenic_id,goods_name,price')->where([ [ 'is_default', '=', 1 ] ]);
                } ])->where($sku_where)->order($order)->append([ 'cover_thumb_mid' ]);
            $treasure_list = [];
            if (!empty($params[ 'page' ])) {
                $list = $search_model->paginate([
                    'list_rows' => $params[ 'page' ][ 'limit' ],
                    'page' => $params[ 'page' ][ 'page' ],
                ])->toArray();
                if (!empty($list[ 'data' ])) {
                    $data = [];
                    foreach ($list[ 'data' ] as $k => $v) {
                        $data[ $k ][ 'site_id' ] = $v[ 'site_id' ]; // 站点id
                        $data[ $k ][ 'treasure_name' ] = $v[ 'scenic_name' ]; // 宝贝名称
                        $data[ $k ][ 'treasure_sub_name' ] = ''; // 宝贝副标题
                        $data[ $k ][ 'treasure_image' ] = empty($v[ 'cover_thumb_mid' ]) ? $v[ 'scenic_cover' ] : $v[ 'cover_thumb_mid' ]; // 宝贝图片
                        $data[ $k ][ 'treasure_price' ] = $v[ 'goods' ][ 'price' ] ?? 0; // 宝贝价格
                        $data[ $k ][ 'treasure_url' ] = '/addon/tourism/pages/scenic/detail?scenic_id=' . $v[ 'scenic_id' ]; // 宝贝跳转链接
                        $data[ $k ][ 'relate_id' ] = $v[ 'scenic_id' ]; // 关联业务id
                        $data[ $k ][ 'relate_type' ] = 'scenic'; // 关联业务类型
                    }
                    $list[ 'data' ] = $data;
                }
                $treasure_list = $list;
            } else {
                $list = $search_model->select()->toArray();
                foreach ($list as $k => $v) {
                    $treasure_list[ $k ][ 'site_id' ] = $v[ 'site_id' ]; // 站点id
                    $treasure_list[ $k ][ 'treasure_name' ] = $v[ 'scenic_name' ]; // 宝贝名称
                    $treasure_list[ $k ][ 'treasure_sub_name' ] = ''; // 宝贝副标题
                    $treasure_list[ $k ][ 'treasure_image' ] = empty($v[ 'cover_thumb_mid' ]) ? $v[ 'scenic_cover' ] : $v[ 'cover_thumb_mid' ]; // 宝贝图片
                    $treasure_list[ $k ][ 'treasure_price' ] = $v[ 'goods' ][ 'price' ] ?? 0; // 宝贝价格
                    $treasure_list[ $k ][ 'treasure_url' ] = '/addon/tourism/pages/scenic/detail?scenic_id=' . $v[ 'scenic_id' ]; // 宝贝跳转链接
                    $treasure_list[ $k ][ 'relate_id' ] = $v[ 'scenic_id' ]; // 关联业务id
                    $treasure_list[ $k ][ 'relate_type' ] = 'scenic'; // 关联业务类型
                }
            }
            return $treasure_list;
        } elseif ($relate_type == 'way') {
            $field = 'site_id,way_id,way_name,way_cover';
            $order = 'create_time desc';
            $sku_where = [
                [ 'site_id', '=', $params[ 'site_id' ] ],
                [ 'way_status', '=', 1 ]
            ];
            if (!empty($params[ 'where' ][ 'keyword' ])) {
                $sku_where[] = [ 'way_name', 'like', '%' . $params[ 'where' ][ 'keyword' ] . '%' ];
            }
            if (!empty($params[ 'where' ][ 'relate_ids' ])) {
                $sku_where[] = [ 'way_id', 'in', $params[ 'where' ][ 'relate_ids' ] ];
            }
            if (!empty($params[ 'where' ][ 'join_ids' ])) {
                $sku_where[] = [ 'way_id', 'not in', $params[ 'where' ][ 'join_ids' ] ];
            }
            $search_model = ( new Way() )->field($field)
                ->with([ "goods" => function($query) {
                    $query->field('way_id,goods_name,price');
                } ])->where($sku_where)->order($order)->append([ 'cover_thumb_mid' ]);
            $treasure_list = [];
            if (!empty($params[ 'page' ])) {
                $list = $search_model->paginate([
                    'list_rows' => $params[ 'page' ][ 'limit' ],
                    'page' => $params[ 'page' ][ 'page' ],
                ])->toArray();
                if (!empty($list[ 'data' ])) {
                    $data = [];
                    foreach ($list[ 'data' ] as $k => $v) {
                        $data[ $k ][ 'site_id' ] = $v[ 'site_id' ]; // 站点id
                        $data[ $k ][ 'treasure_name' ] = $v[ 'way_name' ]; // 宝贝名称
                        $data[ $k ][ 'treasure_sub_name' ] = ''; // 宝贝副标题
                        $data[ $k ][ 'treasure_image' ] = empty($v[ 'cover_thumb_mid' ]) ? $v[ 'way_cover' ] : $v[ 'cover_thumb_mid' ]; // 宝贝图片
                        $data[ $k ][ 'treasure_price' ] = $v[ 'goods' ][ 'price' ] ?? 0; // 宝贝价格
                        $data[ $k ][ 'treasure_url' ] = '/addon/tourism/pages/way/detail?way_id=' . $v[ 'way_id' ]; // 宝贝跳转链接
                        $data[ $k ][ 'relate_id' ] = $v[ 'way_id' ]; // 关联业务id
                        $data[ $k ][ 'relate_type' ] = 'way'; // 关联业务类型
                    }
                    $list[ 'data' ] = $data;
                }
                $treasure_list = $list;
            } else {
                $list = $search_model->select()->toArray();
                foreach ($list as $k => $v) {
                    $treasure_list[ $k ][ 'site_id' ] = $v[ 'site_id' ]; // 站点id
                    $treasure_list[ $k ][ 'treasure_name' ] = $v[ 'way_name' ]; // 宝贝名称
                    $treasure_list[ $k ][ 'treasure_sub_name' ] = ''; // 宝贝副标题
                    $treasure_list[ $k ][ 'treasure_image' ] = empty($v[ 'cover_thumb_mid' ]) ? $v[ 'way_cover' ] : $v[ 'cover_thumb_mid' ]; // 宝贝图片
                    $treasure_list[ $k ][ 'treasure_price' ] = $v[ 'goods' ][ 'price' ] ?? 0; // 宝贝价格
                    $treasure_list[ $k ][ 'treasure_url' ] = '/addon/tourism/pages/way/detail?way_id=' . $v[ 'way_id' ]; // 宝贝跳转链接
                    $treasure_list[ $k ][ 'relate_id' ] = $v[ 'way_id' ]; // 关联业务id
                    $treasure_list[ $k ][ 'relate_type' ] = 'way'; // 关联业务类型
                }
            }
            return $treasure_list;
        }
    }
}
