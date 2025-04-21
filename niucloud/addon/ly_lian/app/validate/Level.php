<?php

namespace addon\ly_lian\app\validate;

use core\base\BaseValidate;
/**
 * 链动2+1等级验证器
 * Class Level
 * @package addon\ly_lian\app\validate\level
 */
class Level extends BaseValidate
{

       protected $rule = [
            'level_name' => 'require',
            'level_num' => 'require'
        ];

       protected $message = [
            'level_name.require' => ['common_validate.require', ['level_name']],
            'level_num.require' => ['common_validate.require', ['level_num']]
        ];

       protected $scene = [
            "add" => ['level_name', 'level_num', 'level_condition', 'reward_set'],
            "edit" => ['level_name', 'level_num', 'level_condition', 'reward_set']
        ];

}