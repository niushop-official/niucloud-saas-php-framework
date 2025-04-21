<?php

return [
    'discount' => [
        'key' => 'discount',
        'name' => '下单折扣', // 权益名称
        'desc' => '商品购买享受折扣优惠', // 权益说明
        'component' => '/src/app/views/member/components/benefits-discount.vue',
        "content" => [
            'admin' => function($site_id, $config) {
                return "下单享受{$config['discount']}折折扣";
            },
            'member_level' => function($site_id, $config) {
                return [
                    'title' => "可享{$config['discount']}折",
                    'desc' => '购物折扣',
                    'icon' => '/static/resource/images/member/benefits/benefits_discount.png'
                ];
            }
        ]
    ]
];
