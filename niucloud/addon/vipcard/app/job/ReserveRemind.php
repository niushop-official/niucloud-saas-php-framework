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
namespace addon\vipcard\app\job;

use app\service\core\notice\NoticeService;
use core\base\BaseJob;

/**
 * 队列异步调用预约提醒
 */
class ReserveRemind extends BaseJob
{
    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob(int $site_id, int $reserve_id)
    {
        try {
            (new NoticeService())->send($site_id, 'vipcard_reserve_expire_remind', ['reserve_id' => $reserve_id ]);
            return true;
        } catch (\Exception $e) {
            return false;
        }
    }

}
