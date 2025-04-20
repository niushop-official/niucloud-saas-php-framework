<?php

return [
    'DIY_TOURISM_INDEX' => [
        'tourism_index' => [ // 页面标识
            "title" => "旅游首页", // 页面名称
            'cover' => 'addon/tourism/tourism/template/tourism_cover.png', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '酒店旅游住宿门票景点', // 页面描述
            'mode' => 'diy', // 页面模式：diy：自定义，fixed：固定
            // 页面数据源
            "data" => [
                "global" => [
                    "title" => "首页",
                    'pageStartBgColor' => 'rgba(247, 247, 247, 1)',
                    'pageEndBgColor' => '',
                    'pageGradientAngle' => 'to bottom',
                    "bgUrl" => "",
                    'bgHeightScale' => 0,
                    "imgWidth" => "",
                    "imgHeight" => "",
                    "topStatusBar" => [
                        'isShow' => true,
                        'bgColor' => "#ffffff",
                        'rollBgColor' => "#ffffff",
                        'style' => 'style-1',
                        'styleName' => '风格1',
                        'textColor' => "#333333",
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
                        "path" => "edit-image-ads",
                        "uses" => 0,
                        "id" => "6l7sgdc1ik0",
                        "componentName" => "ImageAds",
                        "componentTitle" => "图片广告",
                        "ignore" => [],
                        "imageHeight" => 190,
                        "isSameScreen"=> false,
                        "list" => [
                            [
                                "link" => [
                                    "name" => ""
                                ],
                                "imageUrl" => "addon/tourism/tourism/index/carousel.png",
                                "imgWidth" => 1500,
                                "imgHeight" => 760,
                                "id" => "w20j3v72zpc",
                                "width" => 375,
                                "height" => 190
                            ]
                        ],
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
                        ],
                        "pageStyle" => "padding-top:0rpx;padding-bottom:0rpx;padding-right:0rpx;padding-left:0rpx;"
                    ],
                    [
                        "path" => "edit-graphic-nav",
                        "uses" => 0,
                        "id" => "1f4wdxg558bk",
                        "componentName" => "GraphicNav",
                        "componentTitle" => "图文导航",
                        "ignore" => [],
                        "layout" => "horizontal",
                        "mode" => "graphic",
                        "showStyle" => "fixed",
                        "rowCount" => 4,
                        "pageCount" => 2,
                        "carousel" => [
                            "type" => "circle",
                            "color" => "#FFFFFF"
                        ],
                        "imageSize" => 40,
                        "aroundRadius" => 0,
                        "font" => [
                            "size" => 14,
                            "weight" => "normal",
                            "color" => "#303133"
                        ],
                        "list" => [
                            [
                                "title" => "一日游",
                                "link" => [
                                    "name" => "TOURISM_WAY",
                                    "parent" => "TOURISM_LINK",
                                    "title" => "线路",
                                    "url" => "/addon/tourism/pages/way/list"
                                ],
                                "imageUrl" => "addon/tourism/tourism/index/nav_01.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "344xx8zp6we0",
                                "imgWidth" => 168,
                                "imgHeight" => 144
                            ],
                            [
                                "title" => "跟团游",
                                "link" => [
                                    "name" => "TOURISM_SCENIC",
                                    "parent" => "TOURISM_LINK",
                                    "title" => "景点",
                                    "url" => "/addon/tourism/pages/scenic/list"
                                ],
                                "imageUrl" => "addon/tourism/tourism/index/nav_02.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "1dtu0nrh361s",
                                "imgWidth" => 168,
                                "imgHeight" => 144
                            ],
                            [
                                "title" => "住宿",
                                "link" => [
                                    "name" => "TOURISM_HOTEL",
                                    "parent" => "TOURISM_LINK",
                                    "title" => "酒店",
                                    "url" => "/addon/tourism/pages/hotel/list"
                                ],
                                "imageUrl" => "addon/tourism/tourism/index/nav_03.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "35z3yqdfxlk0",
                                "imgWidth" => 168,
                                "imgHeight" => 144
                            ],
                            [
                                "title" => "攻略",
                                "link" => [
                                    "name" => ""
                                ],
                                "imageUrl" => "addon/tourism/tourism/index/nav_04.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "21q43jnujc68",
                                "imgWidth" => 168,
                                "imgHeight" => 144
                            ]
                        ],
                        // 轮播图设置
                        'swiper' => [
                            'indicatorColor' => 'rgba(0, 0, 0, 0.3)', // 未选中颜色
                            "indicatorActiveColor" => '#FF0E0E',
                            'indicatorStyle' => 'style-1',
                            'indicatorAlign' => 'center'
                        ],
                        "textColor" => "#303133",
                        'pageStartBgColor' => 'rgba(255, 255, 255, 1)',
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
                            "bottom" => 10,
                            "both" => 0
                        ],
                        "pageStyle" => "background-color:rgba(255, 255, 255, 1);padding-top:0rpx;padding-bottom:20rpx;padding-right:0rpx;padding-left:0rpx;"
                    ],
                    [
                        "path" => "edit-tourism-travel",
                        "uses" => 0,
                        "id" => "xgiypbyf27k",
                        "componentName" => "TourismTravel",
                        "componentTitle" => "线路",
                        "ignore" => [],
                        "head" => "热门推荐",
                        "style" => "style1",
                        "link" => [
                            "name" => ""
                        ],
                        "source" => "all",
                        "count" => 4,
                        "articleIds" => [],
                        "textColor" => "#303133",
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 0,
                        "bottomRounded" => 0,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 10,
                            "bottom" => 0,
                            "both" => 0
                        ],
                        'layout' => 'twoLines'
                    ],
                    [
                        "path" => "edit-tourism-tickets",
                        "uses" => 0,
                        "id" => "1y1aaj7s515s",
                        "componentName" => "TourismTickets",
                        "componentTitle" => "景点",
                        "ignore" => [],
                        "head" => "热门推荐",
                        "style" => "style1",
                        "link" => [
                            "name" => ""
                        ],
                        "source" => "all",
                        "count" => 8,
                        "articleIds" => [],
                        "textColor" => "#303133",
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 0,
                        "bottomRounded" => 0,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 10,
                            "bottom" => 0,
                            "both" => 0
                        ],
                        'layout' => 'twoLines'
                    ]
                ]
            ]
        ]
    ],
    'DIY_MEMBER_INDEX' => [
        'tourism_member_index' => [
            "title" => "旅游个人中心", // 页面名称
            'cover' => 'addon/tourism/tourism/template/tourism_member_index_cover.png', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '个人中心', // 页面描述
            'mode' => 'diy', // 页面模式：diy：自定义，fixed：固定
            'data' => [
                "global" => [
                    "title" => "个人中心",
                    'pageStartBgColor' => '#F8F8F8',
                    'pageEndBgColor' => '',
                    'pageGradientAngle' => 'to bottom',
                    "bgUrl" => "addon/tourism/tourism/member/member_bg.png",
                    'bgHeightScale' => 0,
                    "imgWidth" => 1500,
                    "imgHeight" => 1240,
                    "bottomTabBarSwitch" => true,
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
                            "both" => 12
                        ]
                    ],
                    "topStatusBar" => [
                        'isShow' => true,
                        'bgColor' => "#ffffff",
                        'rollBgColor' => "#ffffff",
                        'style' => 'style-1',
                        'styleName' => '风格1',
                        'textColor' => "#333333",
                        'rollTextColor' => "#333333",
                        'textAlign' => 'center',
                        'inputPlaceholder' => '请输入搜索关键词',
                        'imgUrl' => '',
                        'link' => [
                            'name' => ""
                        ]
                    ],
                    "popWindow" => [
                        "imgUrl" => "",
                        "imgWidth" => "",
                        "imgHeight" => "",
                        "count" => -1,
                        "show" => 0,
                        "link" => [
                            "name" => ""
                        ]
                    ]
                ],
                "value" => [
                    [
                        "path" => "edit-member-info",
                        "id" => "67qv49qgxp00",
                        "componentName" => "MemberInfo",
                        "componentTitle" => "会员信息",
                        "uses" => 0,
                        "ignore" => [],
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
                        ],
                        "textColor" => "#303133",
                        "style" => "style-1",
                        "styleName" => "风格1",
                        "bgUrl" => "",
                        "bgColorStart" => "",
                        "bgColorEnd" => "",
                        "pageStyle" => "padding-top:24rpx;padding-bottom:12rpx;padding-right:32rpx;padding-left:32rpx;"
                    ],
                    [
                        "path" => "edit-horz-blank",
                        "uses" => 0,
                        "id" => "2da0xqyo8zms",
                        "componentName" => "HorzBlank",
                        "componentTitle" => "辅助空白",
                        "ignore" => [
                            "pageBgColor",
                            "componentBgUrl"
                        ],
                        "height" => 10,
                        "textColor" => "#303133",
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 9,
                        "bottomRounded" => 0,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 12,
                            "bottom" => 0,
                            "both" => 12
                        ]
                    ],
                    [
                        "path" => "edit-text",
                        "uses" => 0,
                        "position" => "",
                        "id" => "1puhgfus8www",
                        "componentName" => "Text",
                        "componentTitle" => "标题",
                        "ignore" => [],
                        "style" => "style-2",
                        "styleName" => "风格2",
                        "text" => "旅游订单",
                        "link" => [
                            "parent" => "TOURISM_LINK",
                            "title" => "旅游订单",
                            "url" => "/addon/tourism/pages/order/list",
                            "name" => "TOURISM_ORDER_LIST"
                        ],
                        "textColor" => "#303133",
                        "fontSize" => 14,
                        "fontWeight" => "normal",
                        "textAlign" => "center",
                        "subTitle" => [
                            "text" => "",
                            "color" => "#999999",
                            "fontSize" => 14,
                            "control" => true,
                            "fontWeight" => "normal"
                        ],
                        "more" => [
                            "text" => "全部",
                            "control" => true,
                            "isShow" => true,
                            "link" => [
                                "parent" => "TOURISM_LINK",
                                "title" => "旅游订单",
                                "url" => "/addon/tourism/pages/order/list",
                                "name" => "TOURISM_ORDER_LIST"
                            ],
                            "color" => "#999999"
                        ],
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
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
                            "both" => 12
                        ]
                    ],
                    [
                        "path" => "edit-graphic-nav",
                        "uses" => 0,
                        "id" => "nyk7ihng19c",
                        "componentName" => "GraphicNav",
                        "componentTitle" => "图文导航",
                        "ignore" => [],
                        "layout" => "horizontal",
                        "mode" => "graphic",
                        "showStyle" => "fixed",
                        "rowCount" => 4,
                        "pageCount" => 2,
                        "carousel" => [
                            "type" => "circle",
                            "color" => "#FFFFFF"
                        ],
                        "imageSize" => 26,
                        "aroundRadius" => 0,
                        "font" => [
                            "size" => 14,
                            "weight" => "normal",
                            "color" => "#303133"
                        ],
                        "list" => [
                            [
                                "title" => "待支付",
                                "link" => [
                                    "parent" => "DIY_LINK",
                                    "title" => "待支付",
                                    "url" => "/addon/tourism/pages/order/list?status=0",
                                    "name" => "DIY_LINK"
                                ],
                                "imageUrl" => "addon/tourism/tourism/member/unpaid_order.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "svsocc19qds",
                                "imgWidth" => 104,
                                "imgHeight" => 104
                            ],
                            [
                                "title" => "待使用",
                                "link" => [
                                    "parent" => "DIY_LINK",
                                    "title" => "待使用",
                                    "url" => "/addon/tourism/pages/order/list?status=1",
                                    "name" => "DIY_LINK"
                                ],
                                "imageUrl" => "addon/tourism/tourism/member/waiting_order.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "2853z5s2gnvo",
                                "imgWidth" => 104,
                                "imgHeight" => 104
                            ],
                            [
                                "title" => "已完成",
                                "link" => [
                                    "parent" => "DIY_LINK",
                                    "title" => "已完成",
                                    "url" => "/addon/tourism/pages/order/list?status=10",
                                    "name" => "DIY_LINK"
                                ],
                                "imageUrl" => "addon/tourism/tourism/member/remain_order.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "7cbkt54zw400",
                                "imgWidth" => 104,
                                "imgHeight" => 104
                            ],
                            [
                                "title" => "全部订单",
                                "link" => [
                                    "parent" => "TOURISM_LINK",
                                    "title" => "旅游订单",
                                    "url" => "/addon/tourism/pages/order/list",
                                    "name" => "TOURISM_ORDER_LIST"
                                ],
                                "imageUrl" => "addon/tourism/tourism/member/all_order.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "3bpe4eeq4zi0",
                                "imgWidth" => 104,
                                "imgHeight" => 104
                            ]
                        ],
                        // 轮播图设置
                        'swiper' => [
                            'indicatorColor' => 'rgba(0, 0, 0, 0.3)', // 未选中颜色
                            "indicatorActiveColor" => '#FF0E0E',
                            'indicatorStyle' => 'style-1',
                            'indicatorAlign' => 'center'
                        ],
                        "textColor" => "#303133",
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 0,
                        "bottomRounded" => 9,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 0,
                            "bottom" => 6,
                            "both" => 12
                        ]
                    ],
                    [
                        "path" => "edit-horz-blank",
                        "uses" => 0,
                        "id" => "5fo173bx5840",
                        "componentName" => "HorzBlank",
                        "componentTitle" => "辅助空白",
                        "ignore" => [
                            "pageBgColor",
                            "componentBgUrl"
                        ],
                        "height" => 10,
                        "textColor" => "#303133",
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 9,
                        "bottomRounded" => 0,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 6,
                            "bottom" => 0,
                            "both" => 12
                        ]
                    ],
                    [
                        "path" => "edit-text",
                        "uses" => 0,
                        "position" => "",
                        "id" => "629cgb1ygcw0",
                        "componentName" => "Text",
                        "componentTitle" => "标题",
                        "ignore" => [],
                        "style" => "style-1",
                        "styleName" => "风格1",
                        "text" => "我的工具",
                        "link" => [
                            "name" => ""
                        ],
                        "textColor" => "#303133",
                        "fontSize" => 14,
                        "fontWeight" => "normal",
                        "textAlign" => "left",
                        "subTitle" => [
                            "text" => "",
                            "color" => "#999999",
                            "fontSize" => 14,
                            "control" => false,
                            "fontWeight" => "normal"
                        ],
                        "more" => [
                            "text" => "查看更多",
                            "control" => false,
                            "isShow" => false,
                            "link" => [
                                "name" => ""
                            ],
                            "color" => "#999999"
                        ],
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
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
                            "both" => 12
                        ]
                    ],
                    [
                        "path" => "edit-graphic-nav",
                        "uses" => 0,
                        "id" => "33yn28534fs0",
                        "componentName" => "GraphicNav",
                        "componentTitle" => "图文导航",
                        "ignore" => [],
                        "layout" => "horizontal",
                        "mode" => "graphic",
                        "showStyle" => "fixed",
                        "rowCount" => 4,
                        "pageCount" => 2,
                        "carousel" => [
                            "type" => "circle",
                            "color" => "#FFFFFF"
                        ],
                        "imageSize" => 25,
                        "aroundRadius" => 25,
                        "font" => [
                            "size" => 13,
                            "weight" => "normal",
                            "color" => "#303133"
                        ],
                        "list" => [
                            [
                                "title" => "个人资料",
                                "link" => [
                                    "parent" => "MEMBER_LINK",
                                    "name" => "MEMBER_PERSONAL",
                                    "title" => "个人资料",
                                    "url" => "/app/pages/member/personal"
                                ],
                                "imageUrl" => "static/resource/images/diy/vert_m_personal.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "4xc4kw9xlqu0",
                                "imgWidth" => 88,
                                "imgHeight" => 88
                            ],
                            [
                                "title" => "我的余额",
                                "link" => [
                                    "parent" => "MEMBER_LINK",
                                    "name" => "MEMBER_BALANCE",
                                    "title" => "我的余额",
                                    "url" => "/app/pages/member/balance"
                                ],
                                "imageUrl" => "static/resource/images/diy/vert_m_balance.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "4555rq0cc1q0",
                                "imgWidth" => 88,
                                "imgHeight" => 88
                            ],
                            [
                                "title" => "我的积分",
                                "link" => [
                                    "parent" => "MEMBER_LINK",
                                    "name" => "MEMBER_POINT",
                                    "title" => "我的积分",
                                    "url" => "/app/pages/member/point"
                                ],
                                "imageUrl" => "static/resource/images/diy/vert_m_point.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "1gq3uxox0fk0",
                                "imgWidth" => 88,
                                "imgHeight" => 88
                            ],
                            [
                                "title" => "联系客服",
                                "link" => [
                                    "name" => "MEMBER_CONTACT",
                                    "parent" => "MEMBER_LINK",
                                    "title" => "客服",
                                    "url" => "/app/pages/member/contact",
                                    "action" => ""
                                ],
                                "imageUrl" => "static/resource/images/diy/vert_m_service.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "6gqbh1tvyr00",
                                "imgWidth" => 88,
                                "imgHeight" => 88
                            ],
                            [
                                "id" => "6xhwid2el5c0",
                                "title" => "订单核销",
                                "imageUrl" => "static/resource/images/diy/vert_m_develop.png",
                                "imgWidth" => 88,
                                "imgHeight" => 88,
                                "link" => [
                                    "parent" => "TOURISM_LINK",
                                    "name" => "TOURISM_VERIFY",
                                    "title"=> "核销",
                                    "url" => "/addon/tourism/pages/verify/index",
                                    "action"=> ""
                                ],
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ]
                            ]
                        ],
                        // 轮播图设置
                        'swiper' => [
                            'indicatorColor' => 'rgba(0, 0, 0, 0.3)', // 未选中颜色
                            "indicatorActiveColor" => '#FF0E0E',
                            'indicatorStyle' => 'style-1',
                            'indicatorAlign' => 'center'
                        ],
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 0,
                        "bottomRounded" => 9,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 0,
                            "bottom" => 12,
                            "both" => 16
                        ],
                        "pageStyle" => "padding-top:12rpx;padding-bottom:24rpx;padding-right:32rpx;padding-left:32rpx;"
                    ]
                ]
            ]
        ]
    ]
];
