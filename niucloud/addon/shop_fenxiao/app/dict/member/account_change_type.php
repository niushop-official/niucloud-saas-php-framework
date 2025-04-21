<?php

use app\dict\member\MemberAccountTypeDict;

return [
    //会员佣金
    MemberAccountTypeDict::COMMISSION => [

        //分销奖励
        'shop_fenxiao' => [
            //名称
            'name' => '分销佣金',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //分销奖励
        'shop_fenxiao_team' => [
            //名称
            'name' => '团队分红',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //分销奖励
        'shop_fenxiao_agent' => [
            //名称
            'name' => '渠道代理',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //分销奖励
        'shop_fenxiao_sale' => [
            //名称
            'name' => '销售奖励',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
        //分销奖励
        'shop_fenxiao_task' => [
            //名称
            'name' => '任务奖励',
            //是否增加
            'inc' => 1,
            //是否减少
            'dec' => 0,
        ],
    ]
];