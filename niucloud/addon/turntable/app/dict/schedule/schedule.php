<?php
#######################################################################
# File Name: schedule.php
# Desc:
# Author: hd
# Created Time: 2024/6/30 10:30
#######################################################################
return [
    [
        'key' => 'turntable_game_close',
        'name' => '游戏活动关闭',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\turntable\app\job\game\GameClose',
        'function' => ''
    ],
    [
        'key' => 'turntable_game_open',
        'name' => '游戏活动开启',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\turntable\app\job\game\GameOpen',
        'function' => ''
    ],
    [
        'key' => 'turntable_statistics',
        'name' => '游戏数据统计',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\turntable\app\job\game\Statistics',
        'function' => ''
    ]

];