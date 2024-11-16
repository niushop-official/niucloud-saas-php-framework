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

namespace app\listener\member;

use app\service\core\member\CoreMemberService;

/**
 * 会员注册成功事件
 * Class MemberRegisterListener
 * @package app\listener\member
 */
class MemberRegisterListener
{
    /**
     * 接收添加会员的数组参数
     * @param $member
     */
    public function handle($member)
    {
        // 注册发放成长值
        CoreMemberService::sendGrowth($member[ 'site_id' ], $member[ 'member_id' ], 'member_register', [ 'from_type' => 'member_register' ]);
        // 注册发放积分
        CoreMemberService::sendPoint($member[ 'site_id' ], $member[ 'member_id' ], 'member_register', [ 'from_type' => 'member_register' ]);
        // 新人专享活动
        event("MemberLoginAfter", [ 'site_id' => $member[ 'site_id' ], 'member_id' => $member[ 'member_id' ] ]);
        return;
    }
}
