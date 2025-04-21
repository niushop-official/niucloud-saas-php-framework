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
use addon\o2o\app\dict\order\OrderRefundLogDict;
use addon\o2o\app\dict\order\RefundDict;
use addon\o2o\app\model\Order;
use addon\o2o\app\model\OrderItem;
use addon\o2o\app\model\OrderRefund;
use app\service\admin\pay\RefundService;
use app\service\core\notice\NoticeService;
use core\base\BaseCoreService;
use think\facade\Db;
use think\facade\Log;

/**
 * 订单维权
 * Class CoreOrderRefundService
 */
class CoreOrderRefundService extends BaseCoreService
{
    /**
     * 退款成功
     * @param string $refund_no
     * @return void
     */
    public function refundSuccess(string $refund_no) {
        $refund = (new OrderRefund())->where([ [ 'refund_no', '=', $refund_no ] ])->findOrEmpty();

        if (!$refund->isEmpty()) {
            Db::startTrans();
            try {
                $pay_refund = (new RefundService())->getDetail($refund_no);
                $refund->status = RefundDict::REFUND_COMPLETED;
                $refund->money = $pay_refund['money'] ?? 0;
                $refund->transfer_time = time();
                $refund->save();

                (new OrderItem())->update(['refund_status' => RefundDict::REFUND_COMPLETED ], [ ['order_item_id', '=', $refund->order_item_id ] ]);

                (new Order())->update(['refund_status' => RefundDict::REFUND_COMPLETED, 'order_status' => OrderDict::CLOSE], [ ['order_id', '=', $refund->order_id ] ]);

                // 添加订单日志
                CoreOrderLogService::addLog($refund['site_id'], $refund->order_id, OrderLogDict::ORDER_REFUND, 'system', 0, OrderDict::getStatus(OrderDict::CLOSE));

                // 添加维权日志
                CoreOrderRefundLogService::addLog($refund['site_id'], $refund['refund_id'], OrderRefundLogDict::COMPLETE, 'system');

                CoreStatService::addStat($refund['site_id'], ['refund_num' => 1, 'refund_money' => $pay_refund['money'] ?? 0 ]);

                // 发送退款成功提醒通知
                (new NoticeService())->send($refund['site_id'], 'o2o_refund_success', ['refund_id' => $refund['refund_id'] ]);

                //商品销量减少
                $item_info = (new OrderItem())->where([ ['order_item_id', '=', $refund['order_item_id']] ])->field('item_id, num, goods_id')->findOrEmpty()->toArray();
                if($item_info) {
                    $core_goods_sale_num_service = new CoreGoodsSaleNumService();
                    $core_goods_sale_num_service->dec([
                        'num' => $item_info['num'],
                        'goods_id' => $item_info['goods_id'],
                        'sku_id' => $item_info['item_id']
                    ]);
                }

                Db::commit();
                return true;
            } catch (\Exception $e) {
                Db::rollback();
                Log::write("o2o订单退款成功事件处理错误，退款单号：{$refund_no} 错误原因：" . $e->getMessage().$e->getFile().$e->getLine());
                return false;
            }
        }
    }
}
