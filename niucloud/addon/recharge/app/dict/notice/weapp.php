<?php
return [
    'recharge_success' => [
        'tid' => '30832',
        'content' => [
            ['交易单号', '{trade_no}', 'character_string7'],
            ['充值金额', '{price}', 'amount2'],
            ['账户余额', '{balance}', 'amount8'],
            ['充值时间', '{time}', 'time4'],
        ],
        'kid_list' => [7, 2, 8, 4],
        'scene_desc' => '充值后提醒',
        'tips' => '使用该消息请在小程序的服务类目中添加类目：一级类目：商业服务 二级类目：软件/建站/技术开发',
    ]
];
