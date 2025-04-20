<?php
return [
    'o2o_order_pay' => [
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
    'o2o_order_auto_close' => [
        'tid' => '21252',
        'content' => [
            ['订单号', '{order_no}', 'character_string1'],
            ['订单金额', '{order_money}', 'amount2'],
            ['下单时间', '{create_time}', 'time3'],
        ],
        'kid_list' => [1, 2, 3],
        'scene_desc' => '订单超时关闭通知'
    ],
    'o2o_refund_success' => [
        'tid' => '30805',
        'content' => [
            ['订单编号', '{order_no}', 'character_string3'],
            ['商品名称', '{goods_name}', 'thing2'],
            ['退款金额', '{money}', 'amount1']
        ],
        'kid_list' => [3, 2, 1],
        'scene_desc' => '退款完成通知'
    ],
    'o2o_refund_refuse' => [
        'tid' => '30824',
        'content' => [
            ['订单编号', '{order_no}', 'character_string4'],
            ['退款金额', '{money}', 'amount3'],
            ['失败原因', '{reason}', 'thing5'],
        ],
        'kid_list' => [4, 3, 5],
        'scene_desc' => '退款失败通知'
    ],
    'o2o_reserve_expire_remind' => [
        'tid' => '375',
        'content' => [
            ['预约时间', '{reserve_time}', 'time2'],
            ['预约技师', '{technician}', 'name5'],
            ['预约项目', '{service}', 'thing7'],
            ['联系电话', '{mobile}', 'phone_number12'],
            ['温馨提示', '{tips}', 'thing9'],
        ],
        'kid_list' => [2, 5, 7, 12, 9],
        'scene_desc' => '预约过期提醒'
    ]
];