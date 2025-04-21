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

namespace addon\tourism\app\service\core\order\scenic;

use addon\tourism\app\dict\order\OrderDict;
use addon\tourism\app\dict\order\ScenicOrderDict;
use addon\tourism\app\dict\order\OrderLogDict;
use addon\tourism\app\job\OrderClose;
use addon\tourism\app\job\OrderUseRemind;
use addon\tourism\app\model\Goods;
use addon\tourism\app\model\GoodsDay;
use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\model\TourismOrderItem;
use addon\tourism\app\service\core\CoreGoodsService;
use addon\tourism\app\service\core\CoreStatService;
use addon\tourism\app\service\core\order\CoreOrderLogService;
use addon\tourism\app\service\core\order\CoreOrderRefundService;
use addon\tourism\app\service\core\order\CoreOrderService;
use addon\tourism\app\service\core\scenic\CoreScenicConfigService;
use app\service\core\notice\NoticeService;
use app\service\core\pay\CorePayService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;


/**
 * 门票订单流程
 * Class CoreRechargeOrderService
 * @package app\service\core\order
 */
class CoreScenicOrderService extends BaseCoreService
{
    protected $order_type = ScenicOrderDict::TYPE;

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

        $scenic_config = (new CoreScenicConfigService())->getConfig($data['site_id']);

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
            'start_time' => $data['reserve_time'],
            'end_time' => '',
            'days' => 1,
            'num' => $data['num'],
            'scenic_id' => $data['scenic_info']['scenic_id'],
            'goods_id' => $data['order_items'][0]['goods_id'],
            'goods_name' => $data['order_items'][0]['goods_name'],
            'full_goods_name' => $data['scenic_info']['scenic_name'] . ' '. $data['goods_info']['goods_name'],
            'goods_image' => $data['order_items'][0]['goods_image'],
            'auto_close_time' => (time() + ($scenic_config['order_close'] * 60)),
            'mobile' => $data['mobile']
        ];

        $result = (new CoreOrderService())->create($order_data, $data['order_items']);

        // 添加订单日志
        CoreOrderLogService::addLog($data['site_id'], $result['order_id'], OrderLogDict::ORDER_CREATE, 'member', $data['member_id'], OrderDict::getStatus(OrderDict::WAIT_PAY));
        // 添加订单超时关闭任务
        OrderClose::dispatch(['order_id' => $result['order_id'], 'order_type' => $order_data['order_type'] ], secs:($scenic_config['order_close'] * 60));

        return $result;
    }

    /**
     * @param array $data
     * @return void
     */
    public function calculate(array $data) {

        $core_goods_service = new CoreGoodsService();
        $member_info = $core_goods_service->getMemberInfo($data['member_id'], $data['site_id']);

        // 查询景点门票信息
        $scenic = $this->getScenicInfo($data['ticket_id'], $data['site_id']);
        // 查询门票独立定价信息
        $separate = $this->getScenicSeparateDays($data['ticket_id'], $data['reserve_time']);

        $sale_price = empty($separate) || $separate['is_set'] == 0 ? $scenic['price'] : $separate['price'];
        $sale_price = $core_goods_service->getMemberPrice($member_info, $scenic['member_discount'], $sale_price, $separate, $scenic['fixed_discount']);

        $is_can_sell = $this->checkStock($data['num'], $scenic, $separate);
        if ($this->scene == 'create') {
            if (!$is_can_sell) throw new CommonException('TICKET_STOCK_DEFICIENCY');
        }

        $day_time = strtotime($data['reserve_time']);
        $order_money = round($sale_price * $data['num'], 2);
        $items = [
            [
                'site_id' => $data['site_id'],
                'member_id' => $data['member_id'],
                'goods_id' => $data['ticket_id'],
                'price' => $sale_price,
                'goods_money' => $order_money,
                'num' => $data['num'],
                'year' => date('Y', $day_time),
                'month' => date('m', $day_time),
                'day' => date('d', $day_time),
                'time' => $day_time,
                'goods_name' => $scenic['goods_name'],
                'goods_image' => $scenic['scenic']['scenic_cover']
            ]
        ];

        $data['order_money'] = $order_money;
        $data['pay_money'] = $order_money;
        $data['order_items'] = $items;
        $data['scenic_info'] = $scenic['scenic'];
        unset($scenic['scenic']);
        $data['goods_info'] = $scenic;
        $data['is_sell_out'] = $is_can_sell ? 0 : 1;

        return $data;
    }

    /**
     * 查询景点门票信息
     * @param $goods_id
     * @param $site_id
     * @return void
     */
    private function getScenicInfo(int $goods_id, int $site_id) {
        $goods = (new Goods())->where([ [
            [ 'goods_id', '=', $goods_id ],
            [ 'site_id', '=', $site_id ],
            [ 'goods_type', '=', 'scenic' ],
            [ 'status', '=', 1]
        ]])->with([
            'scenic' => function($query) {
                $query->field('scenic_id,scenic_name,scenic_cover,scenic_level');
            }
        ])->field('goods_id,goods_name,goods_image,member_discount,fixed_discount,goods_cover,goods_attribute,price,stock,scenic_id,buy_info')->findOrEmpty();
        if ($goods->isEmpty()) throw new CommonException('TOURISM_TICKET_NOT_EXIST');

        return $goods->toArray();
    }

    /**
     * 查询预订时间独立设置信息
     * @param int $goods_id
     * @param string $reserve_time
     * @return array|array[]
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    private function getScenicSeparateDays(int $goods_id, string $reserve_time) {
        $goods_day = (new GoodsDay())->where([
            [ 'goods_id', '=', $goods_id ],
            [ 'time', '=', strtotime($reserve_time) ],
        ])->field('price,year,month,day,sell_num,time,stock_all,is_set,member_price')->findOrEmpty()->toArray();
        return $goods_day;
    }

    /**
     * 检验库存
     * @param int $num
     * @param array $scenic_info
     * @param array $day_info
     * @return void
     */
    private function checkStock(int $num, array $scenic_info, array $day_info) {
        $stock = $scenic_info['stock'];
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

        $scenic_config = (new CoreScenicConfigService())->getConfig($order['site_id']);

        Db::startTrans();
        try {
            // 修改订单
            $order->order_status = OrderDict::WAIT_USE;
            $order->pay_time = time();
            $order->verify_code = CoreOrderService::createVerifyCode($order->order_id);
            $order->is_enable_refund = $scenic_config['is_allow_refund'];
            $order->out_trade_no = $pay_info['out_trade_no'];
            $order->save();

            // 添加订单日志
            CoreOrderLogService::addLog($order['site_id'], $order['order_id'], OrderLogDict::ORDER_PAY, 'member', $order['member_id'], OrderDict::getStatus(OrderDict::WAIT_USE));

            $goods = (new Goods())->where([ [
                [ 'goods_id', '=', $order->goods_id ],
            ]])->field('stock')->find()->toArray();

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
                        'stock_all' => $goods['stock'],
                        'year' => $item['year'],
                        'month' => $item['month'],
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
            CoreStatService::addStat($order['site_id'], ['scenic_order_money' => $order['order_money'], 'scenic_order_num' => 1]);

            Db::commit();

            // 如果存在超出库存的情况 自动退款
            if ($is_oversold) {
                $this->autoRefund($order);
            } else {
                // 发送支付成功通知
                (new NoticeService())->send($order['site_id'], 'tourism_order_pay', ['order_id' => $order['order_id'] ]);
                // 订单使用提醒
                $remind_time = strtotime( date('Y-m-d 09:00:00', strtotime("{$order['start_time']} - 1 day")) );
                if ($remind_time > time()) OrderUseRemind::dispatch(['site_id' => $order['site_id'], 'order_id' => $order['order_id'] ], secs: $remind_time - time());
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
                'order_id' => $order['order_id'],
                'out_trade_no' => $order['out_trade_no'],
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
                    ['time', '=', strtotime($order['start_time'])]
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

