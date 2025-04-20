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

namespace addon\shop\app\service\core\goods;

use addon\shop\app\dict\goods\GoodsDict;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\dict\order\OrderGoodsDict;
use addon\shop\app\model\goods\Goods;
use addon\shop\app\model\order\OrderGoods;
use core\base\BaseCoreService;
use core\exception\CommonException;

/**
 * 商品限购服务层
 */
class CoreGoodsLimitBuyService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Goods();
    }

    /**
     * 检测商品限购
     * @param int $member_id
     * @param array $goods_list
     * @return string
     */
    public function checkGoodsLimitBuy(int $member_id, array $goods_list)
    {
        $goods_count = count($goods_list);
        foreach ($goods_list as $item) {
            if ($item[ 'min_buy' ] > 0) {
                if ($item[ 'stock' ] < $item[ 'min_buy' ]) {
                    return ($goods_count > 1 ? "商品“" . $item[ 'goods_name' ] . "”" : "该商品") . "库存数量小于起购数量";
                }
                if ($item[ 'num' ] < $item[ 'min_buy' ]) {
                    return ($goods_count > 1 ? "商品“" . $item[ 'goods_name' ] . "”" : "该商品") . $item[ 'min_buy' ] . "件起购";
                }
            }
            if ($item[ 'is_limit' ] == 1 && $item[ 'max_buy' ] > 0) {
                if ($item[ 'limit_type' ] == GoodsDict::SINGLE_TIME) {//单次限购
                    if ($item[ 'num' ] > $item[ 'max_buy' ]) {
                        return ($goods_count > 1 ? "商品“" . $item[ 'goods_name' ] . "”" : "该商品") . "单次限购" . $item[ 'max_buy' ] . "件";
                    }
                } elseif ($item[ 'limit_type' ] == GoodsDict::SINGLE_PERSON) {//长期限购
                    $sum = $this->getGoodsHasBuyNumber($item[ 'site_id' ], $member_id, $item[ 'goods_id' ]);
                    if ($sum + $item[ 'num' ] > $item[ 'max_buy' ]) {
                        return ($goods_count > 1 ? "商品“" . $item[ 'goods_name' ] . "”" : "该商品") . "每人限购" . $item[ 'max_buy' ] . "件" . ($sum > 0 ? "，您已购买" . $sum . "件" : "");
                    }
                }
            }
        }
        return "";
    }

    /**
     * 获取已购买的商品数量
     * @param $site_id
     * @param $member_id
     * @param $goods_id
     * @return int
     */
    public function getGoodsHasBuyNumber($site_id, $member_id, $goods_id)
    {
        return ( new OrderGoods() )->withJoin([ 'orderMain' ])->where([
            [ 'order_goods.site_id', '=', $site_id ],
            [ 'order_goods.member_id', '=', $member_id ],
            [ 'order_goods.goods_id', '=', $goods_id ],
            [ 'order_goods.status', '<>', OrderGoodsDict::REFUND_FINISH ],
            [ 'orderMain.status', '<>', OrderDict::CLOSE ]
        ])->sum('num');
    }

}
