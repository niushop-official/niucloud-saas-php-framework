<?php

namespace addon\ly_shareholder\app\adminapi\controller;

use addon\ly_shareholder\app\service\admin\StatService;
use core\base\BaseAdminController;


/**
 * 统计
 */
class Stat extends BaseAdminController
{
    /**
     * 股东账户统计
     */
    public function accountStat()
    {
        return success((new StatService())->accountStat());
    }

    /**
     * 股东统计
     */
    public function shareholderStat()
    {
        return success((new StatService())->shareholderStat());
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
    public function shareholderWeekStat()
    {
        return success((new StatService)->shareholderWeekStat());
    }


}
