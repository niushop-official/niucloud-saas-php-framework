<?php

return [
    'huodong_act' => [
        'title' => '活动报名',
        'support' => [], // 支持的插件
        'list' => [
            'ActImage' => [
                'title' => "活动图片",
                'type' => 'image',
                'icon' => "iconfont iconshangpintupian",
                'path' => "act-image", // 属性编辑
                'uses' => 12,
                'sort' => 10006,
                'relate' => 'act_img', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 200, // 宽度
                    'height' => 200, // 高度
                    'minWidth' => 30, // 最小宽度
                    'minHeight' => 30, // 最小高度
                ],
            ],
            'GoodsMarketPrice' => [
                'title' => "活动名称",
                'type' => 'text',
                'icon' => "iconfont icona-Group13",
                'path' => "act-name",
                'uses' => 11,
                'sort' => 10007,
                'relate' => 'act_name', // 关联字段，空为不处理
                'value' => ''
            ],
        ]
    ],

];