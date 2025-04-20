<?php
return [
    'shop_giftcard_order_pay' => [
        'addon' => 'shop_giftcard',
        'key' => 'shop_giftcard_order_pay',
        'receiver_type' => 1,
        'name' => '订单支付成功通知',
        'title' => '订单支付成功后发送',
        'async' => true,
        'variable' => [
            'order_money' => '订单总额',
            'pay_time' => '支付时间',
            'create_time' => '支付时间',
            'body' => '订单内容',
            'order_no' => '订单编号',
            'url' => '订单链接'
        ],
    ]
];
