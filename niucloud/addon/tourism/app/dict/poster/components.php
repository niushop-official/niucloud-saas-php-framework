<?php

return [
    'tourism_hotel' => [
        'title' => get_lang('dict_diy_poster.tourism_hotel_component_type_basic'),
        'support' => [ 'tourism_hotel' ], // 支持的插件
        'list' => [
            'HotelImage' => [
                'title' => "酒店图片",
                'type' => 'image',
                'icon' => "iconfont iconshangpintupian",
                'path' => "tourism-goods-image", // 属性编辑
                'uses' => 1,
                'sort' => 10006,
                'relate' => 'goods_cover', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 400, // 宽度
                    'height' => 400, // 高度
                    'minWidth' => 60, // 最小宽度
                    'minHeight' => 60, // 最小高度
                ],
            ],
            'HotelName' => [
                'title' => "酒店名称",
                'type' => 'text',
                'icon' => "iconfont icona-Group13",
                'path' => "tourism-goods-name",
                'uses' => 1,
                'sort' => 10007,
                'relate' => 'goods_name', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 164, // 宽度
                    'height' => 55, // 高度
                ]
            ],
            'HotelPrice' => [
                'title' => "销售价",
                'type' => 'text',
                'icon' => "iconfont iconshoujia",
                'path' => "tourism-goods-price",
                'uses' => 1,
                'sort' => 10008,
                'relate' => 'price', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "fontFamily" => 'static/font/price.ttf', // 字体
                    'width' => 151, // 宽度
                    'height' => 49, // 高度
                ],
            ]

        ]
    ],
    'tourism_scenic' => [
        'title' => get_lang('dict_diy_poster.tourism_scenic_component_type_basic'),
        'support' => [ 'tourism_scenic' ], // 支持的插件
        'list' => [
            'ScenicImage' => [
                'title' => "景点图片",
                'type' => 'image',
                'icon' => "iconfont iconshangpintupian",
                'path' => "tourism-goods-image", // 属性编辑
                'uses' => 1,
                'sort' => 10006,
                'relate' => 'goods_cover', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 400, // 宽度
                    'height' => 400, // 高度
                    'minWidth' => 60, // 最小宽度
                    'minHeight' => 60, // 最小高度
                ],
            ],
            'ScenicName' => [
                'title' => "景点名称",
                'type' => 'text',
                'icon' => "iconfont icona-Group13",
                'path' => "tourism-goods-name",
                'uses' => 1,
                'sort' => 10007,
                'relate' => 'goods_name', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 164, // 宽度
                    'height' => 55, // 高度
                ]
            ],
            'ScenicPrice' => [
                'title' => "销售价",
                'type' => 'text',
                'icon' => "iconfont iconshoujia",
                'path' => "tourism-goods-price",
                'uses' => 1,
                'sort' => 10008,
                'relate' => 'price', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "fontFamily" => 'static/font/price.ttf', // 字体
                    'width' => 151, // 宽度
                    'height' => 49, // 高度
                ],
            ]

        ]
    ],
    'tourism_way' => [
        'title' => get_lang('dict_diy_poster.tourism_way_component_type_basic'),
        'support' => [ 'tourism_way' ], // 支持的插件
        'list' => [
            'WayImage' => [
                'title' => "线路图片",
                'type' => 'image',
                'icon' => "iconfont iconshangpintupian",
                'path' => "tourism-goods-image", // 属性编辑
                'uses' => 1,
                'sort' => 10006,
                'relate' => 'goods_cover', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 400, // 宽度
                    'height' => 400, // 高度
                    'minWidth' => 60, // 最小宽度
                    'minHeight' => 60, // 最小高度
                ],
            ],
            'WayName' => [
                'title' => "线路名称",
                'type' => 'text',
                'icon' => "iconfont icona-Group13",
                'path' => "tourism-goods-name",
                'uses' => 1,
                'sort' => 10007,
                'relate' => 'goods_name', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 164, // 宽度
                    'height' => 55, // 高度
                ]
            ],
            'WayPrice' => [
                'title' => "销售价",
                'type' => 'text',
                'icon' => "iconfont iconshoujia",
                'path' => "tourism-goods-price",
                'uses' => 1,
                'sort' => 10008,
                'relate' => 'price', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "fontFamily" => 'static/font/price.ttf', // 字体
                    'width' => 151, // 宽度
                    'height' => 49, // 高度
                ],
            ]

        ]
    ],

];