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
use addon\tourism\app\dict\order\OrderLogDict;
use addon\tourism\app\dict\order\RefundDict;
use addon\tourism\app\dict\order\ScenicOrderDict;
use addon\tourism\app\dict\order\WayOrderDict;
use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\service\core\order\CoreOrderLogService;
use addon\tourism\app\service\core\order\hotel\CoreHotelOrderService;
use addon\tourism\app\service\core\order\scenic\CoreScenicOrderService;
use addon\tourism\app\service\core\order\way\CoreWayOrderService;
use app\model\member\Member;
use app\model\pay\Pay;
use core\base\BaseApiService;
use core\exception\CommonException;
use core\util\Barcode;

/**
 * 订单服务层
 * Class RechargeOrderService
 * @package app\service\api\order
 */
class OrderService extends BaseApiService
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
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, buyer_info, start_time, end_time, days, num, goods_id, goods_name, goods_image, mobile, hotel_id, scenic_id, way_id, verify_code, verify_time, verifier_id';
        $order = 'create_time desc';
        $search_model = $this->model->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ]])->withSearch(['order_status'], $where)->field($field)->with([ 'hotel' => function ($query){
            $query->field('hotel_id, hotel_name, hotel_cover');
        }, 'scenic' => function ($query){
            $query->field('scenic_id, scenic_name, scenic_cover');
        }, 'way' => function ($query){
            $query->field('way_id, way_name, way_cover');
        } ])->order($order);
        $list = $this->pageQuery($search_model);
        $order_status = OrderDict::getStatus();
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
        $field = 'order_id, site_id, member_id, order_from, order_type, order_no, out_trade_no, order_status, refund_status, ip, create_time, pay_time, close_time, auto_close_time, is_enable_refund, delete_time, order_money, buyer_info, start_time, end_time, days, num, goods_id, goods_name, goods_image, mobile, hotel_id, scenic_id, way_id, verify_code, verify_time, verifier_id, refund_no';

        $info = $this->model->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ], ['order_id', '=', $order_id]])->field($field)->with([ 'item' => function($query) {
            $query->field('order_item_id, order_id, site_id, member_id, goods_id, price, goods_money, num, year, month, day, time, goods_name, goods_image');
        }, 'hotel' => function ($query){
            $query->field('hotel_id, hotel_name, hotel_cover');
        }, 'scenic' => function ($query){
            $query->field('scenic_id, scenic_name, scenic_cover');
        }, 'way' => function ($query){
            $query->field('way_id, way_name, way_cover');
        }, 'order_log' => function($query){
            $query->field('order_id, action, action_time, nick_name, action_way');
        }, 'refund' => function($query){
            $query->field('refund_id,refund_no');
        }])->findOrEmpty()->toArray();
        if(!empty($info))
        {
            $info['order_status_info'] = OrderDict::getStatus($info['order_status'])?? [];
            $info['refund_status_name'] = RefundDict::getRefundStatus($info['refund_status'])['name'] ?? '';

            if (!empty($info['verify_code'])) {
                try {
                    // 生成核销码二维码
                    $qrcode_dir = 'upload/temp';
                    if (!is_dir($qrcode_dir)) mkdir($qrcode_dir, intval('0755', 8), true);
                    $qrcode_path = "{$qrcode_dir}/order_qrcode_{$info['order_id']}.png";
                    \core\util\QRcode::png($info['verify_code'], $qrcode_path, 'L', 16, 1);

                    // 生成核销码条形码
                    $barcode_path = (new Barcode(14, $info['verify_code']))->generateBarcode($qrcode_dir, 2);

                    $info['verify_code_qrcode'] = image_to_base64($qrcode_path, true);
                    $info['verify_code_barcode'] = image_to_base64($barcode_path);
                } catch (\Exception $e) {
                }
            }

            if ($info[ 'out_trade_no' ]) {
                $info[ 'pay' ] = ( new Pay() )->where([ [ 'out_trade_no', '=', $info[ 'out_trade_no' ] ] ])
                    ->field('main_id, out_trade_no, type, pay_time, status')->append([ 'type_name' ])
                    ->findOrEmpty()->toArray();
                if (!empty($info[ 'pay' ])) {
                    if ($info[ 'member_id' ] != $info[ 'pay' ][ 'main_id' ]) {
                        $member_info = ( new Member() )->field('nickname,headimg')->where([ [ 'site_id', '=', $this->site_id ], [ 'member_id', '=', $info[ 'pay' ][ 'main_id' ] ] ])->findOrEmpty()->toArray();
                        if (!empty($member_info)) {
                            $info[ 'pay' ][ 'pay_member' ] = $member_info['nickname'];
                            $info[ 'pay' ][ 'pay_member_headimg' ] = $member_info['headimg'];
                        }
                    }
                }
            }
        }
        return $info;
    }

    /**
     * 会员取消订单
     * @param int $order_id
     * @return \think\Response
     */
    public function cancel(int $order_id) {
        $order = $this->model->where([ ['order_id', '=', $order_id ], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order['order_status'] != OrderDict::WAIT_PAY ) throw new CommonException('ORDER_NOT_ALLOW_CLOSE');

        try {
            switch ($order['order_type']) {
                case HotelOrderDict::TYPE:
                    (new CoreHotelOrderService())->close($order);
                    break;
                case ScenicOrderDict::TYPE:
                    (new CoreScenicOrderService())->close($order);
                    break;
                case WayOrderDict::TYPE:
                    (new CoreWayOrderService())->close($order);
                    break;
            }
            CoreOrderLogService::addLog($order['site_id'], $order_id, OrderLogDict::ORDER_CANCEL, 'member', $this->member_id, OrderDict::getStatus(OrderDict::CLOSE));
            return true;
        } catch (\Exception $e) {
            throw new CommonException($e->getMessage());
        }
    }

    /**
     * 删除订单
     * @param int $order_id
     * @return true
     */
    public function delete(int $order_id) {
        $order = $this->model->where([ ['order_id', '=', $order_id ], ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order['order_status'] != OrderDict::CLOSE ) throw new CommonException('ORDER_NOT_ALLOW_DELETE');

        $order->delete();

        return true;
    }

    /**
     * 酒店订单状态
     * @return array|array[]|string
     */
    public function getStatus()
    {
        return array_map(function ($item) {
            return [ 'name' => $item['name'], 'status' => $item['status'] ];
        }, OrderDict::getStatus());
    }
}