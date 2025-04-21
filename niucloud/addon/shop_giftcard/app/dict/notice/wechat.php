<?php
return [
    'shop_giftcard_order_pay' => [
        'temp_key' => '43216',
        'content' => [
            ['下单时间', '{create_time}', 'time4'],
            ['订单编号', '{order_no}', 'character_string2'],
            ['商品信息', '{body}', 'thing3'],
            ['订单金额', '{order_money}', 'amount5']
        ],
        'keyword_name_list' => ["下单时间", "订单号", "商品名称", "支付金额"],
        'tips' => '使用该消息请将微信公众号服务类目选择为：生活服务——>百货/超市/便利店'
    ]
];
