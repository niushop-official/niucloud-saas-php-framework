<?php

return [
    'bind' => [

    ],
    'listen' => [
        //会员下单支付后事件
        'AfterShopOrderPay' => ['addon\qiankun_recovery\app\listener\order\AfterShopOrderPay'],
    ],
    'subscribe' => [
    ],
];