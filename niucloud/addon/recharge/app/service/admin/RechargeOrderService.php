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

namespace addon\recharge\app\service\admin;

use addon\recharge\app\model\RechargeOrder;
use addon\recharge\app\dict\RechargeOrderDict;
use core\base\BaseAdminService;

/**
 * 充值订单
 * Class RechargeOrderService
 * @package app\service\admin\order
 */
class RechargeOrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new RechargeOrder();
    }

    /**
     * 充值订单分页列表
     * @param array $where
     * @return array
     */
    public function getPage(array $where)
    {
        $field = 'order_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, member_id, ip, member_message, order_item_money, order_discount_money, order_money, create_time, pay_time, close_time, is_delete, is_enable_refund, remark, invoice_id, close_reason';
        $order = 'recharge_order.create_time desc';
        $where[ 'order_type' ] = 'recharge';
        $item_where = [];
        if (isset($where[ 'recharge_id' ]) && !empty($where[ 'recharge_id' ])) {
            $item_where[] = [ 'item_id', '=', $where[ 'recharge_id' ] ];
        }
        $search_model = $this->model->where([ [ 'recharge_order.site_id', '=', $this->site_id ] ])->withSearch([ 'order_no', 'order_money', 'order_from', 'order_status', 'order_type', 'member_id', 'out_trade_no', 'create_time', 'pay_time' ], $where)
            ->field($field)
            ->withJoin([ 'item' => function($query) use ($item_where) {
                $query->field('item.order_item_id, item.order_id, item.member_id, item_id, item_type, item_name, item_image, price, num, item_money, is_refund, refund_no, item.refund_status, item.create_time')->where($item_where);
            } ])
            ->with([ 'member' => function($query) {
                $query->field('member_id, nickname, mobile, headimg');
            }, 'pay' => function($query) {
                $query->field('');
            } ])->order($order)->append([ 'order_from_name' ]);
        $list = $this->pageQuery($search_model);
        $order_status = RechargeOrderDict::getStatus();
        $refund_status = RechargeOrderDict::getRefundStatus();
        foreach ($list[ 'data' ] as $k => $v) {
            $list[ 'data' ][ $k ][ 'order_status_info' ] = $order_status[ $v[ 'order_status' ] ] ?? [];
            $list[ 'data' ][ $k ][ 'refund_status_name' ] = $refund_status[ $v[ 'refund_status' ] ][ 'name' ] ?? '';
        }
        return $list;
    }

    /**
     * 充值订单详情
     * @param int $order_id
     * @return array
     */
    public function getDetail(int $order_id)
    {
        $field = 'order_id, order_no, order_from, order_type, out_trade_no, order_status, refund_status, member_id, ip, member_message, order_item_money, order_discount_money, order_money, create_time, pay_time, close_time, is_delete, is_enable_refund, remark, invoice_id, close_reason';
        $detail = $this->model->where([ [ 'order_type', '=', 'recharge' ], [ 'order_id', '=', $order_id ], [ 'site_id', '=', $this->site_id ] ])->field($field)->with([ 'item' => function($query) {
            $query->field('order_item_id, order_id, member_id, item_id, item_type, item_name, item_image, price, num, item_money, is_refund, refund_no, refund_status, create_time');
        }, 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }, 'pay' => function($query) {
            $query->field('');
        } ])->append([ 'order_from_name' ])->findOrEmpty()->toArray();
        if (!empty($detail)) {
            $detail[ 'order_status_info' ] = RechargeOrderDict::getStatus($detail[ 'order_status' ]) ?? [];
        }
        return $detail;
    }

    /**
     * 充值订单状态
     * @return array|array[]|string
     */
    public function getStatus()
    {
        return RechargeOrderDict::getStatus();
    }

    /**
     * 充值订单
     * @param array $data
     * @return int[]
     */
    public function stat(array $data = [])
    {
        $res = [
            'recharge_money' => 0,
            'recharge_refund_money' => 0
        ];
        $where = [
            [ 'order_type', '=', 'recharge' ],
            [ 'order_status', '=', RechargeOrderDict::FINISH ],
        ];
        if (!empty($data[ 'member_id' ])) $where[] = [ 'member_id', '=', $data[ 'member_id' ] ];

        $res[ 'recharge_money' ] = $this->model->where($where)->sum('order_money');

        $where = [
            [ 'order_type', '=', 'recharge' ],
            [ 'refund_status', '=', RechargeOrderDict::REFUND_COMPLETED ],
            [ 'site_id', '=', $this->site_id ]
        ];
        if (!empty($data[ 'member_id' ])) $where[] = [ 'member_id', '=', $data[ 'member_id' ] ];
        $res[ 'recharge_refund_money' ] = $this->model->where($where)->sum('order_money');
        return $res;
    }

}
