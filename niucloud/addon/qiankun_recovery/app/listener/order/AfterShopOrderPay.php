<?php

declare(strict_types=1);

namespace addon\qiankun_recovery\app\listener\order;


use addon\qiankun_recovery\app\model\Config;
use addon\qiankun_recovery\app\model\Order;
use app\model\member\Member;
use app\dict\member\MemberAccountTypeDict;
use app\service\core\member\CoreMemberAccountService;
use think\facade\Log;

/**
 * 订单支付完成后事件  计算佣金
 * Class AfterShopOrderPay
 * @package addon\qiankun_recovery\app\listener\order
 */
class AfterShopOrderPay
{
    public function handle($data)
    {
        Log::write('==========================qiankun_recovery===========================');
        Log::write(json_encode($data));

        // 推N返本
        /**
         * 查询推N返本设置
         * 如果在rule内，判断当前是第几个交易，读取对应配置给上级返佣
         * 如果全部返利完成，将执行后续奖励
         */
        $config = (new Config)->where([
            'site_id' => $data['site_id'],
        ])->find();
        $config['rules'] = json_decode($config['rules'], true);
        $config['type'] = intval($config['type'] ?? 0);

        // 当前订单写入推N返本订单，用户查询是否返本完成
        $orderInfo = (new \addon\shop\app\model\order\Order())->with([
            'orderGoods' => function ($query) {
                $query->where(['is_gift' => 0]);
            },
        ])->where(['order_no' => $data['order_data']['order_no']])->find();
        if (!$orderInfo) return true;
        foreach ($orderInfo['orderGoods'] as $orderGoods) {
            (new Order())->save([
                'site_id'        => $data['order_data']['site_id'],
                'order_id'       => $data['order_data']['order_id'],
                'order_no'       => $data['order_data']['order_no'],
                'order_goods_id' => $orderGoods['order_goods_id'],
                'member_id'      => $data['order_data']['member_id'],
                'goods_id'       => $orderGoods['goods_id'],
                'sku_id'         => $orderGoods['sku_id'],
                'rules'          => json_encode($config['rules']),
                'after'          => $config['after'],
                'type'           => $config['type'],
                'goods_price'    => $orderGoods['price'],
            ]);
        }

        $pid = (new Member())->where('member_id', $data['order_data']['member_id'])->value('pid', 0);
        if (!$pid) return true;

        $order = (new \addon\shop\app\model\order\Order())
            ->alias('o')
            ->join('shop_order_goods g', 'g.order_id=o.order_id')
            ->where(['o.order_no' => $data['order_data']['order_no'], 'o.site_id' => $data['site_id']])
            ->find();
        if ($config['type'] == 0) {
            // 按链接
            // 查询上级是否购买过该产品
            $parentBuy = (new Order())->where([
                'goods_id'  => $order['goods_id'],
                'member_id' => $pid,
            ])->order('is_full asc')->findOrEmpty();
            if ($parentBuy->isEmpty()) return true;
        } else if ($config['type'] == 1) {
            // 按规格
            // 查询上级是否购买过该属性
            $parentBuy = (new Order())->where([
                'goods_id'  => $order['goods_id'],
                'sku_id'    => $order['sku_id'],
                'member_id' => $pid,
            ])->order('is_full asc')->findOrEmpty();
            if ($parentBuy->isEmpty()) return true;
        }

        if ($parentBuy->is_full == 0 && isset($config['rules']) && $config['rules'] && isset($config['rules'][$parentBuy['current']])) {
            $ratio = $config['rules'][$parentBuy['current']]['commission'];
        } else {
            $parentBuy->is_full = 1;
            $ratio = $parentBuy->after;
        }

        if (isset($ratio) && $ratio > 0) {
            $money = $this->ratio2money($ratio, $parentBuy['goods_price']);
        }

        $parentBuy->current += 1;
        $parentBuy->save();
        // 更新会员的收益金额。
        if ($money > 0) {
            (new CoreMemberAccountService())->addLog($data['site_id'], $pid, MemberAccountTypeDict::COMMISSION, $money, 'qiankun_recovery', '推N返本奖励' . $money . '元余额', $orderInfo['order_id']);
        }
        return true;
    }

    private function ratio2money($ratio, $money, $scale = 2)
    {
        if ($ratio < 0 || $money < 0) {
            return 0;
        }

        $ratio = bcdiv((string)$ratio, "100", 6);
        $money = bcmul($ratio, $money, $scale);
        return $money;
    }
}