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

namespace addon\qiankun_recovery\app\api\controller\index;

use addon\qiankun_recovery\app\service\admin\order\OrderService;
use core\base\BaseApiController;
use think\Response;

class Index extends BaseApiController
{
    /**
     * Hello World
     * @return Response
     */
    public function index()
    {
        // 查询自己的订单
        $order = (new OrderService())->getPage(['user_id' => $this->request->memberId()]);
        return success('SUCCESS', $order);
    }
}
