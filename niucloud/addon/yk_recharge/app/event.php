<?php

return [
    //文件执行序列号
    'bind' => [
    ],
    'listen' => [
        //会员账户变化事件
        'MemberAccount' => [ 'addon\yk_recharge\app\listener\member\MemberAccountListener' ],
        /**
         * 支付相关事件
         */
        'PayCreate' => [ 'addon\yk_recharge\app\listener\pay\PayCreateListener' ],
        //支付成功
        'PaySuccess' => [ 'addon\yk_recharge\app\listener\pay\PaySuccessListener' ],
        //退款成功
        'RefundSuccess' => [ 'addon\yk_recharge\app\listener\pay\RefundSuccessListener' ],
        //消息模板数据内容
        'NoticeData' => [
            'addon\yk_recharge\app\listener\notice_template\RechargeSuccess',
        ],
        'AllowPayTypeByTrade' => [
            'addon\yk_recharge\app\listener\pay\PayTypeByTrade',
        ],
        'WapIndex' => [ 'addon\yk_recharge\app\listener\WapIndexListener' ],
    ],
    'subscribe' => [
    ],
];

