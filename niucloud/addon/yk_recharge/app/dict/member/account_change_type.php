<?php

use addon\yk_recharge\app\dict\member\MemberAccountTypeDict;

return [
    MemberAccountTypeDict::POINT => [
        //充值赠送
        'yk_recharge_give' => [
            //名称
            'name' => get_lang('dict_member_yk.account_point_recharge_give'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //充值
        'yk_recharge' => [
            //名称
            'name' => get_lang('dict_member_yk.account_point_recharge'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        'yk_recharge_refund' => [
            //名称
            'name' => get_lang('dict_member_yk.account_point_recharge_refund'),
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
    ],
    MemberAccountTypeDict::BALANCE => [

        //充值
        'yk_recharge' => [
            //名称
            'name' => get_lang('dict_member_yk.account_balance_recharge'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        'yk_recharge_refund' => [
            //名称
            'name' => get_lang('dict_member_yk.account_balance_recharge_refund'),
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
    ],
    
];
