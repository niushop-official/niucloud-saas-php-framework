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

namespace addon\o2o\app\service\admin;

use addon\o2o\app\dict\order\OrderRefundLogDict;
use addon\o2o\app\dict\order\RefundDict;
use addon\o2o\app\model\OrderItem;
use addon\o2o\app\model\OrderRefund;
use addon\o2o\app\service\core\CoreOrderRefundLogService;
use addon\o2o\app\service\core\CoreOrderRefundService;
use app\model\pay\Refund;
use app\service\core\notice\NoticeService;
use app\service\core\pay\CoreRefundService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\facade\Db;

/**
 *
 * Class RefundService
 */
class RefundService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderRefund();
    }

    /**
     * 订单维权记录分页列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where)
    {
        $field = 'refund_id, order_id, site_id, member_id, refund_no, status, create_time, audit_time, transfer_time, money,refuse_reason,reason,apply_money,remark,voucher';
        $order = 'create_time desc';
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id], ['source', '=', 'member' ] ])->withSearch([ 'refund_no', 'create_time', 'status'], $where)->field($field)->with([ 'order_item' => function($query){
            $query->field('order_id,item_type,order_item_id,item_name,item_image,unit,price,item_money,refund_no,refund_status')->append([ 'item_image_thumb_small' ]);
        },'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }])->order($order)->append(['status_name']);
        $list = $this->pageQuery($search_model);
        return $list;

    }

    /**
     * 订单维权记录详情
     * @param array $where
     * @return mixed
     */
    public function getDetail(string $refund_no)
    {
        $field = 'refund_id, order_item_id,order_id, member_id, refund_no, status, create_time, audit_time, transfer_time, money,refuse_reason,reason,apply_money,remark,voucher';
        return $this->model->where([ ['refund_no', '=', $refund_no ],['site_id', '=', $this->site_id], ['source', '=', 'member' ] ])->field($field)->with([ 'order_item' => function ($query){
            $query->field('order_id,site_id,item_type,order_item_id,item_name,item_image,unit,price,item_money,refund_no,refund_status')->append([ 'item_image_thumb_small' ]);
        }, 'refund_log' => function($query){
            $query->field('refund_id, action, action_time, action_way, uid')->append(['nickname', 'action_name']);
        }])->append(['status_name'])->findOrEmpty()->toArray();
    }

    public function getStatus() {
        return RefundDict::getRefundStatus();
    }

    /**
     * 拒绝已退款
     * @param int $refund_id
     * @param string $refuse_reason
     * @return true
     */
    public function refuse(int $refund_id, string $refuse_reason = '') {
        $refund = (new OrderRefund())->where([ [ 'refund_id', '=', $refund_id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty();
        if ($refund->isEmpty()) throw new CommonException('REFUND_NOT_EXIST');
        if ($refund->status != RefundDict::WAIT_REFUND) throw new CommonException('REFUND_STATUS_ERROR');

        $refund->status = RefundDict::REFUND_REFUSE;
        $refund->audit_time = time();
        $refund->refuse_reason = $refuse_reason;
        $refund->save();
        (new OrderItem())->update(['refund_status' => RefundDict::REFUND_REFUSE ], [ ['order_item_id', '=', $refund->order_item_id ] ]);

        // 添加维权日志
        CoreOrderRefundLogService::addLog($this->site_id, $refund_id, OrderRefundLogDict::REFUSE, 'user', $this->uid);

        // 发送退款拒绝提醒通知
        (new NoticeService())->send($refund['site_id'], 'o2o_refund_refuse', ['refund_id' => $refund_id ]);

        (new Refund())->where([ ['refund_no', '=', $refund->refund_no] ])->delete();
        return true;
    }


    /**
     * 退款
     * @param int $refund_id
     * @param float $money
     * @return true
     */
    public function refund(int $refund_id, float $money) {
        $refund = (new OrderRefund())->where([ [ 'refund_id', '=', $refund_id ], [ 'site_id', '=', $this->site_id ] ])->findOrEmpty();
        if ($refund->isEmpty()) throw new CommonException('REFUND_NOT_EXIST');

        if ($refund->status != RefundDict::WAIT_REFUND) throw new CommonException('REFUND_STATUS_ERROR');
        if (bccomp($money, $refund->orderMain->order_money, 2) == 1) throw new CommonException('REFUND_MONEY_CANNOT_GT_PAYMONEY');

        if($refund->apply_money <= 0 && $money > 0) throw new CommonException('REFUND_MONEY_NOT_GT_APPLY_MONEY');

        if($refund->apply_money > 0 && $money <= 0) throw new CommonException('REFUND_MONEY_GT_ZERO');

        Db::startTrans();
        try {
            // 添加维权日志
            CoreOrderRefundLogService::addLog($this->site_id, $refund_id, OrderRefundLogDict::REFUND, 'user', $this->uid);

            $status = RefundDict::REFUNDING;

            (new OrderRefund())->where([ [ 'refund_id', '=', $refund_id ], [ 'site_id', '=', $this->site_id ] ])->update([
                'money' => $money,
                'status' => $status
            ]);

            (new OrderItem())->update(['refund_status' => $status ], [ ['order_item_id', '=', $refund->order_item_id ] ]);

            (new Refund())->update(['money' => $money], [ ['refund_no', '=', $refund->refund_no] ]);

            //金额为0，直接完成
            if($money > 0){
                (new CoreRefundService())->refund($this->site_id, $refund->refund_no);
            }else{
                (new CoreOrderRefundService())->refundSuccess($refund->refund_no);
            }

            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

}
