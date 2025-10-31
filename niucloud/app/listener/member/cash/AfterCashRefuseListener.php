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


namespace app\listener\member\cash;

use think\facade\Log;

/**
 *提现被拒绝后事件
 * Class AfterCashRefuseListener
 * @package app\listener\member\cash
 */
class AfterCashRefuseListener
{
    public function handle($params)
    {
        $site_id = $params['site_id'];
        $cash_out = $params['cash_out'];
        Log::write("拒绝提现后事件接收参数site_id:{$site_id}  data:" . json_encode($cash_out, 256));
        return true;
    }
}