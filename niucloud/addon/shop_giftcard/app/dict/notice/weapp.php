<?php
return [
    'shop_giftcard_order_pay' => [
        'tid' => '30808',
        'content' => [
            ['订单编号', '{order_no}', 'character_string1'],
            ['下单时间', '{create_time}', 'time2'],
            ['商品名称', '{body}', 'thing4'],
            ['订单金额', '{order_money}', 'amount3'],
        ],
        'kid_list' => [1, 2, 4, 3],
        'scene_desc' => '订单支付之后通知',
        'tips' => '使用该消息请在小程序的服务类目中添加类目：一级类目：商业服务 二级类目：软件/建站/技术开发'
    ]
];
