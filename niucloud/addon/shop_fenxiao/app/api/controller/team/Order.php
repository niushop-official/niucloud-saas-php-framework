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

namespace addon\shop_fenxiao\app\api\controller\team;

use addon\shop_fenxiao\app\service\api\order\TeamOrderService;
use core\base\BaseApiController;
use think\Response;


/**
 * 分销订单
 */
class Order extends BaseApiController
{

    /**
     * 获取分销订单列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['create_time', []],
            ['is_settlement', 'all']
        ]);
        return success((new TeamOrderService())->getPage($data));
    }

    /**
     * 佣金统计
     */
    public function stat()
    {
        return success((new TeamOrderService())->stat());
    }
}
