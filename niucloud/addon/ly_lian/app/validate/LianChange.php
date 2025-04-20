<?php

namespace addon\ly_lian\app\validate;

use core\base\BaseValidate;
/**
 * 链动2+1关系变动验证器
 * Class LianChange
 * @package addon\ly_lian\app\validate
 */
class LianChange extends BaseValidate
{

       protected $rule = [
            'member_id' => 'require',
            'pid' => 'require',
            'lian_pid' => 'require'
        ];

       protected $message = [
            'member_id.require' => ['common_validate.require', ['member_id']],
            'pid.require' => ['common_validate.require', ['pid']],
            'lian_pid.require' => ['common_validate.require', ['lian_pid']]
        ];

       protected $scene = [
            "add" => ['member_id', 'pid', 'lian_pid', 'new_lian_pid', 'level_id', 'child_mid', 'child_type'],
            "edit" => ['member_id', 'pid', 'lian_pid', 'new_lian_pid', 'level_id', 'child_mid', 'child_type']
        ];

}