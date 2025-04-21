<?php

return [
    'tk_vip_fee' => [
        'key' => 'tk_vip_fee',
        'name' => '付费购买', // 权益名称
        'desc' => '付费获取当前会员等级权益', // 权益说明
        'component' => '/src/addon/tk_vip/views/member/benefits-vip-fee.vue',
        "content" => [
            'admin' => function($site_id, $config) {
                return "付费可获取当前等级会员权益";
            },
            'member_level' => function($site_id, $config) {
                return [
                    'title' => "付费升级",
                    'desc' => '付费会员',
                    'icon' => '/addon/tk_vip/rule/vip.png'
                ];
            }
        ]
    ],
//    'tk_vip_share' => [
//        'key' => 'tk_vip_share',
//        'name' => '邀请新用户奖励', // 权益名称
//        'desc' => '付费获取当前会员等级权益', // 权益说明
//        'component' => '/src/addon/tk_vip/views/member/benefits-vip-fee.vue',
//        "content" => [
//            'admin' => function($site_id, $config) {
//                return "付费可获取当前等级会员权益";
//            },
//            'member_level' => function($site_id, $config) {
//                return [
//                    'title' => "付费升级",
//                    'desc' => '付费会员',
//                    'icon' => '/addon/tk_vip/rule/vip.png'
//                ];
//            }
//        ]
//    ]
];
