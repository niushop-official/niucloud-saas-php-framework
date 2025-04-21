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

namespace addon\vipcard\app\service\api;

use addon\vipcard\app\dict\order\OrderRefundLogDict;
use addon\vipcard\app\dict\order\RefundDict;
use addon\vipcard\app\model\Order;
use addon\vipcard\app\model\OrderRefund;
use addon\vipcard\app\service\core\CoreOrderRefundLogService;
use app\service\core\pay\CoreRefundService;
use core\base\BaseApiService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 退款服务层
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
    public function apply(int $order_id) {
        $order = (new Order())->where([ ['order_id', '=', $order_id], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ]])->append(['order_status_info'])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if (!$order->order_status_info['is_refund']) throw new CommonException('NOT_ALLOW_APPLY_REFUND');
        if (!in_array($order->refund_status, ['', RefundDict::CANCEL, RefundDict::REFUND_REFUSE])) throw new CommonException('NOT_ALLOW_APPLY_REFUND');

        Db::startTrans();
        try {
            //添加退款单据表
            $refund_no = (new CoreRefundService())->create($order['site_id'], $order['out_trade_no'], $order['pay_money'], '');

            $create_model = (new OrderRefund())->create([
                'site_id' => $order['site_id'],
                'order_id' => $order['order_id'],
                'member_id' => $this->member_id,
                'refund_no' => $refund_no,
                'money' => $order['pay_money'],
                'status' => RefundDict::WAIT_REFUND,
                'create_time' => time(),
                'source' => 'member'
            ]);

            (new Order())->update(['refund_status' => RefundDict::WAIT_REFUND, 'refund_no' => $refund_no ], [ ['order_id', '=', $order['order_id'] ] ]);

            // 添加维权日志
            CoreOrderRefundLogService::addLog($order['site_id'], $create_model->refund_id, OrderRefundLogDict::APPLY, 'member', $this->member_id);

            Db::commit();
            return $create_model->refund_id;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 撤销退款
     * @param int $refund_id
     * @return void
     */
    public function cancel(int $refund_id){
        $refund = (new OrderRefund())->where([ [ 'refund_id', '=', $refund_id ], [ 'site_id', '=', $this->site_id ], ['member_id', '=', $this->member_id] ])->findOrEmpty();
        if ($refund->isEmpty()) throw new CommonException('REFUND_NOT_EXIST');
        if ($refund->status != RefundDict::WAIT_REFUND) throw new CommonException('REFUND_CANNOT_CANCEL');

        $refund->status = RefundDict::CANCEL;
        $refund->save();
        $refund->mainOrder->refund_status = '';
        $refund->mainOrder->refund_no = '';
        $refund->mainOrder->save();

        return true;
    }

    /**
     * 查询退款详情
     * @param int $refund_id
     * @return array
     */
    public function getDetail(int $refund_id){
        $field = 'refund_id,site_id,order_id,member_id,refund_no,money,status,create_time,transfer_time,refuse_reason';

        $detail = (new OrderRefund())->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ], ['refund_id', '=', $refund_id]])->field($field)->with([ 'refund_log' => function($query){
            $query->field('refund_id, uid, action, action_time, action_way');
        }])->append(['status_name', 'refund_log.nickname', 'refund_log.action_name'])->findOrEmpty()->toArray();

        return $detail;
    }

}