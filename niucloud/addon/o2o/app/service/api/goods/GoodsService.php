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

namespace addon\o2o\app\service\api\goods;

use addon\o2o\app\dict\GoodsDict;
use addon\o2o\app\model\Goods;
use addon\o2o\app\model\GoodsSku;
use app\model\member\Member;
use core\base\BaseApiService;

/**
 * 商品服务层(项目)
 * Class GoodsService
 * @package addon\o2o\app\service\api\goods
 */
class GoodsService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 获取商品列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where = [])
    {

        $field = 'goods_id,site_id,goods_name,goods_cover,goods_image,goods_category,(sale_num + virtually_sale) as sale_num,status,sort,create_time,update_time,price,buy_type,member_discount';

        // 参数过滤
        if (!empty($where[ 'order' ]) && in_array($where[ 'order' ], [ 'sale_num', 'price' ])) {
            $order = $where[ 'order' ] . ' '.$where['sort'];
        } else {
            $order = 'sort desc,create_time desc';
        }
        $condition = [['site_id', '=', $this->site_id], ['status', '=', 1], ['is_delete', '=', 0]];
        if($where['goods_category']){
            $goods_category = (new GoodsCategoryService())->getChildId($where['goods_category']);
            $goods_category[] = $where[ 'goods_category' ];
            $condition[] = ['goods_category', 'in', $goods_category];
        }

        $search_model = $this->model->where($condition)->withSearch(["goods_name","create_time",'goods_ids'], $where)->field($field)->with(['category', 'goods_sku'])->order($order)->append(['cover_thumb_small','buy_type_name']);
        $list = $this->pageQuery($search_model);

        if (!empty($this->member_id)) {
            $member_info = $this->getMemberInfo();
            foreach ($list[ 'data' ] as $k => &$v) {
                if($v['buy_type'] == GoodsDict::BUY) $v[ 'goods_sku' ][ 'member_price' ] = $this->getMemberPrice($member_info, $v[ 'member_discount' ], $v[ 'goods_sku' ][ 'member_price' ], $v[ 'goods_sku' ][ 'price' ]);
            }
        }

        return $list;
    }

    /**
     * 获取商品信息
     * @param int $id
     * @return array
     */
    public function getInfo(int $id)
    {
        $field = 'goods_id,site_id,goods_name,goods_cover,goods_image,goods_category,(sale_num + virtually_sale) as sale_num,status,sort,create_time,update_time,price,buy_info,goods_content,price_list';

        $info = $this->model->field($field)->where([['goods_id', '=', $id], ['site_id', '=', $this->site_id], ['is_delete', '=', 0]])->with('category')->findOrEmpty()->append(['cover_thumb_small','image_thumb_small', 'sale_num'])->toArray();
        return $info;
    }

    /**
     * 获取商品详情
     * @param array $data
     * @return array
     */
    public function getDetail(array $data)
    {
        $sku_id = $data[ 'sku_id' ];
        $goods_id = $data[ 'goods_id' ];

        $goods_sku_model = new GoodsSku();

        if (empty($sku_id) && !empty($goods_id)) {
            $default_sku_info = $goods_sku_model->where([ [ 'goods_id', '=', $goods_id ], [ 'site_id', '=', $this->site_id ] ], 'sku_id')
                ->field('sku_id')->findOrEmpty()->toArray();
            if (!empty($default_sku_info)) {
                $sku_id = $default_sku_info[ 'sku_id' ];
            }
        }

        $field = 'sku_id, sku_name, sku_image, sku_no, goods_id, site_id, price, sku_unit,min_buy, is_default, member_price';

        $info = $goods_sku_model->where([ [ 'sku_id', '=', $sku_id ], [ 'site_id', '=', $this->site_id ] ])
            ->field($field)
            ->with([
                'goods',
                'skuList' => function($query) {
                    $query->field('sku_id, sku_name, sku_image, sku_no, goods_id, site_id, price, sku_unit,min_buy, is_default, member_price');
                }
            ])
            ->append([ 'sku_image_thumb_small', 'sku_image_thumb_mid', 'sku_image_thumb_big' ])
            ->findOrEmpty()->toArray();

        if (!empty($this->member_id) && $info[ 'goods' ]['buy_type'] == GoodsDict::BUY) {

            // 查询会员价
            $member_info = $this->getMemberInfo();
            $info[ 'member_price' ] = $this->getMemberPrice($member_info, $info[ 'goods' ][ 'member_discount' ], $info[ 'member_price' ], $info[ 'price' ]);

            $this->getMemberPriceByList($member_info, $info[ 'goods' ][ 'member_discount' ], $info[ 'skuList' ]);

        } else {
            $info[ 'member_price' ] = $info[ 'price' ];
            foreach ($info[ 'skuList' ] as &$v) {
                $v[ 'member_price' ] = $info[ 'price' ];
            }
        }

        return $info;
    }

    /**
     * 获取商品列表(service)
     * @param array $where
     * @return array
     */
    public function getList(array $data)
    {

        $field = 'goods_id,site_id,goods_name,goods_cover,goods_image,goods_category,(sale_num + virtually_sale) as sale_num,status,sort,create_time,update_time,price';
        $order = 'create_time desc';

        $list = $this->model->where([['site_id', '=', $this->site_id], ['status', '=', 1], ['is_delete', '=', 0]])->field($field)->with('category')->order($order)->append(['cover_thumb_small'])->select()->toArray();
        return $list;
    }

    /**
     * 获取商品列表供组件调用
     * @param array $where
     * @return array
     */
    public function getGoodsComponents(array $where = [])
    {
        $field = 'goods_id,site_id,goods_name,goods_category,goods_cover,status,sale_num + goods.virtually_sale as sale_num, price,buy_type,price_list,member_discount';

        $sku_where = [
            [ 'goodsSku.is_default', '=', 1 ],
            [ 'goodsSku.site_id', '=', $this->site_id ],
            [ 'is_delete', '=', 0 ],
            [ 'status', '=', 1 ]
        ];

        if (!empty($where[ 'goods_ids' ])) {
            $sku_where[] = [ 'goods.goods_id', 'in', $where[ 'goods_ids' ] ];
        }

        // 参数过滤
        if (!empty($where[ 'order' ]) && in_array($where[ 'order' ], [ 'sale_num', 'price' ])) {
            $order = $where[ 'order' ] . ' desc';
        } else {
            $order = 'sort desc,create_time desc';
        }

        $list = $this->model
            ->withSearch([ "goods_category"], $where)
            ->field($field)
            ->withJoin([ 'goodsSku' ])
            ->where($sku_where)->order($order)->append([ 'cover_thumb_small', 'cover_thumb_mid', 'buy_type_name'])
            ->limit($where[ 'num' ])
            ->select()->toArray();

        if (!empty($this->member_id)) {
            $member_info = $this->getMemberInfo();
            foreach ($list as $k => &$v) {
                if($v['buy_type'] == GoodsDict::BUY) $v[ 'goodsSku' ][ 'member_price' ] = $this->getMemberPrice($member_info, $v[ 'member_discount' ], $v[ 'goodsSku' ][ 'member_price' ], $v[ 'goodsSku' ][ 'price' ]);
            }
        }

        return $list;
    }


    public function getMemberInfo()
    {
        $member_model = new Member();
        $member_field = 'member_level';
        $member_info = $member_model->where([
            [ 'site_id', '=', $this->site_id ],
            [ 'member_id', '=', $this->member_id ]
        ])->field($member_field)
            ->with([
                // 会员等级
                'memberLevelData' => function($query) {
                    $query->field('level_id, site_id, level_name, status, level_benefits, level_gifts');
                },
            ])
            ->findOrEmpty()->toArray();
        return $member_info;
    }

    /**
     * 查询商品的会员价
     * @param $member_info
     * @param string $member_discount 会员等级折扣，不参与：空，会员折扣：discount，指定会员价：fixed_price
     * @param string $member_price 会员价，json格式，指定会员价，数据结构为：{"level_12":"92.00","level_13":"72.00","level_14":"66.00","level_15":"45.00"}
     * @param $price
     * @return int|string
     */
    public function getMemberPrice($member_info, $member_discount, $member_price, $price)
    {
        if (empty($member_discount)) {
            return $price;
        }

        // 未找到会员，排除
        if (empty($member_info)) {
            return $price;
        }

        // 没有会员等级，排除
        if (!empty($member_info) && empty($member_info[ 'member_level' ])) {
            return $price;
        }

        if ($member_discount == 'discount') {
            // 按照会员等级折扣计算

            // 默认按会员享受折扣计算
            if (!empty($member_info[ 'memberLevelData' ][ 'level_benefits' ])
                && !empty($member_info[ 'memberLevelData' ][ 'level_benefits' ][ 'discount' ])
                && !empty($member_info[ 'memberLevelData' ][ 'level_benefits' ][ 'discount' ][ 'is_use' ])) {

                $price = number_format($price * $member_info[ 'memberLevelData' ][ 'level_benefits' ][ 'discount' ][ 'discount' ] / 10, 2, '.', '');
            }

        } elseif ($member_discount == 'fixed_price') {
            // 指定会员价
            if (!empty($member_price)) {
                $member_price = json_decode($member_price, true);
                if (!empty($member_price[ 'level_' . $member_info[ 'member_level' ] ])) {
                    $member_level_price = $member_price[ 'level_' . $member_info[ 'member_level' ] ];
                    $price = number_format($member_level_price, 2, '.', '');
                }
            }
        }

        return $price;

    }

    /**
     * 查询商品的会员价
     * @param $member_info
     * @param string $member_discount 会员等级折扣，不参与：空，会员折扣：discount，指定会员价：fixed_price
     * @param $sku_list
     * @return int
     */
    public function getMemberPriceByList($member_info, $member_discount, &$sku_list)
    {

        // 是否按照原价返回
        $is_default = false;

        if (empty($member_discount)) {
            $is_default = true;
        }

        // 未找到会员，排除
        if (empty($member_info)) {
            $is_default = true;
        }

        // 没有会员等级，排除
        if (!empty($member_info) && empty($member_info[ 'member_level' ])) {
            $is_default = true;
        }

        foreach ($sku_list as $k => &$v) {

            if ($is_default) {
                $v[ 'member_price' ] = $v[ 'price' ];
            } else {
                if ($member_discount == 'discount') {
                    // 按照会员等级折扣计算

                    // 默认按会员享受折扣计算
                    if (!empty($member_info[ 'memberLevelData' ][ 'level_benefits' ])
                        && !empty($member_info[ 'memberLevelData' ][ 'level_benefits' ][ 'discount' ])
                        && !empty($member_info[ 'memberLevelData' ][ 'level_benefits' ][ 'discount' ][ 'is_use' ])) {
                        $v[ 'member_price' ] = number_format($v[ 'price' ] * $member_info[ 'memberLevelData' ][ 'level_benefits' ][ 'discount' ][ 'discount' ] / 10, 2, '.', '');
                    } else {
                        $v[ 'member_price' ] = $v[ 'price' ];
                    }

                } elseif ($member_discount == 'fixed_price') {
                    // 指定会员价
                    if (!empty($v[ 'member_price' ])) {
                        $member_price = json_decode($v[ 'member_price' ], true); // 会员价，json格式，指定会员价
                        if (!empty($member_price[ 'level_' . $member_info[ 'member_level' ] ])) {
                            $member_level_price = $member_price[ 'level_' . $member_info[ 'member_level' ] ];
                            $v[ 'member_price' ] = number_format($member_level_price, 2, '.', '');
                        } else {
                            $v[ 'member_price' ] = $v[ 'price' ];
                        }
                    }
                }
            }
        }

        return $sku_list;

    }

}
