<?php

use app\dict\member\MemberAccountTypeDict;

return [
    MemberAccountTypeDict::POINT => [

        'transfer_point_zhuan' => [
            //名称
            'name' => '转赠扣除积分',
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
        'transfer_point_give' => [
            //名称
            'name' => '受赠获得积分',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],

        'transfer_point_balance' => [
            //名称
            'name' => '转余额扣除积分',
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
        'transfer_balance_point' => [
            //名称
            'name' => '余额互转获得积分',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],

    ],
    MemberAccountTypeDict::BALANCE => [

        'transfer_balance_zhuan' => [
            //名称
            'name' => '转赠扣除余额',
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
        'transfer_balance_give' => [
            //名称
            'name' => '受赠获得余额',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],

        'transfer_balance_point' => [
            //名称
            'name' => '转积分扣除余额',
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],

        'transfer_point_balance' => [
            //名称
            'name' => '积分互转获得余额',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],

        'transfer_commission_balance' => [
            //名称
            'name' => '佣金互转获得余额',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],
    MemberAccountTypeDict::COMMISSION => [

        'transfer_commission_zhuan' => [
            //名称
            'name' => '转赠扣除佣金',
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
        'transfer_commission_give' => [
            //名称
            'name' => '受赠获得佣金',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        'transfer_commission_balance' => [
            //名称
            'name' => '转余额扣除佣金',
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
    ]
];
