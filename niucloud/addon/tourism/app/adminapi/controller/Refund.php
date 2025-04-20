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

namespace addon\tourism\app\adminapi\controller;

use addon\tourism\app\service\admin\order\RefundService;
use core\base\BaseAdminController;

class Refund extends BaseAdminController
{
    /**
     * 查询维权记录
     * @return \think\Response
     */
    public function lists() {
        $data = $this->request->params([
            ['refund_no', ''],
            ['create_time', []],
            ['status', '']
        ]);
        return success(data:(new RefundService())->getPage($data));
    }

    /**
     * 查询维权详情
     * @param int $refund_id
     * @return \think\Response
     */
    public function detail(int $refund_id){
        return success(data:(new RefundService())->getDetail($refund_id));
    }

    /**
     * 拒绝退款
     * @param int $refund_id
     * @return \think\Response
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function refuse(int $refund_id) {
        $refuse_reason = input('refuse_reason', '');
        return success(data:(new RefundService())->refuse($refund_id, $refuse_reason));
    }

    /**
     * 确认转账
     * @param int $refund_id
     * @return void
     */
    public function refund(int $refund_id) {
        return success(data:(new RefundService())->refund($refund_id));
    }

    /**
     * 状态
     * @return void
     */
    public function status() {
        return success(data:(new RefundService())->getStatus());
    }
}
