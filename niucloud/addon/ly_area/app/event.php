<?php

return [
    'bind' => [

    ],
    'listen' => [
         //协议类型加载
        'AgreementType' => [ 'addon\ly_area\app\listener\AgreementType' ],

         //站点创建后增加区域分红等级
         'AddSiteAfter' => ['addon\ly_area\app\listener\AddSiteAfterListener'],

         //添加代理之前
         'AddAreaAgentBefore' => ['addon\ly_area\app\listener\agent\AddAreaAgentBeforeListener'],

         //订单完成后
         'AfterShopOrderFinish' => ['addon\ly_area\app\listener\order\AfterShopOrderFinish'],

    ],
    'subscribe' => [
    ],
];