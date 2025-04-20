<?php

return [
 
    // [
    //     'key' => 'ly_shareholder_shop_order_change_after',
    //     'name' => '股东分红升级任务',
    //     'desc' => '',
    //     'time' => [
    //         'type' => 'min',
    //         'min' => 1
    //     ],
    //     'class' => 'addon\ly_shareholder\app\job\ShopOrderChangeAfter',
    //     'function' => ''
    // ],

    [
        'key' => 'ly_shareholder_shareholder_settlement',
        'name' => '股东分红自动结算',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\ly_shareholder\app\job\ShareholderSettlement',
        'function' => ''
    ],

];
