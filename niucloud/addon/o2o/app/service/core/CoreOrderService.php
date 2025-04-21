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

namespace addon\o2o\app\service\core;

use addon\o2o\app\dict\order\OrderDict;
use addon\o2o\app\dict\order\OrderLogDict;
use addon\o2o\app\model\Order;
use addon\o2o\app\model\OrderItem;
use addon\o2o\app\model\Technician;
use app\dict\pay\PayDict;
use app\model\pay\Pay;
use app\service\core\member\CoreMemberService;
use app\service\core\notice\NoticeService;
use app\service\core\pay\CorePayService;
use app\service\core\weapp\CoreWeappDeliveryService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;
use think\facade\Log;

/**
 * 订单
 * Class CoreOrderService
 */
class  CoreOrderService extends BaseCoreService
{
    private $scene;

    public function __construct()
    {
        parent::__construct();
        $this->model = new Order();
    }

    /**
     * 订单是否能退款
     * @param int $order_id
     */
    public function checkOrderIsEnableRefund(int $order_id, $is_enable_refund)
    {
        $order_item_info = (new OrderItem())->field('is_enable_refund')->where([ ['order_id', '=', $order_id], ['item_type', 'in', 'reservation,buy'] ])->findOrEmpty()->toArray();
        if(!empty($order_item_info)) $is_enable_refund = $order_item_info['is_enable_refund'];
        return $is_enable_refund;
    }

