<?php

use app\dict\member\MemberAccountTypeDict;

return [
    //会员佣金
    MemberAccountTypeDict::COMMISSION => [
        'qiankun_recovery' => [
            //名称
            'name' => '推N返本',
            //是否增加
            'inc'  => 1,
            //是否减少
            'dec'  => 0,
        ],
    ],
];
