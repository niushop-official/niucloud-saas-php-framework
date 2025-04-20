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

namespace addon\tourism\app\service\api\hotel;

use addon\tourism\app\dict\order\HotelOrderDict;
use addon\tourism\app\dict\order\RefundDict;
use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\service\core\order\hotel\CoreHotelOrderService;
use core\base\BaseApiService;

/**
 * 酒店订单
 * Class HotelOrderService
 * @package addon\tourism\app\service\admin\hotel
 */
class OrderService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new TourismOrder();
    }

    /**
     * 订单确认
     * @param $data
     */
    public function confirm(array $data)
    {
        $data['order_from'] = $this->channel;
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreHotelOrderService())->confirm($data);
    }

    /**
     * 订单创建
     * @param array $data
     * @return null
     */
    public function create(array $data) {
        $data['order_from'] = $this->channel;
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreHotelOrderService())->create($data);
    }

    /**
     * 订单计算
     * @param array $data
     * @return array|null
     */
    public function calculate(array $data) {
        $data['order_from'] = $this->channel;
        $data['site_id'] = $this->site_id;
        $data['member_id'] = $this->member_id;
        return (new CoreHotelOrderService())->calculate($data);
    }



    /**
     * 酒店订单分页列表
     * @param array $where
     * @return mixed
     */
    public function getPage(array $where)
    {
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, buyer_info, start_time, end_time, days, num, goods_id, goods_name, goods_image, mobile, hotel_id, verify_code, verify_time, verifier_id';
        $order = 'create_time desc';
        $where['order_type'] = HotelOrderDict::TYPE;
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ]])->withSearch(['order_from', 'order_status', 'order_type', 'member_id', 'order_no', 'create_time'], $where)->field($field)->with([ 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        },'hotel' => function ($query){
            $query->field('hotel_id, hotel_name, hotel_cover');
        }])->order($order)->append(['order_from_name']);
        $list = $this->pageQuery($search_model);
        $order_status = HotelOrderDict::getStatus();
        $refund_status = RefundDict::getRefundStatus();
        foreach ($list['data'] as $k => $v)
        {
            $list['data'][$k]['order_status_info'] = $order_status[$v['order_status']] ?? [];
            $list['data'][$k]['refund_status_name'] = $refund_status[$v['refund_status']]['name'] ?? '';
        }
        return $list;
    }

    /**
     * 酒店订单详情
     * @param array $where
     * @return mixed
     */
    public function getDetail(int $order_id)
    {
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, buyer_info, start_time, end_time, days, num, goods_id, goods_name, goods_image, mobile, verify_code, verify_time, verifier_id';

        $detail = $this->model->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ], ['order_id', '=', $order_id]])->field($field)->with([ 'item' => function($query) {
            $query->field('order_item_id, order_id, site_id, member_id, goods_id, price, goods_money, num, year, month, day, time, goods_name, goods_image');
        },'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        }, 'order_log' => function($query){
            $query->field('order_id, action, action_time, nick_name, action_way');
        }])->append(['order_from_name'])->findOrEmpty()->toArray();
        if(!empty($detail))
        {
            $detail['order_status_info'] = HotelOrderDict::getStatus($detail['order_status'])?? [];
            $detail['refund_status_name'] = RefundDict::getRefundStatus($detail['refund_status'])['name'] ?? '';
        }
        return $detail;

    }

    /**
     * 酒店订单状态
     * @return array|array[]|string
     */
    public function getStatus()
    {
        return HotelOrderDict::getStatus();
    }
}