<?php

namespace addon\ly_area\app\adminapi\controller;

use addon\ly_area\app\service\admin\AreaStatService;
use core\base\BaseAdminController;


/**
 * 统计
 */
class AreaStat extends BaseAdminController
{
    /**
     * 代理分红统计
     */
    public function accountStat()
    {
        return success((new AreaStatService())->accountStat());
    }

    /**
     * 代理统计
     */
    public function areaAgentStat()
    {
        return success((new AreaStatService())->areaAgentStat());
    }

    /**
     * 佣金统计
     */
    public function commissionStat()
    {
        $stat_service = new AreaStatService();
        // $stat_data = $stat_service->commissionStat();
        $stat_data['sum_goods'] = $stat_service->goodsStat();
        return success($stat_data);
    }

    /**
     * 获取周统计
     */
    public function areaAgentWeekStat()
    {
        return success((new AreaStatService)->areaAgentWeekStat());
    }


}
