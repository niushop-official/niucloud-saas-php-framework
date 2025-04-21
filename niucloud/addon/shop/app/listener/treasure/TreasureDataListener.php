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

namespace addon\shop\app\listener\treasure;

use addon\shop\app\model\goods\Goods;

/**
 * 宝贝数据查询
 * Class GoodsTreasureDataListener
 * @package addon\shop\app\listener\treasure
 */
class TreasureDataListener
{

    public function handle($params)
    {
        $relate_type = $params[ 'relate_type' ] ?? '';
        if ($relate_type == 'shop') {
            $field = 'site_id,goods_id,goods_name,sub_title,goods_cover';
            $order = 'sort asc, create_time desc';
            $sku_where = [
                [ 'goods.site_id', '=', $params[ 'site_id' ] ],
                [ 'goodsSku.is_default', '=', 1 ],
                [ 'status', '=', 1 ],
                [ 'is_gift', '=', 0 ]
            ];
            if (!empty($params[ 'where' ][ 'keyword' ])) {
                $sku_where[] = [ 'goods_name|sub_title', 'like', '%' . $params[ 'where' ][ 'keyword' ] . '%' ];
            }
            if (!empty($params[ 'where' ][ 'relate_ids' ])) {
                $sku_where[] = [ 'goods.goods_id', 'in', $params[ 'where' ][ 'relate_ids' ] ];
            }
            if (!empty($params[ 'where' ][ 'join_ids' ])) {
                $sku_where[] = [ 'goods.goods_id', 'not in', $params[ 'where' ][ 'join_ids' ] ];
            }
            $search_model = ( new Goods() )->field($field)
                ->withJoin([
                    'goodsSku' => [ 'goods_id', 'sku_name', 'price' ]
                ])->where($sku_where)->order($order)->append([ 'goods_cover_thumb_mid' ]);
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
                        $data[ $k ][ 'treasure_name' ] = $v[ 'goods_name' ]; // 宝贝名称
                        $data[ $k ][ 'treasure_sub_name' ] = $v[ 'sub_title' ]; // 宝贝副标题
                        $data[ $k ][ 'treasure_image' ] = empty($v[ 'goods_cover_thumb_mid' ]) ? $v[ 'goods_cover' ] : $v[ 'goods_cover_thumb_mid' ]; // 宝贝图片
                        $data[ $k ][ 'treasure_price' ] = $v[ 'goodsSku' ][ 'price' ]; // 宝贝价格
                        $data[ $k ][ 'treasure_url' ] = '/addon/shop/pages/goods/detail?goods_id=' . $v[ 'goods_id' ]; // 宝贝跳转链接
                        $data[ $k ][ 'relate_id' ] = $v[ 'goods_id' ]; // 关联业务id
                        $data[ $k ][ 'relate_type' ] = 'shop'; // 关联业务类型
                    }
                    $list[ 'data' ] = $data;
                }
                $treasure_list = $list;
            } else {
                $list = $search_model->select()->toArray();
                foreach ($list as $k => $v) {
                    $treasure_list[ $k ][ 'site_id' ] = $v[ 'site_id' ]; // 站点id
                    $treasure_list[ $k ][ 'treasure_name' ] = $v[ 'goods_name' ]; // 宝贝名称
                    $treasure_list[ $k ][ 'treasure_sub_name' ] = $v[ 'sub_title' ]; // 宝贝副标题
                    $treasure_list[ $k ][ 'treasure_image' ] = empty($v[ 'goods_cover_thumb_mid' ]) ? $v[ 'goods_cover' ] : $v[ 'goods_cover_thumb_mid' ]; // 宝贝图片
                    $treasure_list[ $k ][ 'treasure_price' ] = $v[ 'goodsSku' ][ 'price' ]; // 宝贝价格
                    $treasure_list[ $k ][ 'treasure_url' ] = '/addon/shop/pages/goods/detail?goods_id=' . $v[ 'goods_id' ]; // 宝贝跳转链接
                    $treasure_list[ $k ][ 'relate_id' ] = $v[ 'goods_id' ]; // 关联业务id
                    $treasure_list[ $k ][ 'relate_type' ] = 'shop'; // 关联业务类型
                }
            }
            return $treasure_list;
        }
    }
}
