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

namespace addon\tourism\app\service\api;

use addon\tourism\app\dict\order\HotelOrderDict;
use addon\tourism\app\dict\order\OrderDict;
use addon\tourism\app\dict\order\OrderRefundLogDict;
use addon\tourism\app\dict\order\RefundDict;
use addon\tourism\app\dict\order\ScenicOrderDict;
use addon\tourism\app\dict\order\WayOrderDict;
use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\model\TourismOrderRefund;
use addon\tourism\app\service\core\order\CoreOrderRefundLogService;
use addon\tourism\app\service\core\order\CoreOrderRefundService;
use addon\tourism\app\service\core\order\hotel\CoreHotelRefundService;
use addon\tourism\app\service\core\order\scenic\CoreScenicRefundService;
use addon\tourism\app\service\core\order\way\CoreWayRefundService;
use core\base\BaseApiService;
use core\exception\CommonException;

/**
 * 旅游订单退款服务层
 * Class RechargeOrderService
 * @package app\service\api\order
 */
class RefundService extends BaseApiService
{
    /**
     * 申请退款
     * @param int $order_id
     * @return void
     */
    public function apply(int $order_id)
    {
        $order = (new TourismOrder())->where([ ['order_id', '=', $order_id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ]])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status != OrderDict::WAIT_USE || !$order->is_enable_refund) throw new CommonException('NOT_ALLOW_APPLY_REFUND');
        if (!in_array($order->refund_status, ['', RefundDict::CANCEL, RefundDict::REFUND_REFUSE])) throw new CommonException('NOT_ALLOW_APPLY_REFUND');

        switch ($order['order_type']) {
            case HotelOrderDict::TYPE:
                $create_res = (new CoreHotelRefundService())->apply($order->toArray());
                break;
            case ScenicOrderDict::TYPE:
                $create_res = (new CoreScenicRefundService())->apply($order->toArray());
                break;
            case WayOrderDict::TYPE:
                $create_res = (new CoreWayRefundService())->apply($order->toArray());
                break;
        }

        // 添加维权日志
        CoreOrderRefundLogService::addLog($order['site_id'], $create_res['refund_id'], OrderRefundLogDict::APPLY, 'member', $this->member_id);

        return $create_res;
    }

    /**
     * 取消退款申请
     * @param int $refund_id
     * @return true|null
     */
    public function cancel(int $refund_id) {
        return (new CoreOrderRefundService())->cancel($this->site_id, $this->member_id, $refund_id);
    }

    /**
     * 退款详情
     * @param int $refund_id
     * @return array
     */
    public function detail(int $refund_id){
        $field = 'refund_id,site_id,order_id,member_id,refund_no,money,commission,status,create_time,transfer_time,order_type,refuse_reason';

        $detail = (new TourismOrderRefund())->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ], ['refund_id', '=', $refund_id]])->field($field)->with([ 'refund_log' => function($query){
            $query->field('refund_id, uid, action, action_time, action_way');
        }])->append(['status_name', 'refund_log.nickname', 'refund_log.action_name'])->findOrEmpty()->toArray();

        return $detail;
    }
}
