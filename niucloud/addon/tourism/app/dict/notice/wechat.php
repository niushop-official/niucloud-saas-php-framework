<?php
return [
    //需要进行整理
    'tourism_order_pay' => [
        'temp_key' => '43216',
        'content' => [
            ['下单时间', '{create_time}', 'time4'],
            ['订单编号', '{order_no}', 'character_string2'],
            ['商品信息', '{goods_name}', 'thing3'],
            ['订单金额', '{order_money}', 'amount5']
        ],
        'keyword_name_list' => ["下单时间", "订单号", "商品名称", "支付金额"],
        'tips' => '使用该消息请将微信公众号服务类目选择为：生活服务——>百货/超市/便利店'
    ],
    'tourism_order_auto_close' => [
        'temp_key' => '47563',
        'content' => [
            ['订单号', '{order_no}', 'character_string1'],
            ['商品名称', '{goods_name}', 'thing7'],
        ],
        'keyword_name_list' => ["订单号", "商品名称"],
        'tips' => '使用该消息请将微信公众号服务类目选择为：生活服务——>百货/超市/便利店'
    ],
    'tourism_order_verify_success' => [
        'temp_key' => '47357',
        'content' => [
            ['商品名称', '{goods_name}', 'thing2'],
            ['核销数量', '{num}', 'character_string6'],
            ['核销时间', '{verify_time}', 'time4']
        ],
        'keyword_name_list' => ['商品名称', '核销数量', '核销时间'],
        'tips' => '使用该消息请将微信公众号服务类目选择为：生活服务——>百货/超市/便利店'
    ],
    'tourism_refund_success' => [
        'temp_key' => '48058',
        'content' => [
            ['订单编号', '{order_no}', 'character_string5'],
            ['退款金额', '{money}', 'amount2'],
        ],
        'keyword_name_list' => ["订单编号", "退款金额"],
        'tips' => '使用该消息请将微信公众号服务类目选择为：商业服务——>软件/建站/技术开发'
    ],
    'tourism_refund_refuse' => [
        'temp_key' => '49580',
        'content' => [
            ['订单编号', '{order_no}', 'character_string1'],
            ['退款金额', '{money}', 'amount2']
        ],
        'keyword_name_list' => ["订单编号", "退款金额"],
        'tips' => '使用该消息请将微信公众号服务类目选择为：商业服务——>软件/建站/技术开发'
    ]
];
