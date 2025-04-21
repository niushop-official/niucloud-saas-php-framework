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

namespace addon\vipcard\app\service\core;

use addon\vipcard\app\dict\GoodsDict;
use addon\vipcard\app\dict\order\OrderDict;
use addon\vipcard\app\dict\order\OrderLogDict;
use addon\vipcard\app\dict\ReserveDict;
use addon\vipcard\app\model\Goods;
use addon\vipcard\app\model\Order;
use addon\vipcard\app\model\OrderItem;
use addon\vipcard\app\model\Reserve;
use app\dict\pay\PayDict;
use app\service\core\notice\NoticeService;
use app\service\core\pay\CorePayService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;
use addon\vipcard\app\job\OrderClose;

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
     * 订单确认
     * @param array $data
     * @return void
     */
    public function confirm(array $data) {
        $this->scene = 'confirm';
        return $this->calculate($data);
    }

    /**
     * 订单确认
     * @param array $data
     * @return void
     */
    public function create(array $data) {
        $this->scene = 'create';
        $data = $this->calculate($data);

        Db::startTrans();
        try {
            $create_order = (new Order())->create([
                'site_id' => $data['site_id'],
                'member_id' => $data['member_id'],
                'order_from' => $data['order_from'] ?? 'h5',
                'order_type' => 'vipcard',
                'order_no' => create_no(),
                'order_status' => OrderDict::WAIT_PAY,
                'ip' => request()->ip(),
                'member_message' => '',
                'order_money' => $data['order_money'],
                'pay_money' => $data['pay_money'],
                'create_time' => time(),
                'auto_close_time' => (time() + 120 * 60),
                'order_name' => $data['goods'][0]['goods_name']
            ]);
            $order_id = $create_order->order_id;
            //添加订单项目表
            $order_item_model = new OrderItem();
            foreach ($data['goods'] as $k => $goods_item)
            {
                $item_data = [
                    'order_id' => $order_id,
                    'site_id' => $data['site_id'],
                    'member_id' => $data['member_id'],
                    'item_id' => $goods_item['goods_id'],
                    'item_type' => $goods_item['goods_type'],
                    'item_name' => $goods_item['goods_name'],
                    'item_image' => $goods_item['goods_cover'],
                    'price' => $goods_item['price'],
                    'num' => $goods_item['num'],
                    'item_money' => $goods_item['goods_money'],
                ];
                $order_item_model->create($item_data);
            }
            //创建支付单据  置后
//            (new CorePayService())->create($data['site_id'], PayDict::MEMBER, $data['member_id'], $data['pay_money'], 'vipcard', $order_id, $data['goods'][0]['goods_name']);


            // 添加订单日志
            CoreOrderLogService::addLog($data['site_id'], $order_id, OrderLogDict::ORDER_CREATE, 'member', $data['member_id'], OrderDict::getStatus(OrderDict::WAIT_PAY));

            // 添加订单超时关闭任务
            OrderClose::dispatch(['order_id' => $order_id ], secs:(120 * 60));

            Db::commit();

            if ($data['order_money'] == 0){
                (new CoreOrderPayService())->pay(['site_id' => $data['site_id'], 'trade_id' => $order_id, 'main_type' => PayDict::MEMBER, 'main_id' => $data['member_id']]);
            }

            //返回订单信息
            return [
                'trade_type' => 'vipcard',
                'trade_id' => $order_id
            ];
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 订单创建
     * @param array $data
     * @return void
     */
    public function calculate(array $data) {
        $goods_list = [];
        $order_money = 0;

        foreach ($data['goods'] as $item) {
            $goods_item = $this->getGoodsInfo($data['site_id'], $item['goods_id']);
            $goods_item['num'] = $item['num'];
            $goods_item['goods_money'] = round($goods_item['price'] * $item['num'], 2);
            $order_money += $goods_item['goods_money'];
            $goods_list[] = $goods_item;
        }

        $data['goods'] = $goods_list;
        $data['order_money'] = $order_money;
        $data['pay_money'] = $order_money;

        return $data;
    }

    /**
     * 查询商品信息
     * @param array $data
     * @return void
     */
    private function getGoodsInfo(int $site_id, int $goods_id) {
        $goods = (new Goods())->where([
            ['site_id', '=', $site_id ],
            ['goods_id', '=', $goods_id ],
            ['status', '=', 1]
        ])->field('site_id,goods_id,goods_name,goods_cover,goods_type,buy_info,verify_validity_type,verify_validity,card_type,price,renew_price,common_num')
            ->append(['cover_thumb_small', 'cover_thumb_mid'])
            ->findOrEmpty();
        if ($goods->isEmpty()) throw new CommonException('VIPCARD_GOODS_NOT_EXIST');

        return $goods->toArray();
    }

    /**
     * 支付成功
     * @param array $pay_info
     * @return void
     */
    public function pay(array $pay_info) {
        $order = (new Order())->where([ ['order_id', '=', $pay_info['trade_id'] ] ])->with(['item' => function($query){
            $query->field('order_id,item_id,num');
        }])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status != OrderDict::WAIT_PAY) throw new CommonException('ORDER_PAID');

        Db::startTrans();
        try {
            // 修改订单
            $order->order_status = OrderDict::WAIT_USE;
            $order->pay_time = time();
            $order->is_enable_refund = 1;
            $order->out_trade_no = $pay_info['out_trade_no'];
            $order->save();

            // 变更预约表
            $reserve = (new Reserve())->where([ ['order_id', '=', $order->order_id ] ])->findOrEmpty();
            if (!$reserve->isEmpty()) {
                $reserve->pay_time = time();
                $reserve->reserve_state = ReserveDict::TREAT_TO_STORE;
                $reserve->save();
            }

            // 统计数据
            $stat_data = [
                'order_money' => $order->pay_money,
                'order_num' => 1,
                'buy_card_money' => 0,
                'buy_card_num' => 0,
                'buy_service_money' => 0,
                'buy_service_num' => 0,
            ];

            // 生成卡项
            foreach ($order->item as $item) {
                CoreMemberCardService::create($order['site_id'], $order['member_id'], $item['item_id'], $order['order_id'], $item['num']);
                // 变更销量
                (new Goods())->update(['sale_num' => Db::raw("sale_num + {$item['num']}") ], [ ['goods_id', '=', $item['item_id'] ] ]);

                if ($item['item_type'] == GoodsDict::CARD) {
                    $stat_data['buy_card_money'] += $item->item_money;
                    $stat_data['buy_card_num'] = 1;
                } else {
                    $stat_data['buy_service_money'] += $item->item_money;
                    $stat_data['buy_service_num'] = 1;
                }
            }

            // 添加订单日志
            CoreOrderLogService::addLog($order['site_id'], $order['order_id'], OrderLogDict::ORDER_PAY, 'member', $order['member_id'], OrderDict::getStatus(OrderDict::WAIT_USE));

            // 发送支付成功通知
            (new NoticeService())->send($order['site_id'], 'vipcard_order_pay', ['order_id' => $order['order_id'] ]);

            // 添加统计数据
            CoreStatService::addStat($order['site_id'], $stat_data);

            Db::commit();

            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 订单关闭
     * @param Order $order
     * @return true
     */
    public function close(Order $order) {
        if (!in_array($order['order_status'], [ OrderDict::WAIT_PAY, OrderDict::WAIT_USE  ] )) throw new CommonException('ORDER_NOT_ALLOW_CLOSE');

        Db::startTrans();
        try {
            //关闭相关的支付
            (new CorePayService())->closeByTrade($order['site_id'], $order['order_type'], $order['order_id']);

            $order->order_status = OrderDict::CLOSE;
            $order->close_time = time();
            $order->is_enable_refund = 0;
            $order->save();

            // 如果订单已支付
            if ($order['order_status'] == OrderDict::WAIT_USE) {
                // 扣除销量
                $order_item = (new OrderItem())->where([ ['order_id', '=', $order['order_id'] ] ])->select()->toArray();
                foreach ($order_item as $item) {
                    (new Goods())->update(['sale_num' => Db::raw("sale_num - {$item['num']}") ], [ ['goods_id', '=', $item['item_id'] ] ]);
                }
            }

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
            (new NoticeService())->send($order['site_id'], 'vipcard_order_auto_close', [ 'order_id' => $order['order_id'] ]);

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
}
