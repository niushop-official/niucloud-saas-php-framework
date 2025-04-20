<?php
return [
    'o2o_order_pay' => [
        'key' => 'o2o_order_pay',
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
    'o2o_order_auto_close' => [
        'key' => 'o2o_order_auto_close',
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
    'o2o_verify_success' => [
        'key' => 'o2o_verify_success',
        'receiver_type' => 1,
        'name' => '核销成功通知',
        'title' => '核销成功之后发送',
        'async' => true,
        'variable' =>[
            'goods_name' => '商品信息',
            'num' => '商品数量',
            'verify_time' => '核销时间',
        ]
    ],
    'o2o_refund_success' => [
        'key' => 'o2o_refund_success',
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
    'o2o_refund_refuse' => [
        'key' => 'o2o_refund_refuse',
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
    ],
    'o2o_reserve_expire_remind' => [
        'key' => 'o2o_expire_remind',
        'receiver_type' => 1,
        'name' => '预约过期提醒',
        'title' => '在客户预约过期前一天发送',
        'async' => true,
        'variable' =>[
            'reserve_time' => '预约时间',
            'technician' => '预约技师',
            'service' => '预约项目',
            'mobile' => '联系电话'
        ]
    ],
    'o2o_order_service' => [
        'key' => 'o2o_order_service',
        'receiver_type' => 1,
        'name' => '订单开始服务',
        'title' => '订单开始服务',
        'async' => true,
        'variable' =>[
            'technician' => '技师',
            'mobile' => '联系电话'
        ]
    ]
];