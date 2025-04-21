<?php

return [
    'member_register' => [
        'key' => 'member_register',
        'name' => '会员注册',
        'desc' => '会员注册之后发放成长值',
        'component' => '/src/app/views/member/components/growth-rule-register.vue',
        'calculate' => '', // 计算成长值
        'content' => [
            'admin' => function($site_id, $config) {
                return "会员注册之后发放{$config['growth']}成长值";
            }
        ]
    ],
];
