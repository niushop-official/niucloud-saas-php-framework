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

namespace addon\shop_fenxiao\app\adminapi\controller;

use addon\shop_fenxiao\app\service\admin\StatService;
use core\base\BaseAdminController;


/**
 * 统计
 */
class Stat extends BaseAdminController
{
    /**
     * 分销账户统计
     */
    public function accountStat()
    {
        return success((new StatService())->accountStat());
    }

    /**
     * 分销商统计
     */
    public function fenxiaoMemberStat()
    {
        return success((new StatService())->fenxiaoMemberStat());
    }

    /**
     * 佣金统计
     */
    public function commissionStat()
    {
        $stat_service = new StatService();
        $stat_data = $stat_service->commissionStat();
        $stat_data['sum_goods'] = $stat_service->goodsStat();
        return success($stat_data);
    }

    /**
     * 获取周统计
     */
    public function fenxiaoWeekStat()
    {
        return success((new StatService)->fenxiaoWeekStat());
    }

}
