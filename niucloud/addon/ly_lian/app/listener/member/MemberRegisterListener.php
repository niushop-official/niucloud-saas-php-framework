<?php

namespace addon\ly_lian\app\listener\member;

use addon\ly_lian\app\service\core\CoreConfigService;
use addon\ly_lian\app\service\core\member\CoreLianMemberService;

/**
 * 会员注册成功事件
 * Class MemberRegister
 * @package addon\ly_lian\app\listener\member
 */
class MemberRegisterListener
{
    /**
     * 接收添加会员的数组参数
     * @param $member  ['member_id', 'pid']
     */
    public function handle($member)
    {
        $config = (new CoreConfigService())->getLianConfig($member['site_id']);
        
        if ($config['up_register'] == 1) {
            (new CoreLianMemberService())->memberRegister($member['site_id'], $member);
            return;
        }
        
    }
}