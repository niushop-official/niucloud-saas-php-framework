<?php
return [
    'tourism_order_pay' => [
        'tid' => '30808',
        'content' => [
            ['交易单号', '{order_no}', 'character_string1'],
            ['订单金额', '{order_money}', 'amount3'],
            ['商品名称', '{goods_name}', 'thing4'],
            ['下单时间', '{create_time}', 'time2'],
        ],
        'kid_list' => [1, 3, 4, 2],
        'scene_desc' => '订单完成通知'
    ],
    'tourism_order_auto_close' => [
        'tid' => '21252',
        'content' => [
            ['订单号', '{order_no}', 'character_string1'],
            ['订单金额', '{order_money}', 'amount2'],
            ['下单时间', '{create_time}', 'time3'],
        ],
        'kid_list' => [1, 2, 3],
        'scene_desc' => '订单超时关闭通知'
    ],
    'tourism_order_use_remind' => [
        'tid' => '4950',
        'content' => [
            ['行程名称', '{goods_name}', 'thing2'],
            ['行程时间', '{start_time}', 'date3'],
            ['预订人手机', '{mobile}', 'phone_number10']
        ],
        'kid_list' => [2, 3, 10],
        'scene_desc' => '出行提醒'
    ],
    'tourism_refund_success' => [
        'tid' => '30805',
        'content' => [
            ['订单编号', '{order_no}', 'character_string3'],
            ['商品名称', '{goods_name}', 'thing2'],
            ['退款金额', '{money}', 'amount1']
        ],
        'kid_list' => [3, 2, 1],
        'scene_desc' => '退款完成通知'
    ],
    'tourism_refund_refuse' => [
        'tid' => '30824',
        'content' => [
            ['订单编号', '{order_no}', 'character_string4'],
            ['退款金额', '{money}', 'amount3'],
            ['失败原因', '{reason}', 'thing5'],
        ],
        'kid_list' => [4, 3, 5],
        'scene_desc' => '退款失败通知'
    ]
];