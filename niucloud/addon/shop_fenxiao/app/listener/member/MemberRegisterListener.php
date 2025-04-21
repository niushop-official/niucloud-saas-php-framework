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

namespace addon\shop_fenxiao\app\listener\member;

use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoMemberService;

/**
 * 会员注册成功事件
 * Class MemberRegister
 * @package addon\shop_fenxiao\app\listener\member
 */
class MemberRegisterListener
{
    /**
     * 接收添加会员的数组参数
     * @param $member  ['member_id', 'pid']
     */
    public function handle($member)
    {
        (new CoreFenxiaoMemberService())->memberRegister($member['site_id'], $member);
        return;
    }
}