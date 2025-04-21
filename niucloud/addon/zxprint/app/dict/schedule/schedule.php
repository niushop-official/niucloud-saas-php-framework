<?php
return [
    [
        'key' => 'zxprint_order_check',
        'name' => '检测商城订单列为打印列表内',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\zxprint\app\job\OrderCheck',
        'function' => ''
    ],[
        'key' => 'zxprint_order_print',
        'name' => '检测当天未打印的订单进行打印',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\zxprint\app\job\OrderPrint',
        'function' => ''
    ]
];
