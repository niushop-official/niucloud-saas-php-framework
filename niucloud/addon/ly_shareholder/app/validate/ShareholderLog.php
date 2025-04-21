<?php

namespace addon\ly_shareholder\app\validate;
use core\base\BaseValidate;
/**
 * 股东分红记录验证器
 * Class ShareholderLog
 * @package addon\ly_shareholder\app\validate
 */
class ShareholderLog extends BaseValidate
{

       protected $rule = [
            'member_id' => 'require',
            'order_amount' => 'require',
            'rate' => 'between:0,100',
            'fenxiao_level' => 'require',
            'level_num' => 'require'
        ];

       protected $message = [
            'member_id.require' => ['common_validate.require', ['member_id']],
            'order_amount.require' => ['common_validate.require', ['order_amount']],
            'rate.between' => ['common_validate.between', ['rate','0','100']],
            'fenxiao_level.require' => ['common_validate.require', ['fenxiao_level']],
            'level_num.require' => ['common_validate.require', ['level_num']]
        ];

       protected $scene = [
            "add" => ['member_id', 'order_amount', 'rate', 'fenxiao_level', 'fenxiao_level_name', 'level_num', 'amount'],
            "edit" => ['order_amount', 'rate', 'fenxiao_level', 'fenxiao_level_name', 'level_num', 'amount']
        ];

}