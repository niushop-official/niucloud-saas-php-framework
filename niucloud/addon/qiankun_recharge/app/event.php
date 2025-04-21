<?php

return [
    'bind' => [

    ],
    'listen' => [
        'PayCreate' => [ 'addon\qiankun_recharge\app\listener\pay\PayCreateListener' ],
        //支付成功
        'PaySuccess' => [ 'addon\qiankun_recharge\app\listener\pay\PaySuccessListener' ],
        //退款成功
        'RefundSuccess' => [ 'addon\qiankun_recharge\app\listener\pay\RefundSuccessListener' ],
    ],
    'subscribe' => [
    ],
];