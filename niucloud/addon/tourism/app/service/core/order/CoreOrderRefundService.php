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

namespace addon\tourism\app\service\core\order;

use addon\tourism\app\dict\order\HotelOrderDict;
use addon\tourism\app\dict\order\OrderRefundLogDict;
use addon\tourism\app\dict\order\RefundDict;
use addon\tourism\app\dict\order\ScenicOrderDict;
use addon\tourism\app\dict\order\WayOrderDict;
use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\model\TourismOrderRefund;
use addon\tourism\app\service\core\CoreStatService;
use addon\tourism\app\service\core\order\hotel\CoreHotelRefundService;
use addon\tourism\app\service\core\order\scenic\CoreScenicRefundService;
use addon\tourism\app\service\core\order\way\CoreWayRefundService;
use app\service\core\notice\NoticeService;
use app\service\core\pay\CoreRefundService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use think\facade\Db;
use think\facade\Log;

/**
 * 旅游订单退款
 */
class CoreOrderRefundService extends BaseCoreService
{

    /**
     * 创建退款单
     * @param array $order_data
     * @param array $order_items
     * @return array
     */
    public function create(array $data)
    {
        Db::startTrans();
        try {
            //添加退款单据表
            $refund_no = (new CoreRefundService())->create($data['site_id'], $data['out_trade_no'], $data['money'], $data['reason'] ?? '');
            $create_model = (new TourismOrderRefund())->create([
                'site_id' => $data['site_id'],
                'order_id' => $data['order_id'],
                'member_id' => $data['member_id'] ?? 0,
                'refund_no' => $refund_no,
                'money' => $data['money'],
                'commission' => $data['commission'],
                'status' => RefundDict::WAIT_REFUND,
                'create_time' => time(),
                'order_type' => $data['order_type'],
                'source' => $data['source']
            ]);

            (new TourismOrder())->update(['refund_status' => RefundDict::WAIT_REFUND, 'refund_no' => $refund_no ], [ ['order_id', '=', $data['order_id'] ] ]);

            Db::commit();

            return [
                'refund_id' => $create_model->refund_id,
                'refund_no' => $refund_no
            ];
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * @param int $site_id
     * @param int $member_id
     * @param int $refund_id
     * @return void
     */
    public function cancel(int $site_id, int $member_id, int $refund_id) {
        $refund = (new TourismOrderRefund())->where([ [ 'refund_id', '=', $refund_id ], [ 'site_id', '=', $site_id ], ['member_id', '=', $member_id] ])->findOrEmpty();
        if ($refund->isEmpty()) throw new CommonException('REFUND_NOT_EXIST');
        if ($refund->status != RefundDict::WAIT_REFUND) throw new CommonException('REFUND_CANNOT_CANCEL');

        $refund->status = RefundDict::CANCEL;
        $refund->save();
        $refund->tourismOrder->refund_status = '';
        $refund->tourismOrder->refund_no = '';
        $refund->tourismOrder->save();

        return true;
    }

    /**
     * 拒绝
     * @param int $refund_id
     * @param int $site_id
     * @param string $refuse_reason
     * @return true
     */
    public function refuse(int $site_id, int $refund_id, string $refuse_reason = '') {
        $refund = (new TourismOrderRefund())->where([ [ 'refund_id', '=', $refund_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
        if ($refund->isEmpty()) throw new CommonException('REFUND_NOT_EXIST');
        if ($refund->status != RefundDict::WAIT_REFUND) throw new CommonException('REFUND_STATUS_ERROR');

        $refund->status = RefundDict::REFUND_REFUSE;
        $refund->audit_time = time();
        $refund->refuse_reason = $refuse_reason;
        $refund->save();
        $refund->tourismOrder->refund_status = RefundDict::REFUND_REFUSE;
        $refund->tourismOrder->save();

        // 发送退款拒绝提醒通知
        (new NoticeService())->send($refund['site_id'], 'tourism_refund_refuse', ['refund_id' => $refund_id ]);

        return true;
    }

    /**
     * 退款
     * @param int $site_id
     * @param int $refund_id
     * @return true|null
     */
    public function refund(int $site_id, int $refund_id) {
        $refund = (new TourismOrderRefund())->where([ [ 'refund_id', '=', $refund_id ], [ 'site_id', '=', $site_id ] ])->findOrEmpty();
        if ($refund->isEmpty()) throw new CommonException('REFUND_NOT_EXIST');
        if ($refund->status != RefundDict::WAIT_REFUND) throw new CommonException('REFUND_STATUS_ERROR');

        $refund->status = RefundDict::REFUNDING;
        $refund->save();
        $refund->tourismOrder->refund_status = RefundDict::REFUNDING;
        $refund->tourismOrder->save();

        $res = (new CoreRefundService())->refund($site_id, $refund->refund_no);

        return $res;
    }

    /**
     * 退款成功
     * @param string $refund_no
     * @return void
     */
    public function refundSuccess(string $refund_no) {
        $refund = (new TourismOrderRefund())->where([ [ 'refund_no', '=', $refund_no ] ])->findOrEmpty();
        if (!$refund->isEmpty()) {
            Db::startTrans();
            try {
                $refund->transfer_time = time();
                $refund->status = RefundDict::REFUND_COMPLETED;
                $refund->save();
                $refund->tourismOrder->refund_status = RefundDict::REFUND_COMPLETED;
                $refund->tourismOrder->save();

                // 添加维权日志
                CoreOrderRefundLogService::addLog($refund['site_id'], $refund['refund_id'], OrderRefundLogDict::COMPLETE, 'system');

                // 添加统计
                CoreStatService::addStat($refund['site_id'], ['refund_money' => $refund['money'], 'refund_num' => 1]);

                switch ($refund->order_type) {
                    case HotelOrderDict::TYPE:
                        (new CoreHotelRefundService())->refundSuccess($refund->toArray());
                        break;
                    case ScenicOrderDict::TYPE:
                        (new CoreScenicRefundService())->refundSuccess($refund->toArray());
                        break;
                    case WayOrderDict::TYPE:
                        (new CoreWayRefundService())->refundSuccess($refund->toArray());
                        break;
                }

                // 发送退款成功提醒通知
                (new NoticeService())->send($refund['site_id'], 'tourism_refund_success', ['refund_id' => $refund['refund_id'] ]);

                Db::commit();
                return true;
            } catch (\Exception $e) {
                Db::rollback();
                Log::write("旅游订单退款成功事件处理错误，退款单号：{$refund_no} 错误原因：" . $e->getMessage().$e->getFile().$e->getLine());
                return false;
            }
        }
    }


}

