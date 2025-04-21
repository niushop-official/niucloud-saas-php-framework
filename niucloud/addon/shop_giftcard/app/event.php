<?php

return [
    'bind' => [

    ],
    'listen' => [
        // 站点创建之后
        'AddSiteAfter' => [ 'addon\shop_giftcard\app\listener\AddSiteAfterListener' ],
        // 订单创建后
        'AfterShopGiftcardOrderCreate' => ['addon\shop_giftcard\app\listener\order\AfterShopGiftcardOrderCreate'],
        // 订单支付后
        'AfterShopGiftcardOrderPay' => ['addon\shop_giftcard\app\listener\order\AfterShopGiftcardOrderPay'],
        // 订单关闭后
        'AfterShopGiftcardOrderClose' => ['addon\shop_giftcard\app\listener\order\AfterShopGiftcardOrderClose'],
        // 支付
        'PayCreate' => [ 'addon\shop_giftcard\app\listener\pay\PayCreateListener' ],
        'PaySuccess' => [ 'addon\shop_giftcard\app\listener\pay\PaySuccessListener' ],
        //活动信息
        'ShopGoodsMarketCalculate' => [
            'addon\shop_giftcard\app\listener\order\ShopGiftcardOrderCalculate'
        ],
        //礼品卡兑换订单支付后
        'AfterShopOrderPay' => [ 'addon\shop_giftcard\app\listener\order\AfterShopOrderPay' ],
        //礼品卡兑换订单退款后
        'AfterShopOrderAllRefundFinish' => [ 'addon\shop_giftcard\app\listener\refund\AfterShopOrderRefundFinish' ],

        //礼品卡订单支付通知
        'NoticeData' => [ 'addon\shop_giftcard\app\listener\notice_template\GiftcardOrderPay' ],

        // 导出数据类型
        'ExportDataType' => [
            // 兑换卡导出
            'addon\shop_giftcard\app\listener\card\GoodsCardExportTypeListener',
            // 储值卡导出
            'addon\shop_giftcard\app\listener\card\BalanceCardExportTypeListener',
        ],
        // 导出数据源
        'ExportData' => [
            // 兑换卡导出
            'addon\shop_giftcard\app\listener\card\GoodsCardExportDataListener',
            // 储值卡导出
            'addon\shop_giftcard\app\listener\card\BalanceCardExportDataListener',
        ],

        // 获取海报数据
        'GetPosterType' => [ 'addon\shop_giftcard\app\listener\poster\GiftcardPosterType' ],
        'GetPosterData' => [ 'addon\shop_giftcard\app\listener\poster\GiftcardPoster' ],

        'WapIndex' => [ 'addon\shop_giftcard\app\listener\WapIndexListener' ],
        'BottomNavigation' => [ 'addon\shop_giftcard\app\listener\BottomNavigationListener' ],

        //获取商品是否关联礼品卡
        'GoodsIsConnectedCard' => [ 'addon\shop_giftcard\app\listener\giftcard\GoodsIsConnectedCard' ],

        //主题色
        'ThemeColor' => [ 'addon\shop_giftcard\app\listener\diy\ThemeColorListener' ],

    ],
    'subscribe' => [
    ],
];
