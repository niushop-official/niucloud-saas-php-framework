<?php
return [
    'shop_order_pay' => [
        'temp_key' => '43216',
        'content' => [
            ['下单时间', '{create_time}', 'time4'],
            ['订单编号', '{order_no}', 'character_string2'],
            ['商品信息', '{body}', 'thing3'],
            ['订单金额', '{order_money}', 'amount5']
        ],
        'keyword_name_list' => ["下单时间", "订单号", "商品名称", "支付金额"],
        'tips' => '使用该消息请将微信公众号服务类目选择为：生活服务——>百货/超市/便利店'
    ],
    'shop_order_delivery' => [
        'temp_key' => '42984',
        'content' => [
            ['订单编号', '{order_no}', 'character_string2'],
            ['商品名称', '{body}', 'thing4'],
            ['发货时间', '{delivery_time}', 'time12']
        ],
        'keyword_name_list' => ["订单编号", "商品名称", "发货时间"],
        'tips' => '使用该消息请将微信公众号服务类目选择为：生活服务——>百货/超市/便利店'
    ],
    'shop_refund_agree' => [
        'temp_key' => '48058',
        'content' => [
            ['订单编号', '{order_no}', 'character_string5'],
            ['退款金额', '{refund_money}', 'amount2'],
        ],
        'keyword_name_list' => ["订单编号", "退款金额"],
        'tips' => '使用该消息请将微信公众号服务类目选择为：商业服务——>软件/建站/技术开发'
    ],
    'shop_refund_refuse' => [
        'temp_key' => '49580',
        'content' => [
            ['订单编号', '{order_no}', 'character_string1'],
            ['退款金额', '{refund_money}', 'amount2']
        ],
        'keyword_name_list' => ["订单编号", "退款金额"],
        'tips' => '使用该消息请将微信公众号服务类目选择为：商业服务——>软件/建站/技术开发'
    ],
];
