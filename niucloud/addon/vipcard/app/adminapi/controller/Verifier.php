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

namespace addon\vipcard\app\adminapi\controller;

use addon\vipcard\app\service\admin\VerifierService;
use core\base\BaseAdminController;
use think\Response;

class Verifier extends BaseAdminController
{
    /**
     * 核销人员列表
     * @return Response
     */
    public function lists()
    {
        return success(data:(new VerifierService())->getPage());
    }

    /**
     * 添加核销员
     * @param int $order_id
     * @return Response
     */
    public function add()
    {
        $data = $this->request->params([
            ['member_id', 0],
        ]);
        return success(data:(new VerifierService())->add($data));
    }

    /**
     * 核销
     */
    public function del(int $id)
    {
        return success('DELETE_SUCCESS', (new VerifierService())->del($id));
    }
}
