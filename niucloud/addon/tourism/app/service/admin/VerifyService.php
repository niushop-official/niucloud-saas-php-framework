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

namespace addon\tourism\app\service\admin;

use addon\tourism\app\dict\order\OrderDict;
use addon\tourism\app\dict\order\OrderLogDict;
use addon\tourism\app\dict\order\RefundDict;
use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\service\core\order\CoreOrderLogService;
use app\service\core\member\CoreMemberService;
use app\service\core\notice\NoticeService;
use core\base\BaseAdminService;
use core\exception\CommonException;

/**
 * 酒店订单核销
 * Class TourismGoodsService
 * @package app\service\admin\tourism_goods
 */
class VerifyService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new TourismOrder();
    }

    /**
     * 获取核销记录列表
     * @return void
     */
    public function getPage(array $where  = []) {
        $search_model = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['verify_time', '>', 0]
        ])->withSearch(['order_no', 'verify_time', 'verify_code'], $where)->field('site_id,mobile,order_no,order_id,hotel_id,goods_name,goods_image,verify_time,verify_code,num,days,buyer_info,start_time,end_time,order_id,verifier_id,verifier_type,order_type,scenic_id,way_id')->with([
            'hotel' => function($query) {
            $query->field('hotel_id,hotel_name');
        },'scenic' => function($query) {
            $query->field('scenic_id,scenic_name');
        },'way' => function($query) {
            $query->field('way_id,way_name');
        }])->order('verify_time desc')->append(['order_type_name', 'verifyer', 'image_thumb_small']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 查询待核销数据
     * @param array $where
     * @return void
     */
    public function getSearchPage(array $where  = []) {
        $search_model = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['order_status', '=', OrderDict::WAIT_USE]
        ])->withSearch(['order_no', 'mobile', 'verify_code'], $where)->field('mobile,order_no,order_id,order_type,hotel_id,goods_name,goods_image,verify_time,verify_code,num,days,buyer_info,start_time,end_time,refund_status,scenic_id,way_id')->with([ 'hotel' => function($query) {
            $query->field('hotel_id,hotel_name');
        },'scenic' => function($query) {
            $query->field('scenic_id,scenic_name');
        },'way' => function($query) {
            $query->field('way_id,way_name');
        }])->order('verify_time desc')->append(['order_type_name']);
        $list = $this->pageQuery($search_model);
        return $list;
    }

    /**
     * 获取核销信息
     * @param string $verify_code
     * @return void
     */
    public function getDetail(string $verify_code) {
        return $this->model->where([
            ['site_id', '=', $this->site_id],
            ['verify_code', '=', $verify_code]
        ])->field('mobile,order_no,order_id,order_type,hotel_id,goods_name,goods_image,verify_time,verify_code,num,days,buyer_info,start_time,end_time,refund_status,scenic_id,way_id')->with([ 'hotel' => function($query) {
            $query->field('hotel_id,hotel_name');
        },'scenic' => function($query) {
            $query->field('scenic_id,scenic_name');
        },'way' => function($query) {
            $query->field('way_id,way_name');
        }])->append(['order_type_name'])->findOrEmpty()->toArray();
    }

    /**
     * 订单核销
     * @param string $verify_code
     * @return void
     */
    public function verify(string $verify_code) {
        $order = $this->model->where([ ['site_id', '=', $this->site_id ], ['verify_code', '=', $verify_code ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status != OrderDict::WAIT_USE) throw new CommonException('ORDER_CANNOT_VERIFY');
        if (!in_array($order->refund_status, ['', RefundDict::CANCEL, RefundDict::REFUND_REFUSE ])) throw new CommonException('ORDER_REFUND_CANNOT_VERIFY');

        $order->order_status = OrderDict::FINISH;
        $order->verify_time = time();
        $order->verifier_id = $this->uid;
        $order->verifier_type = 'user';
        $order->is_enable_refund = 0;
        $order->save();

        // 添加订单日志
        CoreOrderLogService::addLog($order['site_id'], $order['order_id'], OrderLogDict::ORDER_VERIFY, 'user', $this->uid, OrderDict::getStatus(OrderDict::FINISH));
        // 发送核销成功通知
        (new NoticeService())->send($order['site_id'], 'tourism_order_verify_success', ['order_id' => $order['order_id'] ]);

        // 订单完成发放积分成长值
        CoreMemberService::sendGrowth($order->site_id, $order->member_id, 'tourism_buy_goods', [
            'order_money' => $order->order_money,
            'from_type' => 'tourism_buy_goods',
            'related_id' => $order['order_id']
        ]);
        CoreMemberService::sendGrowth($order->site_id, $order->member_id, 'tourism_buy_order', [
            'from_type' => 'tourism_buy_order',
            'related_id' => $order['order_id']
        ]);

        return true;
    }
}
