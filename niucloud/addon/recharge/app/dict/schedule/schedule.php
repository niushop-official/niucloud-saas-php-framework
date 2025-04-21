<?php

return [
    [
        'key' => 'recharge_order_close',
        'name' => '充值订单未支付关闭',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\recharge\app\job\OrderClose',
        'function' => ''
    ],

];
