<?php

return [
    'tourism_buy_goods' => [
        'key' => 'tourism_buy_goods',
        'name' => '购买产品',
        'desc' => '订单交易成功后按订单交易金额发放成长值',
        'component' => '/src/addon/tourism/views/member/components/growth-rule-buygoods.vue',
        'calculate' => function(array $config, array $data) {
            $order_money = $data['order_money'] ?? 0;
            if ($order_money <= 0) return 0;
            return (int)round($order_money / $config['money'] * $config['growth']);
        },
        'content' => [
            'admin' => function($site_id, $config) {
                return "购买产品可获得{$config['growth']}成长值/{$config['money']}元";
            },
            'task' => function($site_id, $config) {
                return [
                    'icon' => '/addon/tourism/rule/growth-rule-cart.png',
                    'title' => '购买产品',
                    'desc' => "购买产品可获得{$config['growth']}成长值/{$config['money']}元",
                    'button' => [
                        'text' => '去购买',
                        'wap_redirect' => '/addon/tourism/pages/index'
                    ]
                ];
            }
        ]
    ],
    'tourism_buy_order' => [
        'key' => 'tourism_buy_order',
        'name' => '完成下单',
        'desc' => '订单交易成功后发放成长值',
        'component' => '/src/addon/tourism/views/member/components/growth-rule-buyorder.vue',
        'calculate' => '', // 计算成长值 可以是匿名函数 也可以是类
        'content' => [
            'admin' => function($site_id, $config) {
                return "订单交易成功后可获得{$config['growth']}成长值/单";
            },
            'task' => function($site_id, $config) {
                return [
                    'icon' => '/addon/tourism/rule/growth-rule-buy.png',
                    'title' => '完成下单',
                    'desc' => "订单交易成功后可获得{$config['growth']}成长值/单",
                    'button' => [
                        'text' => '去下单',
                        'wap_redirect' => '/addon/tourism/pages/index'
                    ]
                ];
            }
        ]
    ],
];
