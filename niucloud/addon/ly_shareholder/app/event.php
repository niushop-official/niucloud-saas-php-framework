<?php

return [
    'bind' => [

    ],
    'listen' => [

        //订单收货后, 股东升级
        'AfterShopOrderFinish' => [ 'addon\ly_shareholder\app\listener\order\AfterShopOrderFinish' ],

    ],
    'subscribe' => [
    ],
];