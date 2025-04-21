<?php
return [
    'tourism_order_pay' => [
        'key' => 'tourism_order_pay',
        'receiver_type' => 1,
        'name' => '订单支付成功通知',
        'title' => '订单支付完成后发送',
        'async' => true,
        'variable' =>[
            'create_time' => '下单时间',
            'order_no' => '订单编号',
            'order_money' => '订单金额',
            'goods_name' => '商品信息',
        ]
    ],
    'tourism_order_auto_close' => [
        'key' => 'tourism_order_auto_close',
        'receiver_type' => 1,
        'name' => '订单自动关闭通知',
        'title' => '订单超时未支付被系统自动关闭发送',
        'async' => true,
        'variable' =>[
            'create_time' => '下单时间',
            'order_no' => '订单编号',
            'order_money' => '订单金额',
            'goods_name' => '商品信息',
            'close_time' => '关闭时间',
        ]
    ],
    'tourism_order_verify_success' => [
        'key' => 'tourism_order_verify_success',
        'receiver_type' => 1,
        'name' => '订单核销成功通知',
        'title' => '订单核销成功之后发送',
        'async' => true,
        'variable' =>[
            'goods_name' => '商品信息',
            'num' => '商品数量',
            'verify_time' => '核销时间',
        ]
    ],
    'tourism_order_use_remind' => [
        'key' => 'tourism_order_use_remind',
        'receiver_type' => 1,
        'name' => '订单使用提醒',
        'title' => '在订单可用日期的前一天系统自动发送',
        'async' => true,
        'variable' =>[
            'goods_name' => '商品信息',
        ]
    ],
    'tourism_refund_success' => [
        'key' => 'tourism_refund_success',
        'receiver_type' => 1,
        'name' => '退款成功通知',
        'title' => '在退款成功之后发送',
        'async' => true,
        'variable' =>[
            'order_no' => '订单编号',
            'money' => '退款金额',
            'goods_name' => '商品信息'
        ]
    ],
    'tourism_refund_refuse' => [
        'key' => 'tourism_refund_refuse',
        'receiver_type' => 1,
        'name' => '退款拒绝通知',
        'title' => '在拒绝退款申请后发送',
        'async' => true,
        'variable' =>[
            'order_no' => '订单编号',
            'money' => '退款金额',
            'goods_name' => '商品信息',
            'reason' => '拒绝原因'
        ]
    ]
];