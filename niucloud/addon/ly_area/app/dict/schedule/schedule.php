<?php

return [

    [
        'key' => 'ly_area_area_settlement',
        'name' => '区域代理分红自动结算',
        'desc' => '',
        'time' => [
            'type' => 'min',
            'min' => 1
        ],
        'class' => 'addon\ly_area\app\job\AreaSettlement',
        'function' => ''
    ],

];
