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

namespace addon\shop_fenxiao\app\service\api\fenxiao;

use addon\shop\app\service\core\goods\CoreGoodsConfigService;
use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoGoodsDict;
use addon\shop_fenxiao\app\model\fenxiao\Goods;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoConfigService;
use core\base\BaseApiService;
use addon\shop_fenxiao\app\model\fenxiao\Fenxiao;

/**
 * 分销商品服务层
 */
class FenxiaoGoodsService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();

    }

    /**
     * 获取分销商品列表
     * @param array $where
     * @return array
     */
    public function getPageOfShare(array $where = [])
    {
        $field = 'site_id,goods_id,goods_name,sub_title,goods_category,goods_type,goods_cover,unit,status,sale_num + goods.virtual_sale_num as sale_num';

        $sku_where = [
            [ 'goodsSku.is_default', '=', 1 ],
            [ 'goods.site_id', '=', $this->site_id ],
            [ 'goods.is_gift', '=', FenxiaoGoodsDict::NOT_IS_GIFT ],
            [ 'status', '=', 1 ]
        ];
        // 参数过滤
        if (!empty($where[ 'order' ]) && in_array($where[ 'order' ], [ 'sale_num', 'price' ])) {
            $order = $where[ 'order' ] . ' desc';
        } else {
            $sort_config = ( new CoreGoodsConfigService() )->getSortConfig($this->site_id);
            if ($sort_config[ 'sort_column' ] == 'sale_price') {
                $sort_config[ 'sort_column' ] = 'goodsSku.sale_price';
            }
            $order = $sort_config[ 'sort_column' ] . ' ' . $sort_config[ 'sort_type' ];
        }
        $search_model = $this->model
            ->withSearch([ "goods_category", "label_ids", 'service_ids' ], $where)
            ->field($field)
            ->withJoin(
                [
                    'goodsSku',
                    'fenxiaoGoods' => function ($query) {
                        $query->where([ [ 'fenxiaoGoods.is_fenxiao', '=', 1 ] ]);
                    }

                ])
            ->with([ 'fenxiaoGoodsRule' ])
            ->where($sku_where)->order($order)->append([ 'goods_type_name', 'goods_cover_thumb_small', 'goods_cover_thumb_mid' ]);

        //获取当前是否登录会员,登录会员是否是分销商
        $fenxiao_level_rate = 0;
        $fenxiao_level = 0;
        if ($this->member_id > 0) {
            $fenxiao_model = new Fenxiao();
            $fenxiao = $fenxiao_model->where([ [ 'member_id', '=', $this->member_id ], [ 'site_id', '=', $this->site_id ] ])->with([ 'fenxiao_level' ])->findOrEmpty();
            if (!$fenxiao->isEmpty()) {
                $fenxiao_level = $fenxiao[ 'fenxiao_level' ][ 'level_id' ];
                $fenxiao_level_rate = $fenxiao[ 'fenxiao_level' ][ 'one_rate' ] ?? 0;
            }
        }
        //分销配置
        $fenxiao_config = ( new CoreFenxiaoConfigService() )->getFenxiaoConfig($this->site_id);
        $list = $this->pageQuery($search_model, function ($item) use ($fenxiao_level, $fenxiao_level_rate, $fenxiao_config) {
            if ($fenxiao_level > 0) {
                //如果开启了二级分销才会计算二级佣金
                $fenxiao_goods = $item[ 'fenxiaoGoods' ];
                $sku = $item[ 'goodsSku' ];
                $fenxiao_rule = [];
                foreach ($item[ 'fenxiaoGoodsRule' ] as $v) {
                    $fenxiao_rule[ $v[ 'sku_id' ] ][ $v[ 'level_id' ] ] = $v;
                    $fenxiao_rule[ $v[ 'sku_id' ] ][ 'calculate_price' ] = $v[ 'calculate_price' ];
                }
                $fenxiao_goods_rule = $fenxiao_rule[ $sku[ 'sku_id' ] ] ?? [];
                //计算订单项目分销中商品价格基准
                $calculate_price = $fenxiao_goods_rule[ 'calculate_price' ] ?? 0;
                $order_goods_money = $calculate_price > 0 ? $calculate_price : $sku[ 'price' ];
                $fenxiao_goods_rule_type = $fenxiao_goods[ 'fenxiao_type' ];//分销商品计算规则
                if ($fenxiao_goods_rule_type == 1) {
                    //默认规则
                    $temp_calculate_type = 1;
                    $temp_data = $fenxiao_level_rate;
                } else {
                    $fenxiao_goods_config = $fenxiao_goods_rule[ $fenxiao_level ] ?? [];
                    //未设置，按照默认规则
                    if (empty($fenxiao_goods_config)) {
                        $temp_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                        $temp_data = $fenxiao_level_rate;
                    } else {
                        if ($fenxiao_goods_config[ 'one_rate' ] > 0) {
                            //佣金比率计算
                            $temp_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                            $temp_data = $fenxiao_goods_config[ 'one_rate' ];
                        } elseif ($fenxiao_goods_config[ 'one_money' ] > 0) {
                            //固定金额
                            $temp_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_MONEY;
                            $temp_data = $fenxiao_goods_config[ 'one_money' ];
                        } else {
                            //默认等级
                            $temp_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                            $temp_data = $fenxiao_level_rate;
                        }
                    }
                }
                if ($temp_calculate_type == FenxiaoGoodsDict::CALCULATE_TYPE_RATE) {
                    $commission = $order_goods_money * $temp_data / 100;
                } else {
                    $commission = $temp_data;
                }
            }
            $item->commission = number_format($commission ?? 0, 2);
        });
        return $list;
    }

    /**
     * 查询商品列表组件
     * @param array $where
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function getComponents(array $where = [])
    {

        $field = 'site_id,goods_id,goods_name,sub_title,goods_category,goods_type,goods_cover,unit,status,sale_num + goods.virtual_sale_num as sale_num';
        $sku_where = [
            [ 'goodsSku.is_default', '=', 1 ],
            [ 'goods.site_id', '=', $this->site_id ],
            [ 'goods.is_gift', '=', FenxiaoGoodsDict::NOT_IS_GIFT ],
            [ 'status', '=', 1 ]
        ];
        // 参数过滤
        if (!empty($where[ 'order' ]) && in_array($where[ 'order' ], [ 'sale_num', 'price' ])) {
            $order = $where[ 'order' ] . ' desc';
        } else {
            $sort_config = ( new CoreGoodsConfigService() )->getSortConfig($this->site_id);
            if ($sort_config[ 'sort_column' ] == 'sale_price') {
                $sort_config[ 'sort_column' ] = 'goodsSku.sale_price';
            }
            $order = $sort_config[ 'sort_column' ] . ' ' . $sort_config[ 'sort_type' ];
        }
        $list = $this->model
            ->withSearch([ "goods_category", "label_ids", 'service_ids' ], $where)
            ->field($field)
            ->withJoin(
                [
                    'goodsSku',
                    'fenxiaoGoods' => function ($query) {
                        $query->where([ [ 'fenxiaoGoods.is_fenxiao', '=', 1 ] ]);
                    }
                ])
            ->with([ 'fenxiaoGoodsRule' ])
            ->where($sku_where)->order($order)->append([ 'goods_type_name', 'goods_cover_thumb_small', 'goods_cover_thumb_mid' ])->limit($where[ 'num' ])
            ->select()->toArray();
        if (!empty($list)) {
            //获取当前是否登录会员,登录会员是否是分销商
            $fenxiao_level_rate = 0;
            $fenxiao_level = 0;
            if ($this->member_id > 0) {
                $fenxiao_model = new Fenxiao();
                $fenxiao = $fenxiao_model->where([ [ 'member_id', '=', $this->member_id ], [ 'site_id', '=', $this->site_id ] ])->with([ 'fenxiao_level' ])->findOrEmpty();
                if (!$fenxiao->isEmpty()) {
                    $fenxiao_level = $fenxiao[ 'fenxiao_level' ][ 'level_id' ];
                    $fenxiao_level_rate = $fenxiao[ 'fenxiao_level' ][ 'one_rate' ] ?? 0;

                }
            }

            foreach ($list as &$item) {
                if ($fenxiao_level > 0) {
                    $item[ 'fenxiao' ] = $fenxiao->toArray();
                    $fenxiao_goods = $item[ 'fenxiaoGoods' ];
                    $sku = $item[ 'goodsSku' ];
                    $fenxiao_rule = [];
                    foreach ($item[ 'fenxiaoGoodsRule' ] as $v) {
                        $fenxiao_rule[ $v[ 'sku_id' ] ][ $v[ 'level_id' ] ] = $v;
                        $fenxiao_rule[ $v[ 'sku_id' ] ][ 'calculate_price' ] = $v[ 'calculate_price' ];
                    }
                    $fenxiao_goods_rule = $fenxiao_rule[ $sku[ 'sku_id' ] ] ?? [];
                    //计算订单项目分销中商品价格基准
                    $calculate_price = $fenxiao_goods_rule[ 'calculate_price' ] ?? 0;
                    $order_goods_money = $calculate_price > 0 ? $calculate_price : $sku[ 'price' ];
                    $fenxiao_goods_rule_type = $fenxiao_goods[ 'fenxiao_type' ];//分销商品计算规则
                    if ($fenxiao_goods_rule_type == 1) {
                        //默认规则
                        $temp_calculate_type = 1;
                        $temp_data = $fenxiao_level_rate;
                    } else {
                        $fenxiao_goods_config = $fenxiao_goods_rule[ $fenxiao_level ] ?? [];

                        //未设置，按照默认规则
                        if (empty($fenxiao_goods_config)) {
                            $temp_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                            $temp_data = $fenxiao_level_rate;
                        } else {
                            if ($fenxiao_goods_config[ 'one_rate' ] > 0) {
                                //佣金比率计算
                                $temp_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                                $temp_data = $fenxiao_goods_config[ 'one_rate' ];
                            } elseif ($fenxiao_goods_config[ 'one_money' ] > 0) {
                                //固定金额
                                $temp_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_MONEY;
                                $temp_data = $fenxiao_goods_config[ 'one_money' ];
                            } else {
                                //默认等级
                                $temp_calculate_type = FenxiaoGoodsDict::CALCULATE_TYPE_RATE;
                                $temp_data = $fenxiao_level_rate;
                            }
                        }
                    }
                    if ($temp_calculate_type == FenxiaoGoodsDict::CALCULATE_TYPE_RATE) {
                        $commission = $order_goods_money * $temp_data / 100;
                    } else {
                        $commission = $temp_data;
                    }

                }
                $item[ 'commission' ] = number_format($commission ?? 0, 2, '.', '');
            }
        }

        return $list;

    }
}
