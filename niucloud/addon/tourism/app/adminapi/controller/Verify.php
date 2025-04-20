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

use addon\tourism\app\service\admin\VerifyService;
use core\base\BaseAdminController;
use think\Response;

class Verify extends BaseAdminController
{
    /**
     * 核销记录列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['order_no', ''],
            ['verify_time', []],
            ['verify_code', '']
        ]);
        return success((new VerifyService())->getPage($data));
    }

    /**
     * 核销信息
     * @param int $order_id
     * @return Response
     */
    public function detail(string $verify_code)
    {
        return success((new VerifyService())->getDetail($verify_code));
    }

    /**
     * 查询
     * @param string $type
     * @param string $value
     * @return Response\
     */
    public function search(string $type, string $value) {
        $data[$type] = $value;
        return success((new VerifyService())->getSearchPage($data));
    }

    /**
     * 核销
     */
    public function verify(string $verify_code)
    {
        return success('VERIFY_SUCCESS', (new VerifyService())->verify($verify_code));
    }
}
