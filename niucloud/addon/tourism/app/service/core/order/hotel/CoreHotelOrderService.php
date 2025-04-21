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

namespace addon\tourism\app\service\core\order\hotel;

use addon\tourism\app\dict\order\OrderDict;
use addon\tourism\app\dict\order\HotelOrderDict;
use addon\tourism\app\dict\order\OrderLogDict;
use addon\tourism\app\job\OrderClose;
use addon\tourism\app\job\OrderUseRemind;
use addon\tourism\app\model\Goods;
use addon\tourism\app\model\GoodsDay;
use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\model\TourismOrderItem;
use addon\tourism\app\service\core\CoreGoodsService;
use addon\tourism\app\service\core\CoreStatService;
use addon\tourism\app\service\core\hotel\CoreHotelConfigService;
use addon\tourism\app\service\core\order\CoreOrderLogService;
use addon\tourism\app\service\core\order\CoreOrderRefundService;
use addon\tourism\app\service\core\order\CoreOrderService;
use app\service\core\notice\NoticeService;
use app\service\core\pay\CorePayService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;


/**
 * 酒店订单流程
 * Class CoreRechargeOrderService
 * @package app\service\core\order
 */
class CoreHotelOrderService extends BaseCoreService
{
    protected $order_type = HotelOrderDict::TYPE;

    private $scene;

    /**
     * 订单确认
     * @param array $data
     * @return array|null
     */
    public function confirm(array $data) {
        $this->scene = 'confirm';
        return $this->calculate($data);
    }

    /**
     * 订单创建
     * @return void
     */
    public function create(array $data) {
        $this->scene = 'create';
        $data = $this->calculate($data);

        $hotel_config = (new CoreHotelConfigService())->getConfig($data['site_id']);

        $order_data = [
            'site_id' => $data['site_id'],
            'order_from' => $data['order_from'] ?? 'h5',
            'order_type' => $this->order_type,
            'order_status' => OrderDict::WAIT_PAY,
            'member_id' => $data['member_id'],
            'ip' => request()->ip() ?? '',
            'create_time' => time(),
            'order_money' => $data['order_money'],
            'pay_money' => $data['pay_money'],
            'buyer_info' => $data['buyer_info'],
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'days' => $data['days'],
            'num' => $data['num'],
            'hotel_id' => $data['hotel_info']['hotel_id'],
            'goods_id' => $data['order_items'][0]['goods_id'],
            'goods_name' => $data['order_items'][0]['goods_name'],
            'full_goods_name' => $data['hotel_info']['hotel_name'] . ' '. $data['goods_info']['goods_name'],
            'goods_image' => $data['order_items'][0]['goods_image'],
            'auto_close_time' => (time() + ($hotel_config['order_close'] * 60)),
            'mobile' => $data['mobile']
        ];

        $result = (new CoreOrderService())->create($order_data, $data['order_items']);

        // 添加订单日志
        CoreOrderLogService::addLog($data['site_id'], $result['order_id'], OrderLogDict::ORDER_CREATE, 'member', $data['member_id'], OrderDict::getStatus(OrderDict::WAIT_PAY));
        // 添加订单超时关闭任务
        OrderClose::dispatch(['order_id' => $result['order_id'], 'order_type' => $order_data['order_type'] ], secs:($hotel_config['order_close'] * 60));

        return $result;
    }

    /**
     * @param array $data
     * @return void
     */
    public function calculate(array $data) {
        // 查询酒店信息
        $hotel = $this->getHotelInfo($data['room_id'], $data['site_id']);
        // 查询酒店定价信息
        $separate_days = $this->getHotelSeparateDays($data['room_id'], $data['start_time'], $data['end_time']);
        $days = ceil( (strtotime($data['end_time']) - strtotime($data['start_time'])) / 86400);
        $core_goods_service = new CoreGoodsService();
        $member_info = $core_goods_service->getMemberInfo($data['member_id'], $data['site_id']);

        $order_money = 0;
        $items = [];
        for ($i = 0; $i < $days; $i++) {
            $day_time = strtotime($data['start_time']) + (86400 * $i);
            $separate = $separate_days[ date('Y-m-d', $day_time) ] ?? [];
            $sale_price = empty($separate) || $separate['is_set'] == 0 ? $hotel['price'] : $separate['price'];
            $sale_price = $core_goods_service->getMemberPrice($member_info, $hotel['member_discount'], $sale_price, $separate,$hotel['fixed_discount']);
            if ($this->scene == 'create') {
                if (!$this->checkStock($data['num'], $hotel, $separate)) throw new CommonException('HOTEL_STOCK_DEFICIENCY');
            }

            $item = [
                'site_id' => $data['site_id'],
                'member_id' => $data['member_id'],
                'goods_id' => $data['room_id'],
                'price' => $sale_price,
                'goods_money' => round($sale_price * $data['num'], 2),
                'num' => $data['num'],
                'year' => date('Y', $day_time),
                'month' => date('m', $day_time),
                'day' => date('d', $day_time),
                'time' => $day_time,
                'goods_name' => $hotel['goods_name'],
                'goods_image' => $hotel['goods_cover'],
            ];
            array_push($items, $item);
            $order_money += $item['goods_money'];
        }

        $data['order_money'] = round($order_money, 2);
        $data['pay_money'] = $data['order_money'];
        $data['order_items'] = $items;
        $data['days'] = $days;
        $data['hotel_info'] = $hotel['hotel'];
        unset($hotel['hotel']);
        $data['goods_info'] = $hotel;

        return $data;
    }

