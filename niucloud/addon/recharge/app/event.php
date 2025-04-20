<?php

return [
    //文件执行序列号
    'bind' => [
    ],
    'listen' => [
        //会员账户变化事件
        'MemberAccount' => [ 'addon\recharge\app\listener\member\MemberAccountListener' ],
        /**
         * 支付相关事件
         */
        'PayCreate' => [ 'addon\recharge\app\listener\pay\PayCreateListener' ],
        //支付成功
        'PaySuccess' => [ 'addon\recharge\app\listener\pay\PaySuccessListener' ],
        //退款成功
        'RefundSuccess' => [ 'addon\recharge\app\listener\pay\RefundSuccessListener' ],
        //消息模板数据内容
        'NoticeData' => [
            'addon\recharge\app\listener\notice_template\RechargeSuccess',
        ],
        'AllowPayTypeByTrade' => [
            'addon\recharge\app\listener\pay\PayTypeByTrade',
        ],
        'WapIndex' => [ 'addon\recharge\app\listener\WapIndexListener' ],
        // 订单创建后
        'AfterRechargeOrderCreate' => ['addon\recharge\app\listener\order\AfterRechargeOrderCreate'],
        // 会员充值 赠送内容
        'RechargeGiftContent'=>[],
    ],
    'subscribe' => [
    ],
];

