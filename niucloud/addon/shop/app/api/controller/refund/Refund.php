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

namespace addon\shop\app\api\controller\refund;

use addon\shop\app\dict\order\OrderRefundDict;
use addon\shop\app\service\api\refund\RefundActionService;
use addon\shop\app\service\api\refund\RefundService;
use core\base\BaseApiController;
use think\Response;

class Refund extends BaseApiController
{
    /**
     * 订单列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            [ 'status', '' ],
        ]);
        return success(( new RefundService() )->getPage($data));
    }

    /**
     * 订单详情
     * @param int $order_refund_no
     * @return Response
     */
    public function detail(string $order_refund_no)
    {
        return success(( new RefundService() )->getDetail($order_refund_no));
    }

    /**
     * 发起退款
     * @return Response
     */
    public function apply()
    {
        $data = $this->request->params([
            [ 'order_id', 0 ],
            [ 'order_goods_id', 0 ],
            [ 'refund_type', '' ],
            [ 'apply_money', 0 ],
            [ 'reason', '' ],
            [ 'remark', '' ],
            [ 'voucher', '' ],
        ]);
        ( new RefundActionService() )->apply($data);
        return success();
    }

    /**
     * 修改退款
     * @return Response
     */
    public function edit($order_refund_no)
    {
        $data = $this->request->params([
            [ 'refund_type', '' ],
            [ 'apply_money', 0 ],
            [ 'reason', '' ],
            [ 'remark', '' ],
            [ 'voucher', '' ],
        ]);
        $data[ 'order_refund_no' ] = $order_refund_no;
        ( new RefundActionService() )->edit($data);
        return success();
    }

    /**
     * 关闭退款
     * @return Response
     */
    public function close($order_refund_no)
    {
        $data = $this->request->params([
            [ 'refund_type', '' ],
            [ 'apply_money', 0 ],
            [ 'reason', '' ],
            [ 'remark', '' ],
            [ 'voucher', '' ],
        ]);
        $data[ 'order_refund_no' ] = $order_refund_no;
        ( new RefundActionService() )->close($data);
        return success();
    }

    /**
     * 买家退货
     * @return Response
     */
    public function delivery($order_refund_no)
    {
        $data = $this->request->params([
            [ 'delivery', [] ],//{"express_number": 11, "express_company":4545, "remark":''}
        ]);
        $data[ 'order_refund_no' ] = $order_refund_no;
        ( new RefundActionService() )->delivery($data);
        return success();
    }

    /**
     * 修改买家退货
     * @return Response
     */
    public function editDelivery($order_refund_no)
    {
        $data = $this->request->params([
            [ 'delivery', [] ],//{"express_number": 11, "express_company":4545, "remark":''}
        ]);
        $data[ 'order_refund_no' ] = $order_refund_no;
        ( new RefundActionService() )->editDelivery($data);
        return success();
    }

    /**
     * 退款原因
     * @return Response
     */
    public function getRefundReason()
    {
        return success(( new RefundActionService() )->getRefundReason());
    }

    /**
     * 获取退款方式
     * @return Response
     */
    public function getRefundType()
    {
        return success(OrderRefundDict::getRefundType());
    }

    /**
     * 获取可退款信息
     * @return void
     */
    public function getRefundData()
    {
        $data = $this->request->params([
            [ 'order_goods_id', 0 ],
        ]);
        return success(data:( new RefundActionService() )->getRefundData($data));
    }

    /**
     * 退款编辑可退款信息
     * @return Response
     */
    public function getRefundDataByOrderRefundNo()
    {
        $data = $this->request->params([
            [ 'order_refund_no', '' ],
        ]);
        return success(data:( new RefundActionService() )->getRefundDataByOrderRefundNo($data));
    }
}


