<?php

return [
    'YK_RECHARGE_LINK' => [
        'title' => get_lang('dict_diy_yk.recharge_link'),
        'child_list' => [
            [
                'name' => 'YK_RECHARGE_INDEX',
                'title' => get_lang('dict_diy_yk.recharge_index'),
                'url' => '/addon/yk_recharge/pages/recharge',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'YK_MEMBER_BALANCE',
                'title' => get_lang('dict_diy_yk.member_my_balance'),
                'url' => '/addon/yk_recharge/pages/balance',
                'is_share' => 1,
                'action' => ''
            ]
        ]
    ],
];
