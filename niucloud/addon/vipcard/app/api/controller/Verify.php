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

namespace addon\vipcard\app\api\controller;

use addon\vipcard\app\service\api\VerifyService;
use core\base\BaseApiController;

/**
 * 核销控制器
 * Class GoodsController
 * @package app\adminapi\controller\goods
 */
class Verify extends BaseApiController
{
    public function checkIsVerifier()
    {
        return success('SUCCESS', (new VerifyService())->checkIsVerifier());
    }

    /**
     * 核销记录列表
     * @return Response
     */
    public function lists()
    {
        return success((new VerifyService())->getPage());
    }

    /**
     * 查询
     * @param string $type
     * @param string $value
     * @return Response\
     */
    public function search(string $verify_code) {
        return success((new VerifyService())->searchVerifyDetail($verify_code));
    }

    /**
     * 查询
     * @param string $type
     * @param string $value
     * @return Response\
     */
    public function detail(string $id) {
        return success((new VerifyService())->getDetail($id));
    }

    /**
     * 核销
     */
    public function verify(string $verify_code)
    {
        $num = input('num', 1);
        return success('VERIFY_SUCCESS', (new VerifyService())->verify($verify_code, $num));
    }

    /**
     * 获取核销记录
     * @param $card_id
     * @return \think\Response
     */
    public function cardVerifyRecord($card_id) {
        return success((new VerifyService())->getVerifyRecordByCard($card_id));
    }
}
