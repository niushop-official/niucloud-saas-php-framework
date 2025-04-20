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

namespace addon\shop_giftcard\app\service\core\order;

use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;
use addon\shop_giftcard\app\dict\order\OrderDict;
use addon\shop_giftcard\app\dict\order\OrderLogDict;
use addon\shop_giftcard\app\model\giftcard\Giftcard;
use addon\shop_giftcard\app\model\order\Order;
use core\exception\CommonException;
use Exception;
use think\facade\Cache;
use think\facade\Db;

/**
 *  订单服务层
 */
trait CoreOrderCreateTrait
{
    public $member_id; // 会员id
    public $site_id; // 站点id
    public $param = []; // 入参

    // 基本数据处理(整体的数据)
    public $basic = [
        'goods_money' => 0,
        'order_money' => 0
    ];

    public $goods_data = [];//商品数据处理

    public $order_id;

    public $order_key;

    public function createOrder(array $data)
    {
        $order_data = $data[ 'order_data' ];
        $order_no = create_no();
        $order_data[ 'order_no' ] = $order_no;
        $order_data[ 'order_from' ] = $this->param[ 'order_from' ];//来源渠道
        $order_data[ 'ip' ] = request()->ip();
        $main_type = OrderLogDict::MEMBER;
        $main_id = $order_data[ 'member_id' ];
        $site_id = $order_data[ 'site_id' ];
        Db::startTrans();
        try {
            $order = ( new Order() )->create($order_data);
            $this->order_id = $order[ 'order_id' ];

            $order_data[ 'order_id' ] = $this->order_id;

            Db::commit();
            //删除订单缓存
            $this->delOrderCache($this->order_key);

            CoreOrderEventService::orderCreateAfter([ 'site_id' => $site_id, 'order_id' => $this->order_id, 'order_data' => $order_data, 'basic' => get_object_vars($this), 'main_type' => $main_type, 'main_id' => $main_id, 'time' => time() ]);
            //订单金额为0的话,要直接支付
            if ($order_data[ 'order_money' ] == 0) {
                ( new CoreOrderPayService() )->pay([ 'site_id' => $site_id, 'trade_id' => $this->order_id, 'main_type' => $main_type, 'main_id' => $main_id ]);
            }

            return [
                'trade_type' => OrderDict::TYPE,
                'order_id' => $this->order_id
            ];

        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 校验订单商品
     * @param $goods_id
     * @return array
     */
    public function checkOrderGoods($goods_id)
    {
        $goods_condition = [
            [ 'site_id', '=', $this->site_id ],
            [ 'giftcard_id', '=', $goods_id ]
        ];
        $goods_info = ( new Giftcard() )->where($goods_condition)->field('giftcard_id, site_id, card_name, card_price, status, is_give, card_right_type, balance_json, delivery_way, card_goods_type, card_goods_count, validity_type, validity_day, validity_time')->findOrEmpty()->toArray();
        if (empty($goods_info)) throw new CommonException('CARD_NOT_FOUND');//礼品卡不存在
        if ($goods_info['status'] == GiftcardDict::OFF) throw new CommonException('GIFTCARD_HAS_DOWN');//礼品卡已下架
        if ($goods_info['validity_type'] == GiftcardDict::DATE && strtotime($goods_info['validity_time']) < time()) throw new CommonException('GIFTCARD_HAS_EXPIRE');//礼品卡已过期
        return $goods_info;
    }

    /**
     * 给传参
     * @param $param
     * @return true
     */
    public function setParam($param)
    {
        $this->param = $param;
        $this->site_id = $param[ 'site_id' ];
        return true;
    }

    /**
     * 设置订单缓存
     * @return string
     * @throws Exception
     */
    public function setOrderCache($order_key = '', $order_cache = [])
    {
        if (empty($order_key)) {
            $order_key = create_no('', $this->member_id);
        }
        Cache::tag('order_cache')->set($order_key, $order_cache, 300000);
        return $order_key;
    }

    /**
     * 获取订单缓存
     * @param $order_key
     * @return void
     */
    public function getOrderCache($order_key)
    {
        $order_cache = Cache::get($order_key, []);
        if (empty($order_cache))
            throw new CommonException('GIFTCARD_ORDER_DATA_EXPIRE');
        foreach ($order_cache as $k => $v) {
            $this->$k = $v;
        }

        return true;
    }

    /**
     * 清除订单缓存
     * @param $order_key
     * @return true
     */
    public function delOrderCache($order_key = '')
    {
        Cache::delete($order_key);
        return true;
    }

    /**
     * 金额格式化
     * @param $money
     * @return float|int
     */
    public function moneyFormat($money)
    {
        return floor(strval(( $money ) * 100)) / 100;
    }
}
