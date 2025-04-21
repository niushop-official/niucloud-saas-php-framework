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

namespace addon\vipcard\app\service\core;

use addon\vipcard\app\model\OrderRefundLog;
use app\model\member\Member;
use app\model\sys\SysUser;
use core\base\BaseCoreService;

/**
 * 订单维权日志
 * Class CoreHotelOrderService
 * @package app\service\core\order
 */
class CoreOrderRefundLogService extends BaseCoreService
{
    /**
     * 添加维权日志
     * @param int $site_id
     * @param int $member_id
     * @param int $refund_id
     * @param string $action
     * @param string $action_way
     * @param int $uid
     * @param array $status
     * @return true
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function addLog(int $site_id, int $refund_id, string $action, string $action_way, int $uid = 0) {
        $nick_name = '系统任务';
        switch ($action_way) {
            case 'member':
                $nick_name = (Member::find($uid))->nickname;
                break;
            case 'user':
                $nick_name = (SysUser::find($uid))->username;
                break;
        }

        (new OrderRefundLog())->save([
            'refund_id' => $refund_id,
            'site_id' => $site_id,
            'action' => $action,
            'uid' => $uid,
            'nick_name' => $nick_name,
            'action_way' => $action_way,
            'action_time' => time()
        ]);
        return true;
    }
}