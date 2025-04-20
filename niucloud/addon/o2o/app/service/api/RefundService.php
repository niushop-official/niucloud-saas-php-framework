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

namespace addon\o2o\app\service\api;

use addon\o2o\app\dict\order\OrderRefundLogDict;
use addon\o2o\app\dict\order\RefundDict;
use addon\o2o\app\model\Order;
use addon\o2o\app\model\OrderItem;
use addon\o2o\app\model\OrderRefund;
use addon\o2o\app\model\Technician;
use addon\o2o\app\service\core\CoreOrderRefundLogService;
use addon\o2o\app\service\core\CoreOrderRefundService;
use app\service\core\pay\CoreRefundService;
use core\base\BaseApiService;
use core\exception\ApiException;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 退款服务层
 * Class RechargeOrderService
 * @package app\service\api
 */
class RefundService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new OrderRefund();
    }

    /**
     * 申请退款
     * @param array $data
     * @return void
     */
    public function apply(array $data) {
        $order = (new Order())->where([ ['order_id', '=', $data['order_id']], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ]])->append(['order_status_info'])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if (!$order->order_status_info['is_refund']) throw new CommonException('NOT_ALLOW_APPLY_REFUND');

        $order_item = (new OrderItem())->where([ ['order_id', '=', $data['order_id']], ['site_id', '=', $this->site_id], ['order_item_id', '=', $data['order_item_id']] ])->findOrEmpty();

        if (!$order_item->is_enable_refund) throw new CommonException('O2O_ORDER_IS_NOT_ENABLE_REFUND');
        if (!in_array($order_item->refund_status, ['', RefundDict::CANCEL])) throw new CommonException('O2O_ORDER_IS_NOT_ENABLE_REFUND');

        Db::startTrans();
        try {

            //退款金额不能大于可退款总额
            if ($data['apply_money'] > ($order_item['item_money'])) throw new ApiException('O2O_ORDER_REFUND_MONEY_GT_ORDER_MONEY');//退款金额不能大于可退款总额

            $order_refund_no = create_no();
            if($data['apply_money'] > 0){
                $order_refund_no = (new CoreRefundService())->create($this->site_id, $order->out_trade_no, $data['apply_money'], $data['remark'] ?? '');
            }

            $reason = $data['reason'];
            $insert_data = array(
                'order_id' => $data['order_id'],
                'order_item_id' => $data['order_item_id'],
                'site_id' => $this->site_id,
                'refund_no' => $order_refund_no,
                'reason' => $reason,
                'member_id' => $this->member_id,
                'apply_money' => $data['apply_money'],
                'status' => RefundDict::WAIT_REFUND,
                'remark' => $data['remark'],
                'voucher' => $data['voucher'],
                'create_time' => time(),
                'source' => 'member'
            );
            $res = $this->model->create($insert_data);

            // 添加维权日志
            CoreOrderRefundLogService::addLog($order['site_id'], $res->refund_id, OrderRefundLogDict::APPLY, 'member', $this->member_id);
            //将订单项的退款单号覆盖
            $order_item->refund_no = $order_refund_no;
            $order_item->refund_status = RefundDict::WAIT_REFUND;
            $order_item->save();

            //金额为0，直接完成
            if($data['apply_money'] <= 0){
                (new CoreOrderRefundService())->refundSuccess($order_refund_no);
            }

            Db::commit();
            return $res->refund_id;
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

        (new OrderItem())->update(['refund_status' => RefundDict::CANCEL ], [ ['order_item_id', '=', $refund->order_item_id ] ]);
        // 添加维权日志
        CoreOrderRefundLogService::addLog($refund->site_id, $refund->refund_id, OrderRefundLogDict::CANCEL, 'member', $this->member_id);
        return true;
    }

    /**
     * 查询退款详情
     * @param string $refund_no
     * @return array
     */
    public function getDetail(string $refund_no){
        $field = 'refund_id,site_id,order_id,order_item_id,member_id,refund_no,apply_money,money,status,create_time,transfer_time,refuse_reason,source,reason,remark,voucher';

        $detail = (new OrderRefund())->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ], ['refund_no', '=', $refund_no]])->field($field)->with([ 'refund_log' => function($query){
            $query->field('refund_id, uid, action, action_time, action_way')->append(['nickname', 'action_name'])->order('id', 'desc');
        }, 'order_item' => function($query) {
            $query->field('order_item_id, site_id, order_id, member_id, goods_id, item_id, item_type, item_name, item_image, unit, price, num, refund_no,refund_status')->append([ 'item_image_thumb_small','refund_status_name' ]);
        },])->append(['status_name'])->findOrEmpty()->toArray();

        return $detail;
    }

    /**
     * 分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        $field = 'refund_id,site_id,order_id,order_item_id,member_id,refund_no,apply_money,money,status,create_time,transfer_time,refuse_reason,source,reason,remark,voucher';
        $order = 'refund_id desc';

        $search_model = $this->model
            ->where([ ['site_id', '=', $this->site_id ], ['member_id', '=', $this->member_id ] ])
            ->withSearch([ 'status' ], $where)
            ->field($field)
            ->with(
                [
                    'order_item' => function($query) {
                        $query->field('order_item_id, site_id, order_id, member_id, goods_id, item_id, item_type, item_name, item_image, unit, price, num')->append([ 'item_image_thumb_small' ]);
                    },
                ])
            ->order($order)->append([ 'status_name' ]);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 退款状态
     * @return array|array[]
     */
    public function getStatus() {
        return RefundDict::getRefundStatus();
    }
    /**
     * 退款状态
     * @return array|array[]
     */
    public function getRefundReason() {
        return RefundDict::getRefundReason();
    }

    /**
     * 根据订单号，站点ID查询订单详情
     * @param string $refund_no
     * @return array
     */
    public function getOrderDetail(string $refund_no){

        $refundOrderInfo = (new OrderRefund())->where([ ['site_id', '=', $this->site_id], ['refund_no', '=', $refund_no]])->findOrEmpty()->toArray();
        if(!empty($refundOrderInfo)) {
           $technician_info = (new Technician())->field('id,site_id,member_id,name,age,sex,mobile,working_age,status')->where([['member_id','=',$this->member_id], ['site_id', '=', $this->site_id]])->findOrEmpty()->toArray();
           $technician_id = $technician_info['id'] ?? 0;
           if(empty($technician_id)) throw new CommonException('技师未找到');

           $orderInfo = (new Order())->where([ ['site_id', '=', $this->site_id], ['order_id', '=', $refundOrderInfo['order_id']],['technician_id' ,'=', $technician_info['id']]])->findOrEmpty()->toArray();
           if(empty($orderInfo)) {
               throw new CommonException('REFUND_NOT_EXIST');
           }else{
               $field = 'refund_id,site_id,order_id,order_item_id,member_id,refund_no,apply_money,money,status,create_time,transfer_time,refuse_reason,source,reason,remark,voucher';
               $detail = (new OrderRefund())->where([ ['site_id', '=', $this->site_id], ['refund_no', '=', $refund_no]])->field($field)->with([ 'refund_log' => function($query){
                   $query->field('refund_id, uid, action, action_time, action_way')->append(['nickname', 'action_name'])->order('id', 'desc');
               }, 'order_item' => function($query) {
                   $query->field('order_item_id, site_id, order_id, member_id, goods_id, item_id, item_type, item_name, item_image, unit, price, num, refund_no,refund_status')->append([ 'item_image_thumb_small','refund_status_name' ]);
               },])->append(['status_name'])->findOrEmpty()->toArray();
               return $detail;
           }
        }else{
            throw new CommonException('REFUND_NOT_EXIST');
        }

    }
}
