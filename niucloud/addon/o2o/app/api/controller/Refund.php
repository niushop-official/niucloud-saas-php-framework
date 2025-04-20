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

namespace addon\o2o\app\api\controller;

use addon\o2o\app\service\api\RefundService;
use core\base\BaseApiController;

/**
 * 退款控制器
 * Class GoodsController
 * @package app\adminapi\controller
 */
class Refund extends BaseApiController
{
    /**
     * 申请退款
     * @return \think\Response
     */
    public function apply()
    {
        $data = $this->request->params([
            ['order_id', 0],
            ['order_item_id', 0],
            ['apply_money', 0],
            ['reason', ''],
            ['remark', ''],
            ['voucher', ''],
        ]);
        return success('REFUND_APPLY_SUCCESS', (new RefundService())->apply($data));
    }

    /**
     * 取消退款
     * @param int $refund_id
     * @return void
     */
    public function cancel(int $refund_id)
    {
        return success('SUCCESS', (new RefundService())->cancel($refund_id));
    }

    /**
     * 查询维权记录
     * @return \think\Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['refund_no', ''],
            ['create_time', []],
            ['status', '']
        ]);
        return success(data:(new RefundService())->getPage($data));
    }

    /**
     * 退款详情
     * @param int $refund_id
     * @return void
     */
    public function detail(string $refund_no)
    {
        return success((new RefundService())->getDetail($refund_no));
    }
    /**
     * 退款状态
     * @return void
     */
    public function status()
    {
        return success((new RefundService())->getStatus());
    }

    /**
     * 退款原因
     * @return void
     */
    public function reason()
    {
        return success((new RefundService())->getRefundReason());
    }

    /**
     * 获取订单详情
     * @param int $refund_no
     * @return \think\Response
     */
    public function orderDetail(string $refund_no)
    {
        return success('SUCCESS', (new RefundService())->getOrderDetail($refund_no));
    }
}
