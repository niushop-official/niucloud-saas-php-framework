<?php

return [
    'bind' => [

    ],
    'listen' => [
        // 订单来源
        'OrderFromList' => [
            'addon\shop_replace_buy\app\listener\OrderFromListener'
        ],
    ],
    'subscribe' => [
    ],
];
