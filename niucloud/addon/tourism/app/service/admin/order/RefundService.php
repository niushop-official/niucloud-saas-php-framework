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

namespace addon\tourism\app\service\admin\order;

use addon\tourism\app\dict\order\OrderRefundLogDict;
use addon\tourism\app\dict\order\RefundDict;
use addon\tourism\app\model\TourismOrderRefund;
use addon\tourism\app\service\core\order\CoreOrderRefundLogService;
use addon\tourism\app\service\core\order\CoreOrderRefundService;
use core\base\BaseAdminService;
use core\exception\CommonException;
use think\facade\Db;

/**
 * 旅游订单服务层
 * Class TourismHotelService
 * @package app\service\admin\tourism_hotel
 */
class RefundService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new TourismOrderRefund();
    }

    /**
     * 订单维权记录分页列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where)
    {
        $field = 'refund_id, order_id, site_id, member_id, order_type, refund_no, status, create_time, audit_time, transfer_time, money';
        $order = 'create_time desc';
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id], ['source', '=', 'member' ] ])->withSearch([ 'refund_no', 'create_time', 'status'], $where)->field($field)->with([ 'tourismOrder' => function($query){
            $query->field('goods_name,mobile,num,days,start_time,end_time');
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
    public function getDetail(int $refund_id)
    {
        $field = 'refund_id, order_id, site_id, member_id, order_type, refund_no, status, create_time, audit_time, transfer_time, money';
        return $this->model->where([ ['refund_id', '=', $refund_id ],['site_id', '=', $this->site_id], ['source', '=', 'member' ] ])->field($field)->with([ 'tourismOrder' => function ($query){
            $query->field('goods_name,mobile,num,days,start_time,end_time');
        }, 'refund_log' => function($query){
            $query->field('refund_id, action, action_time, nick_name, action_way');
        }])->append(['status_name', 'hotel.hotel_name'])->findOrEmpty()->toArray();
    }

    /**
     * 拒绝退款
     * @param int $refund_id
     * @param string $refuse_reason
     * @return true
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function refuse(int $refund_id, string $refuse_reason = '') {
        (new CoreOrderRefundService())->refuse($this->site_id, $refund_id, $refuse_reason);
        // 添加维权日志
        CoreOrderRefundLogService::addLog($this->site_id, $refund_id, OrderRefundLogDict::REFUSE, 'user', $this->uid);
        return true;
    }

    /**
     * 确认退款
     * @return void
     */
    public function refund(int $refund_id) {
        Db::startTrans();
        try {
            // 添加维权日志
            CoreOrderRefundLogService::addLog($this->site_id, $refund_id, OrderRefundLogDict::REFUND, 'user', $this->uid);
            (new CoreOrderRefundService())->refund($this->site_id, $refund_id);
            Db::commit();
            return true;
        } catch (\Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 获取退款状态
     * @return array|array[]|string
     */
    public function getStatus() {
        return RefundDict::getRefundStatus();
    }
}