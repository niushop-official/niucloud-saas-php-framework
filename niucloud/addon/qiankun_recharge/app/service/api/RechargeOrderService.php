<?php

namespace addon\qiankun_recharge\app\service\api;

use addon\qiankun_recharge\app\model\options\Options;
use addon\qiankun_recharge\app\model\order\Order;
use addon\recharge\app\dict\RechargeOrderDict;
use addon\recharge\app\job\OrderCreateAfter;
use addon\recharge\app\model\RechargeOrder;
use addon\recharge\app\model\RechargeOrderItem;
use app\dict\pay\PayDict;
use app\service\core\pay\CorePayService;
use core\base\BaseApiService;
use core\exception\CommonException;
use Exception;
use think\facade\Db;

class RechargeOrderService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new Options();
    }

    /**
     * @param array $data
     * @return array
     * @throws Exception
     */
    public function recharge(array $data): array
    {
        $data['order_from'] = $this->channel;
        $data['member_id'] = $this->member_id;
        $data['site_id'] = $this->site_id;

        $rechargeOption = (new Options())->where('id', (int)$data['recharge_id'])->findOrEmpty()->toArray();
        $order_data = [
            'order_from' => $data['order_from'] ?? 'h5',
            'order_type' => 'qiankun_recharge',
            'order_status' => RechargeOrderDict::WAIT_PAY,
            'member_id' => $data['member_id'],
            'recharge_id' => $data['recharge_id'],
            'give_coupon' => $rechargeOption['give_coupon'] ?? '',
            'give_integral' => $rechargeOption['give_integral'] ?? 0,
            'give_price' => $rechargeOption['give_price'] ?? 0,
            'give_level' => $rechargeOption['give_level'] ?? 0,
            'ip' => request()->ip() ?? '',
            'member_message' => $data['member_message'] ?? '',
            'order_item_money' => $data['recharge_money'],
            'order_discount_money' => 0,
            'order_money' => $data['recharge_money'],
            'site_id' => $data['site_id'],
        ];
        Db::startTrans();
        try {
            //添加订单表
            $order_data['order_no'] = create_no('qk');
            $create_order = (new Order())->create($order_data);
            $order_id = $create_order->id;
            //添加订单支付表
            (new CorePayService())->create($data['site_id'], PayDict::MEMBER, $order_data['member_id'], $order_data['order_money'], $order_data['order_type'], $order_id, get_lang("dict_order.trade_type_recharge"));
            Db::commit();
            //返回订单信息
            return [
                'trade_type' => $order_data['order_type'],
                'trade_id' => $order_id,
            ];
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }
}