    /**
     * 查询酒店信息
     * @param $goods_id
     * @param $site_id
     * @return array
     */
    private function getHotelInfo(int $goods_id, int $site_id) {
        // 查询酒店
        $goods = (new Goods())->where([ [
            [ 'goods_id', '=', $goods_id ],
            [ 'site_id', '=', $site_id ],
            [ 'goods_type', '=', 'room' ],
            [ 'status', '=', 1]
        ]])->with([
            'hotel' => function($query) {
                $query->field('hotel_id,hotel_name,hotel_cover,hotel_attribute,hotel_status');
            }
        ])->field('goods_id,member_discount,fixed_discount,goods_name,goods_cover,goods_cover,goods_attribute,price,stock,hotel_id,buy_info,goods_content,room_bed,room_area,room_stay,room_floor')->findOrEmpty()->toArray();
        if (empty($goods) || empty($goods[ 'hotel' ])) throw new CommonException('TOURISM_HOTEL_NOT_EXIST');
        if ($goods[ 'hotel' ]['hotel_status'] == 0) throw new CommonException('TOURISM_HOTEL_HAS_DOWN');
        return $goods;
    }

    /**
     * 查询选择区间内独立设置的天
     * @param int $goods_id
     * @param string $start_time
     * @param string $end_time
     * @return array|array[]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    private function getHotelSeparateDays(int $goods_id, string $start_time, string $end_time) {
        $goods_day_list = (new GoodsDay())->where([
            [ 'goods_id', '=', $goods_id ],
            [ 'time', '>=', strtotime($start_time) ],
            [ 'time', '<=', strtotime($end_time) ]
        ])->field('price,year,month,day,sell_num,time,stock_all,is_set,member_price')->select()->toArray();

        if (!empty($goods_day_list)) {
            $list = [];
            foreach ($goods_day_list as $item) {
                $key = date('Y-m-d', $item['time']);
                $list[$key] = $item;
            }
            return $list;
        }

        return $goods_day_list;
    }

    /**
     * 检验库存
     * @param int $num
     * @param array $hotel_info
     * @param array $day_info
     * @return void
     */
    private function checkStock(int $num, array $hotel_info, array $day_info) {
        $stock = $hotel_info['stock'];
        $sale_num = $day_info['sell_num'] ?? 0;
        return $sale_num + $num <= $stock;
    }

