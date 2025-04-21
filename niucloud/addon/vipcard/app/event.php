<?php

return [
    //文件执行序列号
    'bind' => [
    ],

    'listen' => [
        'AddSiteAfter' => ['addon\vipcard\app\listener\AddSiteAfterListener'],

        //支付
        'PayCreate' => ['addon\vipcard\app\listener\PayCreateListener'],
        'PaySuccess' => ['addon\vipcard\app\listener\PaySuccessListener'],
        'PayTradeInfo' => [ 'addon\vipcard\app\listener\VipcardOrderTradeInfoListener' ],   //订单交易信息
        'RefundSuccess' => ['addon\vipcard\app\listener\RefundSuccessListener'],

        'SiteIndex' => ['addon\vipcard\app\listener\SiteIndexListener'],
        'NoticeData' => [
            'addon\vipcard\app\listener\notice_template\OrderPay',
            'addon\vipcard\app\listener\notice_template\OrderAutoClose',
            'addon\vipcard\app\listener\notice_template\VerifySuccess',
            'addon\vipcard\app\listener\notice_template\RefundSuccess',
            'addon\vipcard\app\listener\notice_template\RefundRefuse',
            'addon\vipcard\app\listener\notice_template\ReserveExpireRemind',
        ],
        'WapIndex' => [ 'addon\vipcard\app\listener\WapIndexListener' ],
        'BottomNavigation' => [ 'addon\vipcard\app\listener\BottomNavigationListener' ],
//        'Verify' => [ 'addon\vipcard\app\listener\VerifyListener' ],

        //主题色
        'ThemeColor' => [ 'addon\vipcard\app\listener\diy\ThemeColorListener' ],
    ],

    'subscribe' => [
    ],
];
