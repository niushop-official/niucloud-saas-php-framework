<?php

return [
    'shop_free_shipping' => [
        'key' => 'shop_free_shipping',
        'name' => '包邮', // 权益名称
        'desc' => '商品购买时可享受免邮服务', // 权益说明
        'component' => '/src/addon/shop/views/member/components/benefits-free-shipping.vue',
        "content" => [
            'admin' => function($site_id, $config) {
                return '下单享受包邮';
            },
            'member_level' => function($site_id, $config) {
                return [
                    'title' => '商品包邮',
                    'desc' => '下单免运费',
                    'icon' => '/static/resource/images/member/benefits/benefits_pinkage.png'
                ];
            }
        ]
    ]
];