    /**
     * 支付成功
     * @param array $pay_info
     * @return void
     */
    public function pay(array $pay_info) {
        $order = (new TourismOrder())->where([ ['order_id', '=', $pay_info['trade_id'] ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status != OrderDict::WAIT_PAY) throw new CommonException('ORDER_PAID');

        $hotel_config = (new CoreHotelConfigService())->getConfig($order['site_id']);

        Db::startTrans();
        try {
            // 修改订单
            $order->order_status = OrderDict::WAIT_USE;
            $order->pay_time = time();
            $order->verify_code = CoreOrderService::createVerifyCode($order->order_id);
            $order->is_enable_refund = $hotel_config['is_allow_refund'];
            $order->out_trade_no = $pay_info['out_trade_no'];
            $order->save();

            // 添加订单日志
            CoreOrderLogService::addLog($order['site_id'], $order['order_id'], OrderLogDict::ORDER_PAY, 'member', $order['member_id'], OrderDict::getStatus(OrderDict::WAIT_USE));

            $goods = (new Goods())->where([ [
                [ 'goods_id', '=', $order->goods_id ],
            ]])->field('stock, price')->find()->toArray();

            // 处理订单项
            $order_item_list = (new TourismOrderItem())->where([ ['order_id', '=', $order->order_id ] ])->field('goods_id,year,month,day,num')->select()->toArray();

            $save = [];
            // 是否超卖
            $is_oversold = false;
            foreach ($order_item_list as $item) {
                $day = (new GoodsDay())->where([ ['goods_id', '=', $item['goods_id'] ], ['year', '=', $item['year'] ], ['month', '=', $item['month'] ], ['day', '=', $item['day'] ] ])->field('id,is_set,stock_all')->findOrEmpty();
                if ($day->isEmpty()) {
                    array_push($save, [
                        'goods_id' => $item['goods_id'],
                        'sell_num' => $item['num'],
                        'year' => $item['year'],
                        'month' => $item['month'],
                        'stock_all' => $goods['stock'],
                        'day' => $item['day'],
                        'time' => strtotime("{$item['year']}-{$item['month']}-{$item['day']}"),
                        'create_time' => time(),
                        'member_price' => 1,
                        'time_date' => date('Y-m-d', strtotime("{$item['year']}-{$item['month']}-{$item['day']}"))
                    ]);
                } else {
                    // 超卖处理
                    if (!$this->checkStock($item['num'], $goods, $day->toArray())) $is_oversold = true;
                    array_push($save, [ 'id' => $day->id, 'sell_num' => Db::raw("sell_num + {$item['num']}"), 'update_time' => time() ]);
                }
            }
            if (!empty($save)) (new GoodsDay())->saveAll($save);

            // 添加统计
            CoreStatService::addStat($order['site_id'], ['hotel_order_money' => $order['order_money'], 'hotel_order_num' => 1]);

            Db::commit();

            // 如果存在超出库存的情况 自动退款
            if ($is_oversold) {
                $this->autoRefund($order);
            } else {
                // 发送支付成功通知
                (new NoticeService())->send($order['site_id'], 'tourism_order_pay', ['order_id' => $order['order_id'] ]);
                // 订单使用提醒
                $remind_time = strtotime( date('Y-m-d 09:00:00', strtotime("{$order['start_time']} - 1 day")) );
                if ($remind_time > time()) OrderUseRemind::dispatch([ 'site_id' => $order['site_id'], 'order_id' => $order['order_id'] ], secs: $remind_time - time());
            }

            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 订单超卖自动退款
     * @param int $site_id
     * @param string $out_trade_no
     * @param float $money
     * @return void
     */
    private function autoRefund(TourismOrder $order) {
        Db::startTrans();
        try {
            // 添加订单日志
            CoreOrderLogService::addLog($order['site_id'], $order['order_id'], OrderLogDict::ORDER_OVERSOLD, 'system', 0, OrderDict::getStatus(OrderDict::CLOSE));

            $service = new CoreOrderRefundService();
            // 生成退款记录
            $create_res = $service->create([
                'site_id' => $order['site_id'],
                'out_trade_no' => $order['out_trade_no'],
                'order_id' => $order['order_id'],
                'member_id' => $order['member_id'],
                'money' => $order['pay_money'],
                'order_type' => $order['order_type'],
                'source' => 'system'
            ]);
            // 自动退款
            $service->refund($order['site_id'], $create_res['refund_id']);

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 关闭订单
     * @param array $order_info
     * @return true
     */
    public function close(TourismOrder $order) {
        if (!in_array($order['order_status'], [ OrderDict::WAIT_PAY, OrderDict::WAIT_USE  ] )) throw new CommonException('ORDER_NOT_ALLOW_CLOSE');

        Db::startTrans();
        try {
            //关闭相关的支付
            (new CorePayService())->closeByTrade($order['site_id'], $order['order_type'], $order['order_id']);
            // 如果订单已支付 则扣除销量
            if ($order['order_status'] == OrderDict::WAIT_USE) {
                (new GoodsDay())->update([
                    'sell_num' => Db::raw("sell_num - {$order['num']}")
                ], [
                    ['goods_id', '=', $order['goods_id']],
                    ['time', '>=', strtotime($order['start_time'])],
                    ['time', '<=', strtotime($order['end_time'])]
                ]);
            }
            $order->order_status = OrderDict::CLOSE;
            $order->close_time = time();
            $order->is_enable_refund = 0;
            $order->save();
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
        $order = (new TourismOrder())->where([ ['order_id', '=', $order_id ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status != OrderDict::WAIT_PAY) return true;

        try {
            $this->close($order);
            // 添加订单日志
            CoreOrderLogService::addLog($order['site_id'], $order_id, OrderLogDict::ORDER_OVERTIME, 'system', 0, OrderDict::getStatus(OrderDict::CLOSE));
            // 发送订单关闭通知
            (new NoticeService())->send($order['site_id'], 'tourism_order_auto_close', [ 'order_id' => $order['order_id'] ]);
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }
}

