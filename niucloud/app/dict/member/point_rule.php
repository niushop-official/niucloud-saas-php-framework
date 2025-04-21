<?php

return [
    'grant' => [
        'member_register' => [
            'key' => 'member_register',
            'name' => '会员注册',
            'desc' => '会员注册之后发放积分',
            'component' => '/src/app/views/member/components/point-rule-register.vue',
            'calculate' => '', // 计算成长值,
            'content' => [
                'admin' => function($site_id, $config) {
                    return "会员注册之后发放{$config['point']}积分";
                }
            ]
        ],
    ],
    'consume' => [

    ]
];
