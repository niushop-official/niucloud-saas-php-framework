<?php

namespace addon\ly_shareholder\app\validate;

use core\base\BaseValidate;

class Config extends BaseValidate{
    protected $rule = [
        'fenhong_ratio' => 'between:0,100',
        'take_type' => 'require',
        'settle_time' => 'require'
    ];

   protected $message = [
        'fenhong_ratio.between' => ['common_validate.between', ['fenhong_ratio','0','100']],
        'take_type.require' => ['common_validate.require', ['take_type']],
        'settle_time.require' => ['common_validate.require', ['settle_time']]
    ];

   protected $scene = [
        "add" => [],
        "edit" => ['is_open', 'is_max', 'is_commission', 'min_order', 'min_order_amount', 'fenhong_ratio', 'settle_type', 'take_type', 'settle_time']
    ];
}