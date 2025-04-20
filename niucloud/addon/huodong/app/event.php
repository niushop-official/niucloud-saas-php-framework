<?php

return [
    //文件执行序列号
    'bind' => [
    ],
    'listen' => [
        //支付成功
        'PaySuccess' => [ 'addon\huodong\app\listener\pay\PaySuccessListener' ],
        'Verify' => [ 'addon\huodong\app\listener\pay\Verify' ],
        'WapIndex' => [ 'addon\huodong\app\listener\WapIndexListener' ],
        'BottomNavigation' => [ 'addon\huodong\app\listener\BottomNavigationListener' ],

        //核销
        'VerifyType' => [ 'addon\huodong\app\listener\verify\VerifyTypeListener' ],
        'VerifyCreate' => [ 'addon\huodong\app\listener\verify\VerifyCreateListener' ],
        'Verify' => [ 'addon\huodong\app\listener\verify\VerifyListener' ],
        'VerifyInfo' => [ 'addon\huodong\app\listener\verify\VerifyInfoListener' ],

//        'NoticeData' => [
//            'addon\huodong\app\listener\notice_template\HuodongActStart',
//        ],
        'GetPosterType' => [ 'addon\huodong\app\listener\poster\PosterType' ],
        'GetPosterData' => [ 'addon\huodong\app\listener\poster\Poster' ],
//        //导出数据类型
//        'ExportDataType' => [
//            'addon\huodong\app\listener\export\OrderExportTypeListener',
//        ],
//        //导出数据源
//        'ExportData' => [
//            'addon\huodong\app\listener\export\OrderExportDataListener',
//        ],
    ],
    'subscribe' => [
    ],
];

