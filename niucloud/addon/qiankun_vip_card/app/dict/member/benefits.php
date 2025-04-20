<?php

return [
    'qiiankun_vip_card' => [
        'key' => 'qiiankun_vip_card',
        'name' => '赠送卡密', // 权益名称
        'desc' => '购买后自动赠送会员卡密', // 权益说明
        'component' => '/src/addon/qiankun_vip_card/views/member/give_rules.vue',
        "content" => [
            // 'admin' => function($site_id, $config) {
            //     return "购买后自动赠送会员卡密。";
            // },
            // 'member_level' => function($site_id, $config) {
            //     return [
            //         'title' => "付费升级",
            //         'desc' => '付费会员',
            //         'icon' => '/addon/tk_vip/rule/vip.png'
            //     ];
            // }
        ]
    ],
];
