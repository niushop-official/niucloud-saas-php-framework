<?php

return [

    [
        'key' => 'ly_lian_lian_settlement',
        'name' => '链动奖励自动结算',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 10
        ],
        'class' => 'addon\ly_lian\app\job\LianSettlement',
        'function' => 'doJob'
    ],
    [
        'key' => 'ly_lian_lian_check_task',
        'name' => '链动绩效任务检验',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 10
        ],
        'class' => 'addon\ly_lian\app\job\LianCheckTask',
        'function' => 'doJob'
    ],

];
