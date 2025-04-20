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

namespace addon\o2o\app\service\core;

use addon\o2o\app\model\OrderLog;
use addon\o2o\app\model\Technician;
use app\model\member\Member;
use app\model\sys\SysUser;
use core\base\BaseCoreService;

/**
 * 订单操作日志
 * Class CoreHotelOrderService
 * @package app\service\core\order
 */
class CoreOrderLogService extends BaseCoreService
{
    /**
     * 添加订单日志
     * @param int $site_id
     * @param int $order_id
     * @param string $action
     * @param string $action_way member | user | system | technician
     * @param int $uid
     * @param array $status
     * @return true
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\DbException
     * @throws \think\db\exception\ModelNotFoundException
     */
    public static function addLog(int $site_id, int $order_id, string $action, string $action_way, int $uid, array $status) {
        $nick_name = '系统任务';
        switch ($action_way) {
            case 'member':
                $nick_name = (Member::find($uid))->nickname;
                break;
            case 'user':
                $nick_name = (SysUser::find($uid))->username;
                break;
            case 'technician':
                $nick_name = (Technician::find($uid))->name;
                break;
        }

        (new OrderLog())->save([
            'order_id' => $order_id,
            'site_id' => $site_id,
            'action' => $action,
            'uid' => $uid,
            'nick_name' => $nick_name,
            'order_status' => $status['status'],
            'action_way' => $action_way,
            'order_status_name' => $status['name'],
            'action_time' => time()
        ]);
        return true;
    }
}