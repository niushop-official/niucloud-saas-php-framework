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

namespace addon\shop_replace_buy\app\service\admin;

use addon\shop\app\dict\order\OrderLogDict;
use addon\shop\app\model\goods\GoodsSku;
use addon\shop\app\model\order\Order;
use addon\shop\app\service\admin\goods\GoodsService;
use addon\shop\app\service\core\delivery\CoreStoreService;
use addon\shop\app\service\core\marketing\CoreManjianService;
use addon\shop\app\service\core\order\CoreOrderCreateService;
use addon\shop_replace_buy\app\dict\order\OrderFromDict;
use app\dict\common\ChannelDict;
use app\service\core\pay\CorePayService;
use core\base\BaseAdminService;
use core\exception\AdminException;
use think\db\exception\DataNotFoundException;
use think\db\exception\DbException;
use think\db\exception\ModelNotFoundException;

/**
 *  代客下单服务层
 */
class OrderCreateService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 已选商品计算
     * @param $data
     * @return array
     */
    public function selectGoodsCalculate($data)
    {
        if (empty($data[ 'member_id' ])) throw new AdminException('MEMBER_NOT_EXIST');
        //获取商品信息
        $data = $this->getSelectGoods($data);

        //满减
        $data = ( new CoreManjianService() )->manjianPromotion($data, $this->site_id, $data[ 'member_id' ]);
        $promotion_money = $data[ 'promotion_money' ] ?? 0;
        $order_money = $data[ 'goods_money' ] - $promotion_money;
        $data[ 'order_money' ] = $order_money;

        $good_list = $data[ 'goods_list' ];
        $match_list = [];
        foreach ($good_list as $k => $v) {
            $match_list[ $k ][ 'goods_id' ] = $v[ 'goods_id' ];
            $match_list[ $k ][ 'sku_id' ] = $v[ 'sku_id' ];
            foreach ($v[ 'promotion' ] as $kk => $vv) {
                switch ($kk) {
                    case 'manjian':
                        if ($vv[ 'discount_array' ][ 'level' ] >= 0) {
                            $match_list[ $k ][ 'level' ] = $vv[ 'discount_array' ][ 'level' ];
                        }
                        break;
                    default:
                        break;
                }
            }
        }
        return [
            'goods_money' => $data[ 'goods_money' ],
            'promotion_money' => $promotion_money,
            'order_money' => $order_money,
            'match_list' => $match_list
        ];
    }

    /**
     * 获取已选商品列表信息
     * @param $data
     * @return mixed
     */
    public function getSelectGoods($data)
    {
        $site_id = $this->site_id;
        $member_id = $data[ 'member_id' ];

        $sku_ids = $data[ 'sku_ids' ] ?? [];
        $sku_id_list = array_column($sku_ids, 'sku_id');
        $sku_num_list = array_column($sku_ids, 'num', 'sku_id');
        //组装商品列表
        $field = 'sku_id,price,goodsSku.goods_id,member_price,member_discount';
        $condition = [
            [ 'goodsSku.sku_id', 'in', $sku_id_list ],
            [ 'goodsSku.site_id', '=', $site_id ]
        ];
        $goods_list = ( new GoodsSku() )
            ->alias('goodsSku')
            ->field($field)
            ->where($condition)
            ->join('shop_goods goods', 'goods.goods_id = goodsSku.goods_id')
            ->select()
            ->toArray();
        $goods_service = new GoodsService();
        $member_info = $goods_service->getMemberInfo($member_id);

        $data[ 'goods_num' ] = 0;
        $data[ 'goods_money' ] = 0;
        $data[ 'goods_list' ] = [];
        $data[ 'coupon_money' ] = 0; //优惠券金额
        $data[ 'promotion_money' ] = 0; //优惠金额
        if (!empty($goods_list)) {
            foreach ($goods_list as $k => $v) {
                $member_price = $goods_service->getMemberPrice($member_info, $v[ 'member_discount' ], $v[ 'member_price' ], $v[ 'price' ]);
                $item_num = $sku_num_list[ $v[ 'sku_id' ] ];
                $price = $v[ 'price' ];
                if (isset($member_price) && !empty($member_price) && $member_price < $v[ 'price' ]) {
                    $price = $member_price;
                }
                $v[ 'price' ] = $price;
                $v[ 'num' ] = $item_num;
                $v[ 'goods_money' ] = $price * $item_num;
                $v[ 'real_goods_money' ] = $v[ 'goods_money' ];
                $v[ 'promotion' ] = [];

                $data[ 'goods_num' ] += $item_num;
                $data[ 'goods_money' ] += $v[ 'goods_money' ];
                $data[ 'goods_list' ][] = $v;
            }
        }
        return $data;
    }

    /**
     * 订单创建
     * @param array $data
     * @return array
     */
    public function create(array $data)
    {
        if (empty($data[ 'member_id' ])) throw new AdminException('MEMBER_NOT_EXIST');
        $data[ 'site_id' ] = $this->site_id;
        $data[ 'order_from' ] = OrderFromDict::REPLACE_BUY;
        $data[ 'main_type' ] = OrderLogDict::MEMBER;
        $data[ 'main_id' ] = $data[ 'member_id' ];
        return ( new CoreOrderCreateService() )->create($data);
    }

    /**
     * 计算
     * @param array $data
     * @return void|null
     */
    public function calculate(array $data)
    {
        if (empty($data[ 'member_id' ])) throw new AdminException('MEMBER_NOT_EXIST');
        $data[ 'order_from' ] = OrderFromDict::REPLACE_BUY;
        $data[ 'site_id' ] = $this->site_id;
        return ( new CoreOrderCreateService() )->calculate($data);
    }

    /**
     * 获取优惠券列表
     * @param array $data
     * @return void|null
     */
    public function getCoupon(array $data)
    {
        if (empty($data[ 'member_id' ])) throw new AdminException('MEMBER_NOT_EXIST');
        $data[ 'site_id' ] = $this->site_id;
        return ( new CoreOrderCreateService() )->getCoupon($data);
    }

    /**
     * 查询自提点
     * @param array $data
     * @return array
     * @throws DataNotFoundException
     * @throws DbException
     * @throws ModelNotFoundException
     */
    public function getStore(array $data)
    {
        return ( new CoreStoreService() )->getStoreList($this->site_id, $data);
    }

    /**
     * 检测订单支付
     * @param array $data
     * @return bool
     */
    public function checkPay(array $data)
    {
        return ( new CorePayService() )->getPayStatusByTrade($this->site_id, $data[ 'trade_type' ], $data[ 'trade_id' ]);
    }
}
