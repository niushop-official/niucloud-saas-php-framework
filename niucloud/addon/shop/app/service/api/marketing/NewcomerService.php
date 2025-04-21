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

namespace addon\shop\app\service\api\marketing;

use addon\shop\app\dict\active\ActiveDict;
use addon\shop\app\model\active\Active;
use addon\shop\app\model\active\ActiveGoods;
use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\goods\GoodsSku;
use addon\shop\app\model\newcomer\NewcomerRecords;
use addon\shop\app\service\core\marketing\CoreNewcomerService;
use core\base\BaseApiService;
use think\db\Query;

/**
 * 新人专享服务层
 * Class DiscountService
 * @package addon\shop\app\service\api\marketing
 */
class NewcomerService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Active();
    }

    /**
     * 新人专享商品列表
     * @param array $where
     * @return array
     */
    public function getGoodsPage(array $where = [])
    {
        $active_goods_model = new ActiveGoods();
        $active_goods = $active_goods_model->field('goods_id,sku_id,active_goods_value')->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'active_class', '=', ActiveDict::NEWCOMER_DISCOUNT ],
            [ 'active_goods_status', '=', ActiveDict::ACTIVE ]
        ])->select()->toArray();
        $active_goods_ids = array_unique(array_column($active_goods, 'goods_id'));
        $active_sku_ids = array_column($active_goods, 'sku_id');
        $active_goods = array_column($active_goods, null, 'sku_id');

        $field = 'site_id,goods_id,goods_name,goods_type,goods_cover,unit,sale_num + goods.virtual_sale_num as sale_num';

        $sku_where = [
            [ 'goods.site_id', '=', $this->site_id ],
            [ 'status', '=', 1 ],
            [ 'goodsSku.is_default', '=', 1 ],
            [ 'goods.goods_id', 'in', $active_goods_ids ]
        ];

        if (!empty($where[ 'keyword' ])) {
            $sku_where[] = [ 'goods_name|sub_title', 'like', '%' . $where[ 'keyword' ] . '%' ];
        }

        // 参数过滤
        if (!empty($where[ 'order' ]) && in_array($where[ 'order' ], [ 'sale_num', 'sale_price' ])) {
            $order = $where[ 'order' ] . ' ' . $where[ 'sort' ];
        } else {
            $order = 'sort desc,create_time desc';
        }

        $search_model = ( new Goods() )
            ->withSearch([ "brand_id", "goods_category" ], $where)
            ->field($field)
            ->withJoin([
                'goodsSku' => [ 'sku_id', 'sku_name', 'sku_image', 'goods_id', 'sku_spec_format', 'price', 'sale_price' ]
            ])
            ->with([
                'skuList' => function(Query $query) use ($active_sku_ids) {
                    $query->where([ [ 'sku_id', 'in', $active_sku_ids ] ]);
                }
            ])
            ->where($sku_where)->order($order)->append([ 'goods_cover_thumb_mid' ]);
        $list = $this->pageQuery($search_model);

        foreach ($list[ 'data' ] as &$item) {
            if (!empty($item[ 'skuList' ]) && !empty($active_goods) && !empty($active_sku_ids)) {
                foreach ($item[ 'skuList' ] as &$sku_item) {
                    $active_goods_value = json_decode($active_goods[ $sku_item[ 'sku_id' ] ][ 'active_goods_value' ], true);
                    $sku_item[ 'newcomer_price' ] = $active_goods_value[ 'newcomer_price' ] ?? 0;
                }
                if (!empty($item[ 'goodsSku' ])) {
                    if (in_array($item[ 'goodsSku' ][ 'sku_id' ], $active_sku_ids)) {
                        $active_goods_value = json_decode($active_goods[ $item[ 'goodsSku' ][ 'sku_id' ] ][ 'active_goods_value' ], true);
                        $item[ 'goodsSku' ][ 'newcomer_price' ] = $active_goods_value[ 'newcomer_price' ] ?? 0;
                    } else {
                        $item[ 'goodsSku' ] = $item[ 'skuList' ][ 0 ];
                    }
                }
            }
        }

        $newcomerRecords = ( new NewcomerRecords() )->field('validity_time,is_join')->where([ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $this->member_id ] ])->findOrEmpty()->toArray();
        $list[ 'validity_time' ] = !empty($newcomerRecords) ? $newcomerRecords[ 'validity_time' ] : 0;
        $list[ 'is_join' ] = !empty($newcomerRecords) ? $newcomerRecords[ 'is_join' ] : 0; // 是否参与过新人专享活动

        return $list;
    }

    public function getComponentsList($data)
    {
        $active_goods_model = new ActiveGoods();
        $active_goods = $active_goods_model->field('goods_id,sku_id,active_goods_value')->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'active_class', '=', ActiveDict::NEWCOMER_DISCOUNT ],
            [ 'active_goods_status', '=', ActiveDict::ACTIVE ]
        ])->select()->toArray();

        if (!empty($active_goods)) {
            $active_sku_ids = array_unique(array_column($active_goods, 'sku_id'));
            $active_goods = array_column($active_goods, null, 'sku_id');

            if (!empty($data[ 'sku_ids' ])) {
                $sku_ids = $data[ 'sku_ids' ];
            } else {
                $sku_ids = $active_sku_ids;
            }
            $limit = $data[ 'limit' ] ?? 0;

            foreach ($sku_ids as $sku_id) {
                if (!in_array($sku_id, $active_sku_ids)) unset($sku_id);
            }
            $sku_ids = array_values($sku_ids);

            $field = 'site_id,sku_id,goods_id,sku_name,sku_image,price,sale_price';
            $sku_where = [
                [ 'goods_sku.site_id', '=', $this->site_id ],
                [ 'goods.status', '=', 1 ],
                [ 'goods_sku.sku_id', 'in', $sku_ids ]
            ];
            $order = 'goods_sku.sale_num desc,goods_sku.stock desc';

            $list = ( new GoodsSku() )->field($field)->withJoin([ 'goods' => [ 'goods_name' ] ])->where($sku_where)->limit($limit)->order($order)->select()->toArray();
            foreach ($list as &$item) {
                $active_goods_value = json_decode($active_goods[ $item[ 'sku_id' ] ][ 'active_goods_value' ], true);
                $item[ 'newcomer_price' ] = $active_goods_value[ 'newcomer_price' ] ?? 0;
            }

            $newcomerRecords = ( new NewcomerRecords() )->field('validity_time,is_join')->where([ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $this->member_id ] ])->findOrEmpty()->toArray();
            $validity_time = !empty($newcomerRecords) ? $newcomerRecords[ 'validity_time' ] : 0;
            $is_join = !empty($newcomerRecords) ? $newcomerRecords[ 'is_join' ] : 0; // 是否参与过新人专享活动

            return [
                'goods_list' => $list,
                'validity_time' => $validity_time,
                'is_join' => $is_join
            ];
        } else {
            return [
                'goods_list' => [],
                'validity_time' => 0,
                'is_join' => 0
            ];
        }
    }

    /**
     * 查询商品详情新人专享信息
     * @param $goods_id
     * @param $sku_id
     * @return array
     */
    public function getNewcomerInfo($goods_id, $sku_id)
    {
        $active_goods_model = new ActiveGoods();
        $active_goods = $active_goods_model->field('active_id,active_goods_value')->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'active_goods_status', '=', ActiveDict::ACTIVE ],
            [ 'active_goods_type', '=', ActiveDict::GOODS_SINGLE ],
            [ 'active_class', '=', ActiveDict::NEWCOMER_DISCOUNT ],
            [ 'goods_id', '=', $goods_id ],
            [ 'sku_id', '=', $sku_id ]
        ])->with([
            'active' => function($query) {
                $query->field('active_id,active_desc,active_value');
            }
        ])->findOrEmpty()->toArray();

        if (empty($active_goods)) return [];

        $info[ 'newcomer_price' ] = json_decode($active_goods[ 'active_goods_value' ], true)[ 'newcomer_price' ] ?? 0;
        $info[ 'newcomer_desc' ] = $active_goods[ 'active' ][ 'active_desc' ] ?? '';
        $info[ 'limit_num' ] = $active_goods[ 'active' ][ 'active_value' ][ 'limit_num' ] ?? '';
        return $info;

    }

    /**
     * 查询商品规格的新人价
     * @param $sku_list
     * @return array
     */
    public function getNewcomerPriceByList(&$sku_list)
    {
        $active_goods_model = new ActiveGoods();
        foreach ($sku_list as &$v) {
            $active_goods = $active_goods_model->field('active_goods_value')->where([
                [ 'site_id', '=', $this->site_id ],
                [ 'active_goods_status', '=', ActiveDict::ACTIVE ],
                [ 'active_goods_type', '=', ActiveDict::GOODS_SINGLE ],
                [ 'active_class', '=', ActiveDict::NEWCOMER_DISCOUNT ],
                [ 'goods_id', '=', $v[ 'goods_id' ] ],
                [ 'sku_id', '=', $v[ 'sku_id' ] ]
            ])->findOrEmpty()->toArray();

            if (empty($active_goods)) {
                $v[ 'newcomer_price' ] = $v[ 'price' ];
                $v[ 'is_newcomer' ] = 0;
            } else {
                $v[ 'newcomer_price' ] = json_decode($active_goods[ 'active_goods_value' ], true)[ 'newcomer_price' ] ?? 0;
                $v[ 'is_newcomer' ] = 1;
            }
        }
        return $sku_list;
    }

    /**
     * 检测当前会员是否满足新人专享活动条件
     * @return bool
     */
    public function checkIfNewcomer()
    {
        return ( new CoreNewcomerService() )->checkIfNewcomer($this->site_id, $this->member_id);
    }

    /**
     * 获取新人专享活动配置
     * @return array
     */
    public function getConfig()
    {
        return ( new CoreNewcomerService() )->getConfig($this->site_id);
    }

}
