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
 *
 * Class AfterCashApplyListener
 * @package app\listener\member\cash
 */
class AfterCashApplyListener
{
    public function handle($params)
    {
        $site_id = $params['site_id'];
        $member_id = $params['member_id'];
        $data = $params['data'];
        Log::write("发起提现后事件接收参数site_id:{$site_id}  member_id:{$member_id}  data:" . json_encode($data, 256));
        return true;
    }
}