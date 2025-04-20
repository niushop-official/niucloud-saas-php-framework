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

use addon\vipcard\app\dict\MemberCardDict;
use addon\vipcard\app\dict\order\OrderRefundLogDict;
use addon\vipcard\app\dict\order\RefundDict;
use addon\vipcard\app\model\MemberCard;
use addon\vipcard\app\model\OrderRefund;
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
                $refund->status = RefundDict::REFUND_COMPLETED;
                $refund->save();
                $refund->mainOrder->refund_status = RefundDict::REFUND_COMPLETED;
                $refund->mainOrder->save();

                (new MemberCard())->update(['status' => MemberCardDict::REFUNDED ], [ ['order_id', '=', $refund->order_id ] ]);

                // 添加维权日志
                CoreOrderRefundLogService::addLog($refund['site_id'], $refund['refund_id'], OrderRefundLogDict::COMPLETE, 'system');

                // 发送退款成功提醒通知
                (new NoticeService())->send($refund['site_id'], 'vipcard_refund_success', ['refund_id' => $refund['refund_id'] ]);

                CoreStatService::addStat($refund['site_id'], ['refund_num' => 1, 'refund_money' => $refund->money ]);

                (new CoreOrderService())->close($refund->mainOrder);

                Db::commit();
                return true;
            } catch (\Exception $e) {
                Db::rollback();
                Log::write("卡项订单退款成功事件处理错误，退款单号：{$refund_no} 错误原因：" . $e->getMessage().$e->getFile().$e->getLine());
                return false;
            }
        }
    }
}
