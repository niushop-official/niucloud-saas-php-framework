<?php

return [
    //文件执行序列号
    'bind' => [
    ],

    'listen' => [
        'AddSiteAfter' => [ 'addon\o2o\app\listener\AddSiteAfter' ],
        'BottomNavigation' => [ 'addon\o2o\app\listener\BottomNavigationListener' ],

        //订单创建后
        'AfterO2oOrderCreate' => [ 'addon\o2o\app\listener\AfterO2oOrderCreate' ],
        //订单支付后
        'AfterO2oOrderPay' => [ 'addon\o2o\app\listener\AfterO2oOrderPay' ],

        //支付
        'PayCreate' => [ 'addon\o2o\app\listener\pay\PayCreateListener' ],
        'PaySuccess' => [ 'addon\o2o\app\listener\pay\PaySuccessListener' ],
        'PayTradeInfo' => [ 'addon\o2o\app\listener\order\O2oOrderTradeInfoListener' ],   //订单交易信息
        'RefundSuccess' => [ 'addon\o2o\app\listener\pay\RefundSuccessListener' ],

        'SiteIndex' => [ 'addon\o2o\app\listener\SiteIndexListener' ],
        'NoticeData' => [
            'addon\o2o\app\listener\notice_template\OrderPay',
            'addon\o2o\app\listener\notice_template\OrderPayRemind',
            'addon\o2o\app\listener\notice_template\OrderAutoClose',
            'addon\o2o\app\listener\notice_template\RefundSuccess',
            'addon\o2o\app\listener\notice_template\RefundRefuse',
            'addon\o2o\app\listener\notice_template\O2oOrderService',
        ],

        //获取海报数据
        'GetPosterType' => [ 'addon\o2o\app\listener\poster\O2oPosterType' ],
        'GetPosterData' => [ 'addon\o2o\app\listener\poster\O2oPoster' ],

        //导出数据类型
        'ExportDataType' => [
            //订单列表导出
            'addon\o2o\app\listener\order\O2oOrderExportTypeListener',
            //订单项导出
            'addon\o2o\app\listener\order\O2oOrderGoodsExportTypeListener',
            //退款维权导出
            'addon\o2o\app\listener\refund\O2oOrderRefundExportTypeListener',

        ],
        //导出数据源
        'ExportData' => [
            //订单列表导出
            'addon\o2o\app\listener\order\O2oOrderExportDataListener',
            //订单项导出
            'addon\o2o\app\listener\order\O2oOrderGoodsExportDataListener',
            //退款维权导出
            'addon\o2o\app\listener\refund\O2oOrderRefundExportDataListener',

        ],
        'WapIndex' => [ 'addon\o2o\app\listener\WapIndexListener' ],

        //主题色
        'ThemeColor' => [ 'addon\o2o\app\listener\diy\ThemeColorListener' ],
    ],

    'subscribe' => [
    ],
];
