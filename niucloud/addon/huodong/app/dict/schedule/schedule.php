<?php


return [
    [
        'key' => 'huodong_zhou',
        'name' => '活动报名周期性',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 10
        ],
        'class' => 'addon\huodong\app\job\HuodongTask',
        'function' => ''
    ],
    [
        'key' => 'huodong_notice',
        'name' => '活动报名消息通知',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 30
        ],
        'class' => 'addon\huodong\app\job\HuodongNotice',
        'function' => ''
    ],
];
