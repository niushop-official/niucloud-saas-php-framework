<?php

return [
    [
        'key' => 'shop_fenxiao_task_open',
        'name' => '任务奖励活动到期自动开启',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 10
        ],
        'class' => 'addon\shop_fenxiao\app\job\task\TaskOpen',
        'function' => ''
    ],
    [
        'key' => 'shop_fenxiao_task_close',
        'name' => '任务奖励活动到期自动关闭',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 10
        ],
        'class' => 'addon\shop_fenxiao\app\job\task\TaskClose',
        'function' => ''
    ],
    [
        'key' => 'shop_fenxiao_task_reward_send',
        'name' => '任务奖励到期自动发放',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\shop_fenxiao\app\job\task\TaskRewardSend',
        'function' => ''
    ],

    [
        'key' => 'shop_fenxiao_sale_period_settlement',
        'name' => '销售奖励到期自动结算',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 60
        ],
        'class' => 'addon\shop_fenxiao\app\job\sale\SalePeriodSettlement',
        'function' => ''
    ],

];
