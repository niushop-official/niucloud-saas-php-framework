<?php

use app\dict\member\MemberAccountTypeDict;

return [
    MemberAccountTypeDict::POINT => [
        'huodong_cancel' => [
            //名称
            'name' => '活动取消扣除积分',
            //是否增加
            'inc' => 0,
            //是否减少
            'dec' => 1,
        ],
        'huodong_fenxiao' => [
            //名称
            'name' => '活动推广奖励',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],
    MemberAccountTypeDict::COMMISSION => [
        'huodong_fenxiao' => [
            //名称
            'name' => '活动推广奖励',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],
    MemberAccountTypeDict::BALANCE => [
        'huodong_fenxiao' => [
            //名称
            'name' => '活动推广奖励',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ],
];
