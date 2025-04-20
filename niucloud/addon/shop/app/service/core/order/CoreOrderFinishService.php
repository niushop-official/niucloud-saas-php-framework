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

namespace addon\shop\app\service\core\order;

use addon\shop\app\dict\order\OrderDeliveryDict;
use addon\shop\app\dict\order\OrderDict;
use addon\shop\app\dict\order\OrderGoodsDict;
use addon\shop\app\model\order\Order;
use addon\shop\app\model\order\OrderGoods;
use app\dict\pay\PayDict;
use app\model\pay\Pay;
use app\service\core\weapp\CoreWeappDeliveryService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\db\exception\DbException;

/**
 *  订单完成服务层
 */
class CoreOrderFinishService extends BaseCoreService
{

    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 订单完成
     * @param array $data
     * @return true
     * @throws DbException
     */
    public function finish(array $data)
    {
        $order_id = $data[ 'order_id' ];
        $site_id = $data[ 'site_id' ];

        //查询订单
        $where = array(
            [ 'order_id', '=', $order_id ],
            [ 'site_id', '=', $site_id ]
        );
        $order = $this->model->where($where)->findOrEmpty()->toArray();
        if (empty($order)) throw new CommonException('SHOP_ORDER_NOT_FOUND');//订单不存在
//        if ($order[ 'status' ] != OrderDict::WAIT_TAKE) throw new CommonException('SHOP_ONLY_WAIT_TAKE_CAN_BE_TAKE');//只有待收货的订单才可以收货

        //存在退款中的订单项,订单就不可以收货
        $refunding_order_goods_count = ( new OrderGoods() )->where([
            [ 'order_id', '=', $order_id ],
            [ 'status', '=', OrderGoodsDict::REFUNDING ]
        ])->count();
        if ($refunding_order_goods_count > 0) throw new CommonException('SHOP_ORDER_HAS_REFUNDING_NOT_ALLOW_FINISH');//是否存在退款中的订单项
        $update_data = array(
            'status' => OrderDict::FINISH,
            'finish_time' => time(),
            'is_enable_refund' => 0,
            'timeout' => 0
        );
        $this->model->where($where)->update($update_data);
        //订单项收货
        $this->orderGoodsTake($data);
        $data[ 'order_data' ] = array_merge($order, $update_data);
        //订单完成操作
        CoreOrderEventService::orderFinish($data);
        //订单完成后操作
        CoreOrderEventService::orderFinishAfter($data);
        return true;
    }

    /**
     * 订单项收货
     * @param $data
     * @return void
     */
    public function orderGoodsTake($data)
    {
        $order_id = $data[ 'order_id' ];
        $order_goods_ids = $data[ 'order_goods_ids' ] ?? [];
        //将待收货的订单项设置已收货
        $order_goods_where = array(
            [ 'order_id', '=', $order_id ],
            [ 'status', '=', OrderGoodsDict::NORMAL ],
//            ['delivery_status', '=', OrderDeliveryDict::DELIVERY_FINISH]
        );
        if (!empty($order_goods_ids)) {
            $order_goods_where[] = [ 'order_goods_id', 'in', $order_goods_ids ];
        }
        $order_goods_data = array(
            'delivery_status' => OrderDeliveryDict::TAKED
        );
        ( new OrderGoods() )->where($order_goods_where)->update($order_goods_data);
        return true;
    }

    /**
     * 确认收货提醒接口
     * @param array $params
     * @return string
     */
    public function orderShippingNotifyConfirmReceive($params = [])
    {

        try {

            $site_id = $params[ 'site_id' ];

            $pay_model = new Pay();
            $where = array(
                [ 'site_id', '=', $site_id ],
                [ 'out_trade_no', '=', $params[ 'out_trade_no' ] ]
            );
            $pay_info = $pay_model->where($where)->field('id,type')->findOrEmpty()->toArray();

            // 订单未使用微信支付，无须处理
            if ($pay_info[ 'type' ] != PayDict::WECHATPAY) {
                return '订单未使用微信支付';
            }

            if ($params[ 'delivery_type' ] != OrderDeliveryDict::EXPRESS) {
                return '只有物流订单才能进行提醒';
            }

            $weapp_delivery_service = new CoreWeappDeliveryService();

            // 检测微信小程序是否已开通发货信息管理服务
            $is_trade_managed = $weapp_delivery_service->isTradeManaged($site_id);

            if (empty($is_trade_managed[ 'is_trade_managed' ])) {
                return '发货信息录入接口，报错：' . $is_trade_managed[ "errmsg" ];
            }

            // 设置消息跳转路径设置接口
            $result_jump_path = $weapp_delivery_service->setMsgJumpPath($site_id, 'shop_order');
            if ($result_jump_path[ 'errcode' ] != 0) {
                return '设置消息跳转路径设置接口，报错：' . $result_jump_path[ "errmsg" ];
            }

            $data = [
                'merchant_trade_no' => $params[ 'out_trade_no' ] // 商户系统内部订单号，只能是数字、大小写字母_-*且在同一个商户号下唯一
            ];
            $weapp_delivery_service->notifyConfirmReceive($site_id, $data);

        } catch (\Exception $e) {
//            throw new  CommonException($e->getMessage());
        }
    }

}
