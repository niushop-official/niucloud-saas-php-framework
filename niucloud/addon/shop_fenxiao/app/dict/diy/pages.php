<?php

return [
    'DIY_SHOP_FENXIAO_ZONE' => [
        'shop_fenxiao_goods' => [ // 页面标识
            "title" => "分销专区", // 页面名称
            'cover' => '', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '', // 页面描述
            'mode' => 'diy', // 页面模式：diy：自定义，fixed：固定
            // 页面数据源
            "data" => [
                "global" => [
                    "title" => "分销专区",
                    'pageStartBgColor' => 'rgba(246, 246, 246, 1)',
                    'pageEndBgColor' => '',
                    'pageGradientAngle' => 'to bottom',
                    "bgUrl" => "",
                    'bgHeightScale' => 0,
                    "imgWidth" => 0,
                    "imgHeight" => 0,
                    "topStatusBar" => [
                        'isShow' => true,
                        'bgColor' => "",
                        'rollBgColor' => "",
                        'style' => 'style-1',
                        'styleName' => '风格1',
                        'textColor' => "#ffffff",
                        'rollTextColor' => "#333333",
                        'textAlign' => 'center',
                        'inputPlaceholder' => '请输入搜索关键词',
                        'imgUrl' => '',
                        'link' => [
                            'name' => ""
                        ]
                    ],
                    "bottomTabBarSwitch" => true,
                    "popWindow" => [
                        "imgUrl" => "",
                        "imgWidth" => "",
                        "imgHeight" => "",
                        "count" => -1,
                        "show" => 0,
                        "link" => [
                            "name" => ""
                        ]
                    ],
                    "template" => [
                        "textColor" => "#303133",
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 0,
                        "bottomRounded" => 0,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 0,
                            "bottom" => 0,
                            "both" => 0
                        ]
                    ]
                ],
                "value" => [
                    [
                        "id" => "6uexn3bgng00",
                        "bottomElementRounded" => 0,
                        "bottomRounded" => 0,
                        "componentBgAlpha" => 2,
                        "componentBgUrl" => "",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "componentName" => "ImageAds",
                        "componentStartBgColor" => "",
                        "componentTitle" => "图片广告",
                        "elementBgColor" =>  "",
                        "ignore" => ['componentBgUrl'],
                        "imageHeight" => 245,
                        "isSameScreen"=> true,
                        "list" => [
                            [
                                "height" => 245,
                                "id" => "65b199iieuo0",
                                "imageUrl" => "addon/shop_fenxiao/banner_zone.jpg",
                                "imgHeight" => 490,
                                "imgWidth" => 750,
                                "link" => [
                                    "name" => ""
                                ],
                                "width" => 375
                            ]
                        ],
                        "margin" => [
                            "top" => 0,
                            "bottom" => 0,
                            "both" => 0
                        ],
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "pageStartBgColor" => "",
                        "path" => "edit-image-ads",
                        "textColor" => "#303133",
                        "topElementRounded" => 0,
                        "topRounded" => 0,
                        "uses" => 0
                    ],
                    [
                        "id" => "1dgqkxty3gyo",
                        "componentName" => "FenxiaoGoodsList",
                        "componentTitle" => "分销商品",
                        "path" => "edit-fenxiao-goods-list",
                        "uses" => 0,
                        "ignore" => [],
                        "textColor" => "#303133",
                        "topRounded" => 8,
                        "bottomRounded" => 8,
                        "elementBgColor" => "",
                        "topElementRounded" => 10,
                        "bottomElementRounded" => 10,
                        "margin" => [
                            "top" => 0,
                            "bottom" => 0,
                            "both" => 0
                        ],
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
                        "style" => "style-1",
                        "source" => "all",
                        "num" => 20,
                        "is_become_fenxiao" => "1",
                        "goods_category" => "",
                        "goods_category_name" => "请选择",
                        "goods_ids" => [],
                        "sortWay" => "default",
                        "goodsNameStyle" => [
                            "color" => "#303133",
                            "control" => true,
                            "fontWeight" => "normal"
                        ],
                        "priceStyle" => [
                            "mainColor" => "#FF4142",
                            "mainControl" => true,
                            "lineColor" => "#999CA7",
                            "lineControl" => true
                        ],
                        "commissionStyle" => [
                            "color" => "#FF4142",
                            "control" => true
                        ],
                        "componentStartBgColor" => "",
                        "imgElementRounded" => 10,// 图片圆角
                    ]
                ]
            ]
        ],
    ]
];