    /**
     * 订单关闭
     * @param Order $order
     * @return true
     */
    public function close(Order $order) {
        if (!in_array($order['order_status'], [ OrderDict::WAIT_PAY, OrderDict::DISPATCH, OrderDict::WAIT_SERVICE,OrderDict::IN_SERVICE  ] )) throw new CommonException('ORDER_NOT_ALLOW_CLOSE');

        Db::startTrans();
        try {
            //关闭相关的支付
            (new CorePayService())->closeByTrade($order['site_id'], $order['order_type'], $order['order_id']);

            $order->order_status = OrderDict::CLOSE;
            $order->close_time = time();
            $order->is_enable_refund = 0;
            $order->save();
            // 添加订单日志
            CoreOrderLogService::addLog($order['site_id'], $order->order_id, OrderLogDict::ORDER_CANCEL, 'member', $order->member_id, OrderDict::getStatus(OrderDict::CLOSE));

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 订单自动关闭
     * @param int $order_id
     * @return void
     */
    public function autoClose(int $order_id) {
        $order = (new Order())->where([ ['order_id', '=', $order_id ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status != OrderDict::WAIT_PAY) return true;

        try {
            $this->close($order);
            // 添加订单日志
            CoreOrderLogService::addLog($order['site_id'], $order_id, OrderLogDict::ORDER_OVERTIME, 'system', 0, OrderDict::getStatus(OrderDict::CLOSE));

            // 发送订单关闭通知
            (new NoticeService())->send($order['site_id'], 'o2o_order_auto_close', [ 'order_id' => $order['order_id'] ]);
            Db::commit();
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }


    /**
     * 订单派单
     * @param array $data
     * @return bool
     */
    public function orderDispatch(array $data)
    {
        $order = (new Order())->where([ ['order_id', '=', $data['order_id'] ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if (!in_array($order->order_status, [OrderDict::DISPATCH, OrderDict::WAIT_SERVICE])) throw new CommonException('当前订单不可派单');
        $count = $this->model->where([
            [ 'site_id', '=', $order->site_id ],
            [ 'technician_id', '=', $data['technician_id'] ],
            [ 'order_status', '=', OrderDict::IN_SERVICE ],
            [ 'reserve_service_time', '=', $order->reserve_service_time ]
        ])->count();
        if ($count > 0) throw new CommonException('O2O_SELECT_TECHNICIAN_IN_SERVICE');
        Db::startTrans();
        try {
            $order->order_status = OrderDict::WAIT_SERVICE;
            $order->dispatch_time = time();
            $order->technician_id = $data['technician_id'];
            $order->save();

            (new CoreOrderLogService())->addLog($order->site_id, $data['order_id'], OrderLogDict::ORDER_DISPATCH,'user', $data['id'] ?? 0, OrderDict::getStatus(OrderDict::WAIT_SERVICE));
            Db::commit();
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 订单转单
     * @param array $data
     * @return bool
     */
    public function orderTransfer(array $data)
    {
        $order = (new Order())->where([ ['order_id', '=', $data['order_id'] ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status != OrderDict::WAIT_SERVICE) throw new CommonException('当前订单不可转单');
        Db::startTrans();
        try {
            $order->order_status = OrderDict::DISPATCH;
            $order->dispatch_time = 0;
            $order->technician_id = 0;
            $order->save();
            $action_way = $data['action_way'] ?? 'system';
            $id = $data['id'] ?? 0;
            (new CoreOrderLogService())->addLog($order->site_id, $data['order_id'], OrderLogDict::ORDER_TRANSFER,$action_way, $id ?? 0, OrderDict::getStatus(OrderDict::DISPATCH));
            Db::commit();
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 订单添加项目
     * @param array $data
     * @return bool
     */
    public function orderAddItem(array $data)
    {
        $order = (new Order())->where([ ['order_id', '=', $data['order_id'] ] ])->findOrEmpty()->toArray();
        if (empty($order)) throw new CommonException('ORDER_NOT_EXIST');
        if ($order['order_status'] != OrderDict::IN_SERVICE ) throw new CommonException('当前订单不可添加项目');
        Db::startTrans();
        try {
            $item_image = $data['item_images'] ? explode(',', $data['item_images'])[0] : '';
            $add_data = [
                'order_id' => $order['order_id'],
                'site_id' => $order['site_id'],
                'member_id' => $order['member_id'],
                'item_id' => 0,
                'item_type' => 'custom',
                'item_name' => $data['item_name'],
                'item_image' => $item_image,
                'item_images' => $data['item_images'],
                'price' => $data['price'],
                'num' => 1,
                'item_money' => $data['price'],
                'out_trade_no' => '',
                'technician_id' => $order['technician_id'],
                'is_enable_refund' => 0
            ];
            $order_item = (new OrderItem())->create($add_data);
            $order_item_id = $order_item->order_item_id;

            //订单金额为0的话,要直接支付
            if ($add_data['item_money'] == 0) {
                (new CoreOrderPayService())->itemPay(['site_id' => $order['site_id'], 'trade_id' => $order_item_id]);
            }

            $action_way = $data['action_way'] ?? 'system';
            $id = $data['id'] ?? 0;
            (new CoreOrderLogService())->addLog($order['site_id'], $order['order_id'], OrderLogDict::ORDER_ADD_PAY,$action_way, $id ?? 0, OrderDict::getStatus(OrderDict::IN_SERVICE));
            Db::commit();
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 删除订单项
     */
    public function orderItemDel(array $data)
    {
        $order_item_id = $data['order_item_id'] ?? 0;
        if (!$order_item_id) throw new CommonException('PARAMS_ERROR');

        $order_item = (new OrderItem())->where([ ['order_item_id','=',$order_item_id] ])->findOrEmpty();
        if ($order_item->isEmpty()) throw new CommonException('ORDER_ITEM_NOT_EXIST');

        $order = (new Order())->where([ ['order_id','=',$order_item['order_id']] ])->findOrEmpty();
        if($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');

        if($order->technician_id != $data['id']) throw new CommonException('ORDER_ITEM_NOT_DEL_AUTHORITY');
        if($order->order_status != OrderDict::IN_SERVICE) throw new CommonException('ORDER_ITEM_NOT_DEL');
        if($order_item->item_type != 'custom') throw new CommonException('ORDER_ITEM_NOT_DEL');
        if($order_item->pay_time > 0) throw new CommonException('ORDER_ITEM_NOT_DEL');
        Db::startTrans();
        try {
            (new OrderItem())->where([ ['order_item_id', '=', $order_item_id] ])->delete();

            $action_way = $data['action_way'] ?? 'system';
            $id = $data['id'] ?? 0;
            (new CoreOrderLogService())->addLog($order->site_id, $order->order_id, OrderLogDict::ORDER_DEL_PAY,$action_way, $id ?? 0, OrderDict::getStatus(OrderDict::IN_SERVICE));
            Db::commit();
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
        return true;
    }

    /**
     * 修改订单项
     */
    public function orderItemEdit(array $data)
    {
        $order_item_id = $data['order_item_id'] ?? 0;
        if (!$order_item_id) throw new CommonException('PARAMS_ERROR');

        $order_item = (new OrderItem())->where([ ['order_item_id','=',$order_item_id] ])->findOrEmpty();
        if ($order_item->isEmpty()) throw new CommonException('ORDER_ITEM_NOT_EXIST');

        $order = (new Order())->where([ ['order_id','=',$order_item['order_id']] ])->findOrEmpty();
        if($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');

        if($order->technician_id != $data['id']) throw new CommonException('ORDER_ITEM_NOT_DEL_AUTHORITY');
        if($order->order_status != OrderDict::IN_SERVICE) throw new CommonException('ORDER_ITEM_NOT_EDIT');
        if($order_item->item_type != 'custom') throw new CommonException('ORDER_ITEM_NOT_EDIT');
        if($order_item->pay_time > 0) throw new CommonException('ORDER_ITEM_NOT_EDIT');
        Db::startTrans();
        try {
            $item_image = $data['item_images'] ? explode(',', $data['item_images'])[0] : '';
            $edit_data = [
                'item_id' => 0,
                'item_type' => 'custom',
                'item_name' => $data['item_name'],
                'item_image' => $item_image,
                'item_images' => $data['item_images'],
                'price' => $data['price'],
                'num' => 1,
                'item_money' => $data['price'],
                'out_trade_no' => '',
            ];
            (new OrderItem())->where([ ['order_item_id', '=', $order_item_id] ])->update($edit_data);

            //订单金额为0的话,要直接支付
            if ($edit_data['item_money'] == 0) {
                (new CoreOrderPayService())->itemPay(['site_id' => $order->site_id, 'trade_id' => $order_item_id]);
            }

            $action_way = $data['action_way'] ?? 'system';
            $id = $data['id'] ?? 0;
            (new CoreOrderLogService())->addLog($order->site_id, $order->order_id, OrderLogDict::ORDER_EDIT_PAY,$action_way, $id ?? 0, OrderDict::getStatus(OrderDict::IN_SERVICE));
            Db::commit();
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
        return true;
    }


    /**
     * 服务完成
     * @param array $data
     */
    public function orderServiceFinish(array $data)
    {
        $order = $this->model->where('order_id', $data['order_id'])->find();

        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status != OrderDict::IN_SERVICE ) throw new CommonException('当前订单不可操作');
        $no_pay_count = (new OrderItem())->where([ ['order_id','=', $data['order_id']], ['pay_time', '=', 0] ])->count();
        if($no_pay_count > 0) throw new CommonException('当前订单有项目未支付，请先支付');
        Db::startTrans();
        try {
            $order->order_status = OrderDict::FINISH;
            $order->finish_time = time();
            $order->save();
            (new OrderItem())->where([ ['order_id', '=', $data['order_id']] ])->update(['is_enable_refund' => 0]);
            $action_way = $data['action_way'] ?? 'system';
            $id = $data['id'] ?? 0;
            (new CoreOrderLogService())->addLog($order->site_id, $data['order_id'], OrderLogDict::ORDER_FINISH,$action_way, $id ?? 0, OrderDict::getStatus(OrderDict::FINISH));
            (new Technician())->where([ ['id', '=', $order->technician_id] ])->inc('order_num', 1)->update();
            Db::commit();

            $order_money = (new OrderItem())->where([ ['order_id', '=', $data['order_id']], ['pay_time', '>', 0] ])->sum('item_money');

            // 订单完成发放积分成长值
            CoreMemberService::sendGrowth($order->site_id, $order->member_id, 'o2o_buy_goods', [
                'order_money' => $order_money,
                 'from_type' => 'o2o_buy_order',
                 'related_id' => $order['order_id']
            ]);
            CoreMemberService::sendGrowth($order->site_id, $order->member_id, 'o2o_buy_order',[
                'from_type' => 'o2o_buy_order',
                'related_id' => $order['order_id']
            ]);

            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }


    /**
     * 订单信息
     * @param int $site_id
     * @param int $order_id
     * @return array
     */
    public function orderInfo(int $site_id, int $order_id) {
        return (new Order())->where([
            ['site_id', '=', $site_id],
            ['order_id', '=', $order_id]
        ])->field('*')->findOrEmpty()->toArray();
    }

    /**
     * 订单信息
     * @param int $site_id
     * @param int $order_item_id
     * @return array
     */
    public function orderItemInfo(int $site_id, int $order_item_id) {
        return (new OrderItem())->where([
            ['site_id', '=', $site_id],
            ['order_item_id', '=', $order_item_id]
        ])->field('*')->findOrEmpty()->toArray();
    }

    /**
     * 微信小程序 发货信息录入接口
     * @param $order_id
     * @return string
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     */
    public function orderShippingUploadShippingInfo($order_id)
    {
        try {

            $field = 'site_id, order_id, order_no, out_trade_no, member_id';

            $info = $this->model->where([
                [ 'order_id', '=', $order_id ],
                [ 'order_type', '=', OrderDict::ORDER_TYPE_ORDER ],
                [ 'order_status', '=', OrderDict::FINISH ]
            ])->field($field)->with([ 'item' => function($query) {
                $query->field('order_item_id, order_id, member_id, item_id, item_type, item_name, price, num, item_money');
            }, 'member' => function($query) {
                $query->field('member_id, weapp_openid');
            } ])->findOrEmpty()->toArray();

            // 订单不存在
            if (empty($info)) {
                return '';
            }

            $pay_model = new Pay();
            $where = array(
                [ 'out_trade_no', '=', $info[ 'out_trade_no' ] ]
            );
            $pay_info = $pay_model->where($where)->field('id,type')->findOrEmpty()->toArray();

            if (empty($pay_info)) {
                return '';
            }

            // 订单未使用微信支付，无须处理
            if ($pay_info[ 'type' ] != PayDict::WECHATPAY) {
                return '订单未使用微信支付';
            }

            $weapp_delivery_service = new CoreWeappDeliveryService();

            // 检测微信小程序是否已开通发货信息管理服务
            $is_trade_managed = $weapp_delivery_service->isTradeManaged($info[ 'site_id' ]);

            if (empty($is_trade_managed[ 'is_trade_managed' ])) {
                return '发货信息录入接口，报错：' . $is_trade_managed[ "errmsg" ];
            }

            // 设置消息跳转路径设置接口
            $result_jump_path = $weapp_delivery_service->setMsgJumpPath($info[ 'site_id' ], 'o2o_order');
            if ($result_jump_path[ 'errcode' ] != 0) {
                return '设置消息跳转路径设置接口，报错：' . $result_jump_path[ "errmsg" ];
            }

            $shipping_list = [];
            $first_shipping_info = [];

            $delivery_mode = 1; // 发货模式，发货模式枚举值：1、UNIFIED_DELIVERY（统一发货）2、SPLIT_DELIVERY（分拆发货） 示例值: UNIFIED_DELIVERY

            foreach ($info[ 'item' ] as $k => $v) {

                $item = [
                    'tracking_no' => '', // 物流单号，物流快递发货时必填，示例值: 323244567777 字符字节限制: [1, 128]
                    'express_company' => '', // 物流公司编码，快递公司ID，参见「查询物流公司编码列表」，物流快递发货时必填， 示例值: DHL 字符字节限制: [1, 128]
                    'item_desc' => str_sub($v[ 'item_name' ], 90) . '*' . $v[ 'num' ], // 商品信息，例如：微信红包抱枕*1个，限120个字以内
                    'contact' => [
                        'consignor_contact' => '',
                        'receiver_contact' => ''
                    ]
                ];

                $shipping_list[] = $item;
                if ($k == 0) {
                    $first_shipping_info = $item;
                }
            }

            // 统一发货，只能有一个物流信息，拼装商品信息
            if (count($shipping_list) > 1) {
                foreach ($shipping_list as $k => $v) {
                    if ($k > 0) {
                        $first_shipping_info[ 'item_desc' ] .= ',' . $v[ 'item_desc' ];
                    }
                }
            }

            $data = [
                'out_trade_no' => $info[ 'out_trade_no' ],
                'logistics_type' => 3, // 物流模式，发货方式枚举值：1、实体物流配送采用快递公司进行实体物流配送形式 2、同城配送 3、虚拟商品，虚拟商品，例如话费充值，点卡等，无实体配送形式 4、用户自提
                'delivery_mode' => $delivery_mode, // 发货模式，发货模式枚举值：1、UNIFIED_DELIVERY（统一发货）2、SPLIT_DELIVERY（分拆发货） 示例值: UNIFIED_DELIVERY
                // 同城配送没有物流信息，只能传一个订单
                'shipping_list' => $delivery_mode == 1 ? [ $first_shipping_info ] : $shipping_list, // 物流信息列表，发货物流单列表，支持统一发货（单个物流单）和分拆发货（多个物流单）两种模式，多重性: [1, 10]
                'weapp_openid' => $info[ 'member' ][ 'weapp_openid' ], // 用户标识，用户在小程序appid下的唯一标识。 下单前需获取到用户的Openid 示例值: oUpF8uMuAJO_M2pxb1Q9zNjWeS6o 字符字节限制: [1, 128]
                'is_all_delivered' => true // 分拆发货模式时必填，用于标识分拆发货模式下是否已全部发货完成，只有全部发货完成的情况下才会向用户推送发货完成通知。示例值: true/false
            ];

            $weapp_delivery_service->uploadShippingInfo($info[ 'site_id' ], $data);
        } catch (\Exception $e) {
            Log::write('o2o订单小程序发货信息录入失败' . $e->getMessage() . $e->getFile() . $e->getLine());
        }
    }
}