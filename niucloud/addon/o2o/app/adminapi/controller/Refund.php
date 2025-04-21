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

namespace addon\o2o\app\adminapi\controller;

use addon\o2o\app\service\admin\RefundService;
use core\base\BaseAdminController;

class Refund extends BaseAdminController
{
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
     * 查询维权详情
     * @param int $refund_id
     * @return \think\Response
     */
    public function detail(string $refund_no)
    {
        return success(data:(new RefundService())->getDetail($refund_no));
    }

    /**
     * 拒绝退款
     * @param int $refund_id
     * @return \think\Response
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public function refuse(int $refund_id)
    {
        $refuse_reason = input('refuse_reason', '');
        return success(data:(new RefundService())->refuse($refund_id, $refuse_reason));
    }

    /**
     * 确认转账
     * @param int $refund_id
     * @return void
     */
    public function refund(int $refund_id)
    {
        $data = $this->request->params([
            ['money', 0]
        ]);
        $this->validate($data, 'addon\o2o\app\validate\Refund.refund');
        return success(data:(new RefundService())->refund($refund_id, round($data['money'], 2) ));
    }

    /**
     * 状态
     * @return void
     */
    public function status()
    {
        return success(data:(new RefundService())->getStatus());
    }
}
