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

namespace addon\shop_fenxiao\app\service\core\settlement;

use addon\shop_fenxiao\app\dict\fenxiao\FenxiaoSettlementDict;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoOrder;
use addon\shop_fenxiao\app\model\fenxiao\FenxiaoOrderGoods;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoDataService;
use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoOrderService;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseCoreService;


/**
 * 佣金订单
 */
class CoreOrderSettlementService extends BaseCoreService
{

    /**
     * 将佣金记录设置为已退款
     * @param $data
     * @return true
     */
    public function refund($data)
    {
        $refund_data = $data['refund_data'];
        $order_goods_id = $refund_data['order_goods_id'];
        $site_id = $refund_data['site_id'];
        (new FenxiaoOrderGoods())->where(
            [
                ['site_id', '=', $site_id],
                ['order_goods_id', '=', $order_goods_id],
//                ['is_settlement', '=', 0],//查询待结算的
            ]
        )->update([
            'is_refund' => 1
        ]);
        return true;
    }

    /**
     * 佣金订单结算
     * @param array $data
     */
    public function settlement(array $data)
    {
        $order_data = $data['order_data'];
        $site_id = $order_data['site_id'];
        $order_id = $order_data['order_id'];
        $fenxiao_order_goods_list = (new FenxiaoOrderGoods())->where(
            [
                ['site_id', '=', $site_id],
                ['order_id', '=', $order_id],
                ['is_settlement', '=', 0],//查询待结算的
                ['is_refund', '=', 0]
            ]
        )->select()->toArray();
        $commission_list = [];
        if (!empty($fenxiao_order_goods_list)) {
            foreach ($fenxiao_order_goods_list as $fenxiao_order_goods) {
                $fenxiao_member_id = $fenxiao_order_goods['fenxiao_member_id'];
                //初始化
                if (!isset($commission_list[$fenxiao_member_id])) {
                    $commission_list[$fenxiao_member_id] = [
                        'shop_fenxiao' => 0,
                        'shop_fenxiao_team' => 0,
                        'shop_fenxiao_agent' => 0
                    ];
                }
                //分销佣金
                if ($fenxiao_order_goods['commission_type'] == FenxiaoSettlementDict::FENXIAO) {
                    $commission_list[$fenxiao_member_id]['shop_fenxiao'] += $fenxiao_order_goods['commission'];
                }
                //团队分红
                if ($fenxiao_order_goods['commission_type'] == FenxiaoSettlementDict::TEAM) {
                    $commission_list[$fenxiao_member_id]['shop_fenxiao_team'] += $fenxiao_order_goods['commission'];
                }
                //渠道代理
                if ($fenxiao_order_goods['commission_type'] == FenxiaoSettlementDict::AGENT) {
                    $commission_list[$fenxiao_member_id]['shop_fenxiao_agent'] += $fenxiao_order_goods['commission'];
                }
            }
        }

        //添加佣金记录
        if (!empty($commission_list)) {
            //addLog(int $site_id, int $member_id, string $account_type, $account_data, string $from_type, string $memo, $related_id = 0)
            $core_member_account = new CoreMemberAccountService();
            $core_fenxiao_order = new CoreFenxiaoOrderService();
            foreach ($commission_list as $k => $v) {
                $item_member_id = $k;
                //分销佣金发放
                if ($v['shop_fenxiao'] > 0) {
                    //累加分销商分销佣金
                    CoreFenxiaoDataService::setCommission($site_id, $item_member_id, $v['shop_fenxiao'], 'fenxiao', $order_id);
//                    $core_fenxiao_order->incCommission($site_id, $item_member_id, 'fenxiao', $v['shop_fenxiao']);
//                    $core_member_account->addLog($site_id, $item_member_id, MemberAccountTypeDict:: COMMISSION, $v['shop_fenxiao'], 'shop_fenxiao', '分销佣金结算,订单编号：'.$order_data['order_no'], $order_id);
                }

                //团队分红发放
                if ($v['shop_fenxiao_team'] > 0) {
                    //累加分团队分红佣金
                    CoreFenxiaoDataService::setCommission($site_id, $item_member_id, $v['shop_fenxiao_team'], 'team', $order_id);
//                    $core_fenxiao_order->incCommission($site_id, $item_member_id, 'team', $v['shop_fenxiao_team']);
//                    $core_member_account->addLog($site_id, $item_member_id, MemberAccountTypeDict:: COMMISSION, $v['shop_fenxiao_team'], 'shop_fenxiao_team', '团队分红结算,订单编号：'.$order_data['order_no'], $order_id);
                }

                //渠道代理发放
                if ($v['shop_fenxiao_agent'] > 0) {
                    //累加渠道代理佣金
                    CoreFenxiaoDataService::setCommission($site_id, $item_member_id, $v['shop_fenxiao_agent'], 'agent', $order_id);
//                    $core_fenxiao_order->incCommission($site_id, $item_member_id, 'agent', $v['shop_fenxiao_agent']);
//                    $core_member_account->addLog($site_id, $item_member_id, MemberAccountTypeDict:: COMMISSION, $v['shop_fenxiao_agent'], 'shop_fenxiao_agent', '渠道代理结算,订单编号：'.$order_data['order_no'], $order_id);
                }

            }

            //将结算记录设置为已结算
            (new FenxiaoOrderGoods())->where(
                [
                    ['site_id', '=', $site_id],
                    ['order_id', '=', $order_id],
//                ['is_settlement', '=', 0],//查询待结算的
                ]
            )->update([
                'is_settlement' => 1,
                'settlement_time' => time()
            ]);

            //将结算订单设置为已结算
            (new FenxiaoOrder())->where(
                [
                    ['site_id', '=', $site_id],
                    ['order_id', '=', $order_id],
//                ['is_settlement', '=', 0],//查询待结算的
                ]
            )->update([
                'is_settlement' => 1,
                'settlement_time' => time()
            ]);
        }
        return true;
    }

}
