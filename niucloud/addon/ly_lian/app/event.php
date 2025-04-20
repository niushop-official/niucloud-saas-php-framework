<?php

return [
    'bind' => [

    ],
    'listen' => [
        //会员注册事件， 注册成为链动会员
        'MemberRegister' => ['addon\ly_lian\app\listener\member\MemberRegisterListener'],

        //会员下单支付后事件
        'AfterShopOrderPay' => ['addon\ly_lian\app\listener\order\AfterShopOrderPay'],

        //会员订单完成事件
        'AfterShopOrderFinish' => ['addon\ly_lian\app\listener\order\AfterShopOrderFinish'],

    ],
    'subscribe' => [
    ],
];