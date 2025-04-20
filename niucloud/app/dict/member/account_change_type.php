<?php

use app\dict\member\MemberAccountTypeDict;

return [
    MemberAccountTypeDict::POINT => [
        //调整
        'adjust' => [
            //名称
            'name' => get_lang('dict_member.account_point_adjust'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 1,
        ],
        //调整
        'member_register' => [
            //名称
            'name' => get_lang('dict_member.account_point_member_register'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //充值赠送
        'recharge_give' => [
            //名称
            'name' => get_lang('dict_member.account_point_recharge_give'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //会员升级礼包
        'level_upgrade' => [
            //名称
            'name' => get_lang('dict_member.account_point_level_upgrade'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //日签奖励
        'day_sign_award' => [
            //名称
            'name' => get_lang('dict_member.account_point_day_sign_award'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //连签奖励
        'continue_sign_award' => [
            //名称
            'name' => get_lang('dict_member.account_point_continue_sign_award'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],
    MemberAccountTypeDict::BALANCE => [
        //调整
        'adjust' => [
            //名称
            'name' => get_lang('dict_member.account_balance_adjust'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 1,
        ],
        //调整
        'member_register' => [
            //名称
            'name' => get_lang('dict_member.account_balance_member_register'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
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
        //订单消费扣除余额
        'order' => [
            //名称
            'name' => get_lang('dict_member.account_balance_order'),
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
        //订单退款返还余额
        'order_refund' => [
            //名称
            'name' => get_lang('dict_member.account_balance_order_refund'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
            //是否累增
            'is_change_get' => 0,
        ],
        //会员升级礼包
        'level_upgrade' => [
            //名称
            'name' => get_lang('dict_member.account_balance_level_upgrade'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //日签奖励
        'day_sign_award' => [
            //名称
            'name' => get_lang('dict_member.account_balance_day_sign_award'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //连签奖励
        'continue_sign_award' => [
            //名称
            'name' => get_lang('dict_member.account_balance_continue_sign_award'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],
    MemberAccountTypeDict::MONEY => [

        //活动奖励
        'award' => [
            //名称
            'name' => get_lang('dict_member.account_money_award'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //提现
        'cash_out' => [
            //名称
            'name' => get_lang('dict_member.account_money_cash_out'),
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
            //是否累增
            'is_change_get' => 0,
        ],
    ],
    //会员佣金
    MemberAccountTypeDict::COMMISSION => [

        //活动奖励
        'award' => [
            //名称
            'name' => get_lang('dict_member.account_commission_award'),
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //提现
        'cash_out' => [
            //名称
            'name' => get_lang('dict_member.account_commission_cash_out'),
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
            //是否累增
            'is_change_get' => 0,
        ],
    ]
];
