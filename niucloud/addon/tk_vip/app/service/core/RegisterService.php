<?php

namespace addon\tk_vip\app\service\core;

use core\base\BaseAdminService;

/**
 * 会员注册后进行权益发放
 */
class RegisterService extends BaseAdminService
{
    public function __construct()
    {
        parent::__construct();

    }

    public function sendLevel($data)
    {
        try {
            $member_id = $data['member_id'];
            $site_id = $data['site_id'];
            $level_info = (new CommonService())->getConfig($site_id);
            $level_id = $level_info['level_id'] ?? 0;
            if ($level_id == 0) return true;
            $day = $level_info['day'] ?? 0;
            $over_type = $level_info['over_type'] ?? 'common';
            $over_time = $level_info['over_time'] ?? '';
            $info = [
                'site_id' => $site_id,
                'member_id' => $member_id,
                'level_id' => $level_id,
                'day' => $day,
                'type' => $over_type,
                'over_time' => $over_time,
            ];
            //新的接口
            (new MemberService())->changeVipV1($info, 'gift');
            return true;
        } catch (\Exception $e) {
            return false;
        }

    }

}