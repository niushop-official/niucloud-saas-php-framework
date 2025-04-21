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

namespace addon\tourism\app\api\controller;

use addon\tourism\app\service\api\RefundService;
use core\base\BaseApiController;

/**
 * 退款控制器
 * Class GoodsController
 * @package app\adminapi\controller\goods
 */
class Refund extends BaseApiController
{
    /**
     * 申请退款
     * @return \think\Response
     */
    public function apply(){
        $data = $this->request->params([
            ['order_id', 0],
        ]);
        return success('REFUND_APPLY_SUCCESS', (new RefundService())->apply($data['order_id']));
    }

    /**
     * 取消退款
     * @param int $refund_id
     * @return void
     */
    public function cancel(int $refund_id) {
        return success('SUCCESS', (new RefundService())->cancel($refund_id));
    }

    /**
     * 退款详情
     * @param int $refund_id
     * @return void
     */
    public function detail(int $refund_id) {
        return success((new RefundService())->detail($refund_id));
    }
}