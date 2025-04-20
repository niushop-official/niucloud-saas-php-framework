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

namespace addon\shop_fenxiao\app\adminapi\controller\team;

use addon\shop_fenxiao\app\service\admin\order\TeamOrderService;
use core\base\BaseAdminController;
use think\Response;


/**
 * 分销订单
 */
class Order extends BaseAdminController
{

    /**
     * 获取分销订单列表
     * @return Response
     */
    public function pages()
    {
        $data = $this->request->params([
            ['create_time', []],
            ['is_settlement', 'all']
        ]);
        return success((new TeamOrderService())->getPage($data));
    }

    /**
     * 分销分销订单详情
     * @param int $id
     * @return Response
     */
    public function info(int $id)
    {
        return success((new TeamOrderService())->getInfo($id));
    }
}
