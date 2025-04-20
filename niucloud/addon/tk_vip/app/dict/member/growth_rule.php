<?php

return [
    'tk_vip_fee' => [
        'key' => 'tk_vip_fee',
        'name' => '付费会员购买',
        'desc' => '购买付费会员',
        'component' => '/src/addon/tk_vip/views/member/growth-vip-fee.vue',
        'calculate' =>'',
        'content' => [
            'admin' => function($site_id, $config) {
                return "获取购买等级权益";
            },
            'task' => function($site_id, $config) {
                return [
                    'icon' => '/addon/tk_vip/rule/vipbuy.png',
                    'title' => '付费升级',
                    'desc' => "马上获取所有超级权益",
                    'button' => [
                        'text' => '去升级',
                        'wap_redirect' => '/addon/tk_vip/pages/index'
                    ]
                ];
            }
        ]
    ],

];
