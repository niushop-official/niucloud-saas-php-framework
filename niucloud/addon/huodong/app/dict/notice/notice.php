<?php
return [
    'huodong_act_start' => [
        'key' => 'huodong_act_start',
        'receiver_type' => 1,
        'name' => '活动开始前通知',
        'title' => '活动开始前通知',
        'async' => true,
        'variable' =>[
            'act_name' => '活动名称',
            'create_time' => '活动开始时间',
            'member_name' => '报名者',
            'act_address' => '活动地点',
        ]
    ],
];