<?php

return [
    [
        'key' => 'tk_vip_checklevel',
        'name' => '会员等级到期检测每分',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\tk_vip\app\job\CheckLevel',
        'function' => ''
    ],
    [
        'key' => 'tk_vip_checklevel_day',
        'name' => '会员等级到期检测每天',
        'desc' => '',
        'time' => [
            'type' => 'day',//任务调度频率类型
            'day' => 1,//每隔几日
            'hour' => 2,//当日执行时间具体小时数
            'min' => 38,//当日执行时间具体分钟数
        ],
        'class' => 'addon\tk_vip\app\job\CheckLevelDay',
        'function' => ''
    ],
];
