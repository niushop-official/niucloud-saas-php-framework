<?php

use app\dict\member\MemberAccountTypeDict;

return [
    //会员佣金
    MemberAccountTypeDict::COMMISSION => [

        
        //链动奖励
        'ly_lian' => [
            //名称
            'name' => '链动2+1奖励',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],

    //会员余额
    MemberAccountTypeDict::BALANCE => [

        //股东分红奖励
        'ly_lian' => [
            
            //名称
            'name' => '链动2+1奖励',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],
    //会员积分
    MemberAccountTypeDict::POINT => [

        //股东分红奖励
        'ly_lian' => [
            
            //名称
            'name' => '链动2+1奖励',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],
];