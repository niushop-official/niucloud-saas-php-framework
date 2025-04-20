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

use addon\vipcard\app\service\admin\StatService;
use Carbon\Carbon;
use core\base\BaseAdminController;

class Stat extends BaseAdminController
{
    /**
     * 总计
     * @return \think\Response
     */
    public function total() {
        return success(data: (new StatService())->getStat());
    }

    /**
     * 今日
     * @return void
     */
    public function today() {
        return success(data: (new StatService())->getStat(date('Y-m-d', time())) );
    }

    /**
     * 昨日
     * @return void
     */
    public function yesterday() {
        $yesterday =  Carbon::yesterday();
        return success(data: (new StatService())->getStat(date('Y-m-d', $yesterday->getTimestamp())) );
    }

    /**
     * 总计
     * @return \think\Response
     */
    public function month() {
        return success(data: (new StatService())->getMonthStat());
    }

}
