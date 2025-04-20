<?php

use app\dict\member\MemberAccountTypeDict;

return [
    MemberAccountTypeDict::POINT => [

    ],
    MemberAccountTypeDict::BALANCE => [

    ],
    MemberAccountTypeDict::MONEY => [

    ],
    //会员佣金
    MemberAccountTypeDict::COMMISSION => [

    ],
    //成长值
    MemberAccountTypeDict::GROWTH => [
        'tourism_buy_goods' => [
            //名称
            'name' => '购买产品',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        'tourism_buy_order' => [
            //名称
            'name' => '完成下单',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ]
];
