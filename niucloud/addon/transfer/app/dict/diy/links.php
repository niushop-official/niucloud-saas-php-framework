<?php

return [
    'transfer_link' => [
        'title' => '会员资产转赠',
        'child_list' => [
            [
                'name' => 'transfer_index',
                'title' => '会员资产转赠',
                'url' => '/addon/transfer/pages/index/index',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'transfer_balance',
                'title' => '余额转赠',
                'url' => '/addon/transfer/pages/transfer/balance',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'transfer_point',
                'title' => '佣金转赠',
                'url' => '/addon/transfer/pages/transfer/point',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'transfer_coupon',
                'title' => '优惠券转赠',
                'url' => '/addon/transfer/pages/transfer/coupon',
                'is_share' => 1,
                'action' => ''
            ] ,
            [
                'name' => 'point_balance',
                'title' => '积分转余额',
                'url' => '/addon/transfer/pages/duihuan/point_balance',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'balance_point',
                'title' => '余额转积分',
                'url' => '/addon/transfer/pages/duihuan/balance_point',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'commission_balance',
                'title' => '佣金转余额',
                'url' => '/addon/transfer/pages/duihuan/commission_balance',
                'is_share' => 1,
                'action' => ''
            ]
        ]
    ],
];
