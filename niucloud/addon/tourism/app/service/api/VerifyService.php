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

use addon\tourism\app\dict\order\OrderDict;
use addon\tourism\app\dict\order\OrderLogDict;
use addon\tourism\app\dict\order\RefundDict;
use addon\tourism\app\model\TourismOrder;
use addon\tourism\app\model\TourismVerifier;
use addon\tourism\app\service\core\order\CoreOrderLogService;
use app\service\api\notice\NoticeService;
use app\service\core\member\CoreMemberService;
use core\base\BaseApiService;
use core\exception\CommonException;

/**
 * 核销服务层
 * Class RechargeOrderService
 * @package app\service\api\order
 */
class VerifyService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
        $this->model = new TourismOrder();
        $this->checkIsVerifier();
    }

    public function checkIsVerifier() {
        $model = (new TourismVerifier())->where([ ['site_id', '=', $this->site_id], ['member_id', '=', $this->member_id] ])->findOrEmpty();
        if ($model->isEmpty()) throw new CommonException('NOT_IS_VERIFIER');

        return true;
    }

    /**
     * 获取核销记录列表
     * @return void
     */
    public function getPage(array $where  = []) {
        $this->checkIsVerifier();

        $search_model = $this->model->where([
            ['site_id', '=', $this->site_id],
            ['verify_time', '>', 0],
            ['verifier_type', '=', 'member'],
            ['verifier_id', '=', $this->member_id]
        ])->withSearch(['order_no', 'verify_time', 'verify_code'], $where)->field('mobile,order_no,order_id,hotel_id,goods_name,goods_image,verify_time,verify_code,num,days,buyer_info,start_time,end_time,order_id,verifier_id,verifier_type,order_type,scenic_id,way_id')->with([
            'hotel' => function($query) {
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
        $this->checkIsVerifier();

        return $this->model->where([
            ['site_id', '=', $this->site_id],
            ['verify_code', '=', $verify_code]
        ])->field('mobile,order_no,order_id,order_type,hotel_id,goods_name,goods_image,verify_time,verify_code,num,days,buyer_info,start_time,end_time,refund_status,scenic_id,way_id,create_time,pay_time')->with([ 'hotel' => function($query) {
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
        $this->checkIsVerifier();

        $order = (new TourismOrder())->where([ ['site_id', '=', $this->site_id ], ['verify_code', '=', $verify_code ] ])->findOrEmpty();
        if ($order->isEmpty()) throw new CommonException('ORDER_NOT_EXIST');
        if ($order->order_status != OrderDict::WAIT_USE) throw new CommonException('ORDER_CANNOT_VERIFY');
        if (!in_array($order->refund_status, ['', RefundDict::CANCEL, RefundDict::REFUND_REFUSE ])) throw new CommonException('ORDER_REFUND_CANNOT_VERIFY');

        $order->order_status = OrderDict::FINISH;
        $order->verify_time = time();
        $order->verifier_id = $this->member_id;
        $order->verifier_type = 'member';
        $order->is_enable_refund = 0;
        $order->save();

        // 添加订单日志
        CoreOrderLogService::addLog($order['site_id'], $order['order_id'], OrderLogDict::ORDER_VERIFY, 'member', $this->member_id, OrderDict::getStatus(OrderDict::FINISH));
        // 发送核销成功通知
        (new NoticeService())->send('tourism_order_verify_success', ['order_id' => $order['order_id'] ]);

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