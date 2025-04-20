<?php

return [
    'bind' => [

    ],
    'listen' => [
        'PaySuccess' => ['addon\qiankun_vip_card\app\listener\pay\PaySuccessListener'],
    ],
    'subscribe' => [
    ],
];