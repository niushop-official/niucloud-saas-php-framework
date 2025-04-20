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

namespace addon\tourism\app\service\admin\hotel;

use addon\tourism\app\dict\order\HotelOrderDict;
use addon\tourism\app\dict\order\OrderDict;
use addon\tourism\app\dict\order\RefundDict;
use addon\tourism\app\model\TourismOrder;
use app\dict\pay\PayDict;
use app\model\member\Member;
use core\base\BaseAdminService;

/**
 * 酒店订单
 * Class HotelOrderService
 * @package addon\tourism\app\service\admin\hotel
 */
class HotelOrderService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new TourismOrder();
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
        $search_model = $this->model->where([['site_id', '=', $this->site_id]])->withSearch(['order_from', 'order_status', 'order_type', 'member_id', 'order_no', 'create_time', 'pay_time'], $where)->field($field)->with([ 'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        },'hotel' => function ($query){
            $query->field('hotel_id, hotel_name, hotel_cover,site_id')->append(['cover_thumb_small']);
        },'item' => function ($query){
            $query->field('order_id, price, goods_money', 'sum', 'goods_name', 'goods_image');
        },'pay' => function ($query){
            $query->field('main_id, out_trade_no, type, pay_time, status')->append(['type_name']);
        }
        ])->order($order)->append(['order_from_name', 'image_thumb_small']);
        $list = $this->pageQuery($search_model);
        $order_status = OrderDict::getStatus();
        $refund_status = RefundDict::getRefundStatus();
        foreach ($list['data'] as $k => $v)
        {
            $list['data'][$k]['order_status_info'] = $order_status[$v['order_status']] ?? [];
            $list['data'][$k]['refund_status_name'] = $refund_status[$v['refund_status']]['name'] ?? '';

            if (!empty($v[ 'pay' ])) {
                $list['data'][$k][ 'pay' ][ 'pay_type_name' ] = PayDict::getPayType()[PayDict::FRIENDSPAY]['name'] ?? '';
            }
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
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, pay_money, buyer_info, start_time, end_time, days, num, goods_id, goods_name, goods_image, mobile, verify_code, verify_time, verifier_id, verifier_type, hotel_id';

        $info = $this->model->where([['site_id', '=', $this->site_id], ['order_id', '=', $order_id]])->field($field)->with([ 'item' => function($query) {
            $query->field('order_item_id, order_id, site_id, member_id, goods_id, price, goods_money, num, year, month, day, time, goods_name, goods_image');
        },'member' => function($query) {
            $query->field('member_id, nickname, mobile, headimg');
        },'hotel' => function ($query){
            $query->field('hotel_id, hotel_name, hotel_cover, site_id')->append(['cover_thumb_small']);
        }, 'order_log' => function($query){
            $query->field('order_id, action, action_time, nick_name, action_way');
        }, 'pay' => function($query){
            $query->field('main_id, out_trade_no, type, pay_time, status')->append(['type_name']);
        }])->append(['order_from_name', 'image_thumb_small'])->order('create_time desc')->findOrEmpty()->toArray();
        if(!empty($info))
        {
            $info['order_status_info'] = OrderDict::getStatus($info['order_status'])?? [];
            $info['refund_status_name'] = RefundDict::getRefundStatus($info['refund_status'])['name'] ?? '';

            if (!empty($info[ 'pay' ])) {
                if ($info[ 'member_id' ] != $info[ 'pay' ][ 'main_id' ]) {
                    $member_info = ( new Member() )->where([ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $info[ 'pay' ][ 'main_id' ] ] ])->findOrEmpty()->toArray();
                    if (!empty($member_info)) {
                        $info[ 'pay' ][ 'pay_member' ] = $member_info['nickname'];
                    }
                }
                $info[ 'pay' ][ 'pay_type_name' ] = PayDict::getPayType()[PayDict::FRIENDSPAY]['name'] ?? '';
            }
        }
        return $info;

    }

    /**
     * 酒店订单状态
     * @return array|array[]|string
     */
    public function getStatus()
    {
        return OrderDict::getStatus();
    }
}
