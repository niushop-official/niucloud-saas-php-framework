<?php
// +----------------------------------------------------------------------
// | Author: TK
// +----------------------------------------------------------------------

namespace addon\tk_vip\app\listener\member;


use addon\tk_vip\app\service\core\RegisterService;

/**
 * 会员注册成功事件
 */
class MemberRegisterListener
{
    /**
     * 会员注册后执行会员权益
     */
    public function handle($member)
    {
        (new RegisterService())->sendLevel($member);
//        if(isset($member[ 'pid' ])){
//         //进行上级奖励
//        }
        return '';
    }
}