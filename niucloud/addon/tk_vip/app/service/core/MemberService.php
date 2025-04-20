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

namespace addon\tk_vip\app\service\core;


use addon\tk_vip\app\model\vip\Vip;
use app\service\core\member\CoreMemberService;
use core\base\BaseApiService;
use think\Exception;
use think\facade\Db;
use think\facade\Log;

/**
 * 会员等级管理公共服务层
 */
class MemberService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @Notes:进行会员VIP修改
     * @Interface changeVip
     * @param $site_id
     * @param $member_id
     * @param $level_id
     * @param $day
     * @author: TK
     * @Time: 2024/10/23   下午10:10
     */
    public function changeVip($site_id, $member_id, $level_id, $day, $type = 'pay')
    {
        Db::startTrans();
        try {
            $vipModel = new Vip();
            $vip = $vipModel->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
            if ($vip->isEmpty()) {
                $over_time = time() + $day * 60 * 60 * 24;
                if ($day == 0) {
                    $over_time = 0;
                }
                $vipModel->create([
                    'site_id' => $site_id,
                    'member_id' => $member_id,
                    'level_id' => $level_id,
                    'over_time' => $over_time,
                    'create_time' => time(),
                    'update_time' => time()
                ]);

            } else {
                if ($vip['level_id'] == $level_id) {
                    $old_time = $vip['over_time'] > 0 ? strtotime($vip['over_time']) : 0;
                    $over_time = $day == 0 ? 0 : ($old_time < time() ? time() + $day * 60 * 60 * 24 : $old_time + $day * 60 * 60 * 24);

                } else {
                    $over_time = $day == 0 ? 0 : time() + $day * 60 * 60 * 24;
                }
                $vipModel->where([
                    ['site_id', '=', $site_id],
                    ['member_id', '=', $member_id]
                ])->update([
                    'level_id' => $level_id,
                    'over_time' => $over_time,
                    'update_time' => time()
                ]);
            }
            (new CoreMemberService())->modify($site_id, $member_id, 'member_level', $level_id);
            if ($type == 'pay') {
                $body = '用户购买会员';
            }
            if ($type == 'sign') {
                $body = '签到赠送会员';
            }
            if ($type == 'admin') {
                $body = '后台变动会员';
            }
            if ($type == 'gift') {
                $body = '新用户注册赠送';
            } else {
                $body = '会员变动';
            }
            event('VipLog', [
                'site_id' => $site_id,
                'member_id' => $member_id,
                'level_id' => $level_id,
                'over_time' => $over_time,
                'type' => $type,
                'body' => $body
            ]);
            Db::commit();
        } catch (Exception $e) {
            Log::write('=======   VIP更改会员等级失败   =======' . date('Y-m-d H:i:s'));
            Log::write($e->getMessage());
            Db::rollback();
            return false;
        }
    }

    public function changeVipV1($orderInfo, $type = 'pay')
    {
        Db::startTrans();
        try {
            $site_id = $orderInfo['site_id'];
            $member_id = $orderInfo['member_id'];
            $level_id = $orderInfo['level_id'];
            $day = $orderInfo['day'];
            $over_type = $orderInfo['type'];
            $vipModel = new Vip();
            $vip = $vipModel->where([['site_id', '=', $site_id], ['member_id', '=', $member_id]])->findOrEmpty();
            if ($vip->isEmpty()) {
                if ($over_type == 'fixed') {
                    $over_time = strtotime($orderInfo['over_time']);
                } else {
                    $over_time = time() + $day * 60 * 60 * 24;
                    if ($day == 0) {
                        $over_time = 0;
                    }
                }
                $vipModel->create([
                    'site_id' => $site_id,
                    'member_id' => $member_id,
                    'level_id' => $level_id,
                    'over_time' => $over_time,
                    'create_time' => time(),
                    'update_time' => time()
                ]);
            } else {
                if ($over_type == 'fixed') {
                    $over_time = strtotime($orderInfo['over_time']);
                } else {
                    if ($vip['level_id'] == $level_id) {
                        $old_time = $vip['over_time'] > 0 ? strtotime($vip['over_time']) : 0;
                        $over_time = $day == 0 ? 0 : ($old_time < time() ? time() + $day * 60 * 60 * 24 : $old_time + $day * 60 * 60 * 24);

                    } else {
                        $over_time = $day == 0 ? 0 : time() + $day * 60 * 60 * 24;
                    }
                }
                $vipModel->where([
                    ['site_id', '=', $site_id],
                    ['member_id', '=', $member_id]
                ])->update([
                    'level_id' => $level_id,
                    'over_time' => $over_time,
                    'update_time' => time()
                ]);
            }
            (new CoreMemberService())->modify($site_id, $member_id, 'member_level', $level_id);
            if ($type == 'pay') {
                $body = '用户购买会员';
            }
            if ($type == 'sign') {
                $body = '签到赠送会员';
            }
            if ($type == 'admin') {
                $body = '后台变动会员';
            }
            if ($type == 'gift') {
                $body = '新用户注册赠送';
            } else {
                $body = '会员变动';
            }
            event('VipLog', [
                'site_id' => $site_id,
                'member_id' => $member_id,
                'level_id' => $level_id,
                'over_time' => $over_time,
                'type' => $type,
                'body' => $body
            ]);
            Db::commit();
        } catch (Exception $e) {
            Log::write('=======   VIP更改会员等级失败   =======' . date('Y-m-d H:i:s'));
            Log::write($e->getMessage());
            Db::rollback();
            return false;
        }
    }
}
