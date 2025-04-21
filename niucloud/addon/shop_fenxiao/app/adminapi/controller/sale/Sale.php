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

namespace addon\shop_fenxiao\app\adminapi\controller\sale;

use addon\shop_fenxiao\app\service\admin\sale\SaleService;
use core\base\BaseAdminController;
use think\db\exception\DbException;
use think\Response;


/**
 * 销售周期
 */
class Sale extends BaseAdminController
{

    /**
     * 获取销售周期列表
     * @return Response
     */
    public function lists()
    {
        $data = $this->request->params([
            ['create_time', []],
            ['is_settlement', 'all'],
            ['is_send', 'all'],

            ['settlement_time', []],
            ['send_time', []],
        ]);
        return success((new SaleService())->getPage($data));
    }

    /**
     * 奖励周期明细
     * @param int $id
     * @return Response
     * @throws DbException
     */
    public function info(int $id)
    {
        return success((new SaleService())->getInfo($id));
    }

    /**
     *  销售奖励发放
     * @param $period_id
     * @return Response
     */
    public function send($period_id)
    {
        (new SaleService())->send($period_id);
        return success();
    }
}
