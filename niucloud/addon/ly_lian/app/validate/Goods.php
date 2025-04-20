<?php

namespace addon\ly_lian\app\validate;
use core\base\BaseValidate;
/**
 * 链动2+1商品验证器
 * Class Goods
 * @package addon\ly_lian\app\validate\goods
 */
class Goods extends BaseValidate
{

       protected $rule = [
            'goods_id' => 'require',
            'is_lian' => 'require',
            'is_rule' => 'require'
        ];

       protected $message = [
            'goods_id.require' => ['common_validate.require', ['goods_id']],
            'is_lian.require' => ['common_validate.require', ['is_lian']],
            'is_rule.require' => ['common_validate.require', ['is_rule']]
        ];

       protected $scene = [
            "add" => ['goods_id', 'is_lian', 'is_rule', 'reward_set'],
            "edit" => ['goods_id', 'is_lian', 'is_rule', 'reward_set']
        ];

}