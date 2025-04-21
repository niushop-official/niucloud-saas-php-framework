<?php

namespace addon\ly_lian\app\validate;

use core\base\BaseValidate;
/**
 * 链动2+1会员验证器
 * Class Member
 * @package addon\ly_lian\app\validate\member
 */
class Member extends BaseValidate
{

       protected $rule = [
            'member_id' => 'require'
        ];

       protected $message = [
            'member_id.require' => ['common_validate.require', ['member_id']]
        ];

       protected $scene = [
            "add" => ['member_id', 'pid', 'lian_pid', 'level_id', 'child_mid1', 'child_mid2', 'commission', 'give_commission', 'frozen_commission', 'status', 'remark', 'thaw_status', 'up_time'],
            "edit" => ['member_id', 'pid', 'lian_pid', 'level_id', 'child_mid1', 'child_mid2', 'commission', 'give_commission', 'frozen_commission', 'status', 'remark', 'thaw_status', 'up_time']
        ];

}