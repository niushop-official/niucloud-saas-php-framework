<?php

use addon\recharge\app\dict\member\MemberAccountTypeDict;

return [
    MemberAccountTypeDict::POINT => [
        //充值赠送
        'recharge_give' => [
            //名称
            'name' => get_lang('dict_member.account_point_recharge_give'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],
    MemberAccountTypeDict::BALANCE => [

        //充值
        'recharge' => [
            //名称
            'name' => get_lang('dict_member.account_balance_recharge'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        'recharge_refund' => [
            //名称
            'name' => get_lang('dict_member.account_balance_recharge_refund'),
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
    ]
];
