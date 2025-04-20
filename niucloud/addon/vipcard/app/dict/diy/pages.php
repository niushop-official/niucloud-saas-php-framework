<?php

return [
    'DIY_VIPCARD_INDEX' => [
        'vipcard_index' => [ // 页面标识
            "title" => "会员卡首页", // 页面名称
            'cover' => 'addon/vipcard/vipcard/template/vipcard_cover.png', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '项目管理，卡项管理，会员预约', // 页面描述
            'mode' => 'diy', // 页面模式：diy：自定义，fixed：固定
            // 页面数据源
            "data" => [
                "global" => [
                    "title" => "首页",
                    'pageStartBgColor' => 'rgba(245, 246, 248, 1)',
                    'pageEndBgColor' => '',
                    'pageGradientAngle' => 'to bottom',
                    "bgUrl" => "addon/vipcard/vipcard/template/index_bg.png",
                    'bgHeightScale' => 0,
                    "imgWidth" => 750,
                    "imgHeight" => 558,
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
                            "both" => 0
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
                        "path" => "edit-horz-blank",
                        "uses" => 0,
                        "id" => "45e0snzce0s0",
                        "componentName" => "HorzBlank",
                        "componentTitle" => "辅助空白",
                        "ignore" => [
                            "pageBgColor",
                            "topRounded",
                            "bottomRounded",
                            "marginTop",
                            "marginBottom",
                            "marginBoth"
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
                        "height" => 100,
                        "pageStyle" => "padding-top:0rpx;padding-bottom:0rpx;padding-right:0rpx;padding-left:0rpx;"
                    ],
                    [
                        "path" => "edit-horz-blank",
                        "uses" => 0,
                        "id" => "64naz1p7ai80",
                        "componentName" => "HorzBlank",
                        "componentTitle" => "辅助空白",
                        "ignore" => [],
                        "height" => 31,
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
                        "path" => "edit-vipcard-store",
                        "uses" => 0,
                        "id" => "4krvr98sbw60",
                        "componentName" => "VipcardStore",
                        "componentTitle" => "会员信息",
                        "ignore" => [],
                        "head" => "热门推荐",
                        "style" => "style1",
                        "link" => [
                            "name" => ""
                        ],
                        "source" => "initial",
                        "count" => 8,
                        "textColor" => "#303133",
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 9,
                        "bottomRounded" => 9,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 100,
                            "bottom" => 0,
                            "both" => 14
                        ],
                        "pageStyle" => "padding-top:200rpx;padding-bottom:0rpx;padding-right:28rpx;padding-left:28rpx;"
                    ],
                    [
                        "path" => "edit-rubik-cube",
                        "uses" => 0,
                        "id" => "2uuuqsy2zq00",
                        "componentName" => "RubikCube",
                        "componentTitle" => "魔方",
                        "ignore" => [],
                        "mode" => "row1-lt-of2-rt",
                        "imageGap" => 11,
                        "list" => [
                            [
                                "imageUrl" => "addon/vipcard/vipcard/template/mofang1.png",
                                "imgWidth" => 672,
                                "imgHeight" => 796,
                                "link" => [
                                    "name" => ""
                                ],
                                "pageItemStyle" => "border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;",
                                "widthStyle" => "calc((100% - 0px) / 2)"
                            ],
                            [
                                "imageUrl" => "addon/vipcard/vipcard/template/mofang2.png",
                                "imgWidth" => 672,
                                "imgHeight" => 376,
                                "link" => [
                                    "name" => ""
                                ],
                                "pageItemStyle" => "border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;",
                                "widthStyle" => "calc((100% - 0px) / 2)"
                            ],
                            [
                                "imageUrl" => "addon/vipcard/vipcard/template/mofang3.png",
                                "imgWidth" => 672,
                                "imgHeight" => 376,
                                "link" => [
                                    "name" => ""
                                ]
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
                            "top" => 15,
                            "bottom" => 0,
                            "both" => 14
                        ],
                        "pageStyle" => "padding-top:0rpx;padding-bottom:0rpx;padding-right:0rpx;padding-left:0rpx;"
                    ],
                    [
                        "path" => "edit-vipcard-reserve",
                        "uses" => 0,
                        "id" => "1f0r92gkae1",
                        "componentName" => "VipcardReserve",
                        "componentTitle" => "预约",
                        "ignore" => [],
                        "head" => "热门推荐",
                        "style" => "style1",
                        "link" => [
                            "name" => ""
                        ],
                        "source" => "all",
                        "count" => 8,
                        "textColor" => "#303133",
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 9,
                        "bottomRounded" => 9,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 15,
                            "bottom" => 0,
                            "both" => 14
                        ],
                        "pageStyle" => "padding-top:0rpx;padding-bottom:0rpx;padding-right:0rpx;padding-left:0rpx;"
                    ],
                    [
                        "path" => "edit-vipcard-card",
                        "uses" => 0,
                        "id" => "6aluvti9wrk0",
                        "componentName" => "VipcardCard",
                        "componentTitle" => "卡项",
                        "ignore" => [],
                        "head" => "热门推荐",
                        "style" => "style1",
                        "link" => [
                            "name" => ""
                        ],
                        "source" => "all",
                        "count" => 8,
                        "textColor" => "#303133",
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 9,
                        "bottomRounded" => 9,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 15,
                            "bottom" => 0,
                            "both" => 14
                        ],
                    ]
                ]
            ]
        ]
    ],
    'DIY_MEMBER_INDEX' => [
        'vipcard_member_index' => [
            "title" => "会员卡个人中心", // 页面名称
            'cover' => 'addon/vipcard/vipcard/template/vipcard_member_index_cover.png', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '个人中心', // 页面描述
            'mode' => 'diy', // 页面模式：diy：自定义，fixed：固定
            'data' => [
                "global" => [
                    "title" => "个人中心",
                    'pageStartBgColor' => 'rgba(246, 248, 248, 1)',
                    'pageEndBgColor' => '',
                    'pageGradientAngle' => 'to bottom',
                    "bgUrl" => "addon/vipcard/vipcard/template/member_bg.png",
                    'bgHeightScale' => 0,
                    "imgWidth" => 750,
                    "imgHeight" => 500,
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
                        "path" => "edit-member-info",
                        "uses" => 1,
                        "id" => "1pnaoqhv8h7k",
                        "componentName" => "MemberInfo",
                        "componentTitle" => "会员信息",
                        "ignore" => [],
                        "textColor" => "#FFFFFF",
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
                            "top" => 5,
                            "bottom" => 0,
                            "both" => 0
                        ],
                        "pageStyle" => "padding-top:0rpx;padding-bottom:0rpx;padding-right:0rpx;padding-left:0rpx;",
                        "style" => "style-1",
                        "styleName" => "风格1",
                        "bgUrl" => "",
                        "bgColorStart" => "",
                        "bgColorEnd" => ""
                    ],
                    [
                        "path" => "edit-vipcard-member-order",
                        "uses" => 0,
                        "id" => "6rigp7ibe280",
                        "componentName" => "VipcardMemberOrder",
                        "componentTitle" => "卡项订单",
                        "ignore" => [],
                        "textColor" => "#303133",
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 12,
                        "bottomRounded" => 12,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 10,
                            "bottom" => 0,
                            "both" => 12
                        ],
                        "pageStyle" => "padding-top:0rpx;padding-bottom:0rpx;padding-right:0rpx;padding-left:0rpx;",
                        "mode" => "memberOrder",
                        "font" => [
                            "weight" => "normal"
                        ]
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
                        "text" => "卡项订单",
                        "link" => [
                            "name" => "VIPCARD_ORDER_LIST",
                            "parent" => "VIPCARD_LINK",
                            "title" => "订单列表",
                            "url" => "/addon/vipcard/pages/order/list"
                        ],
                        "textColor" => "#303133",
                        "fontSize" => 16,
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
                        "id" => "6rxj1fxnsn80",
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
                                    "name" => "DIY_LINK",
                                    "title" => "待支付",
                                    "url" => "/addon/vipcard/pages/order/list?status=wait_pay"
                                ],
                                "imageUrl" => "addon/vipcard/vipcard/member/unpaid_order.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "3p429fiv6t00",
                                "imgWidth" => 104,
                                "imgHeight" => 104
                            ],
                            [
                                "title" => "待使用",
                                "link" => [
                                    "parent" => "DIY_LINK",
                                    "name" => "DIY_LINK",
                                    "title" => "待使用",
                                    "url" => "/addon/vipcard/pages/order/list?status=wait_use"
                                ],
                                "imageUrl" => "addon/vipcard/vipcard/member/waiting_order.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "3epav10r0ik",
                                "imgWidth" => 104,
                                "imgHeight" => 104
                            ],
                            [
                                "title" => "已完成",
                                "link" => [
                                    "parent" => "DIY_LINK",
                                    "name" => "DIY_LINK",
                                    "title" => "已完成",
                                    "url" => "/addon/vipcard/pages/order/list?status=finish"
                                ],
                                "imageUrl" => "addon/vipcard/vipcard/member/remain_order.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "4v5ctitkzc00",
                                "imgWidth" => 104,
                                "imgHeight" => 104
                            ],
                            [
                                "title" => "全部订单",
                                "link" => [
                                    "name" => "VIPCARD_ORDER_LIST",
                                    "parent" => "VIPCARD_LINK",
                                    "title" => "订单列表",
                                    "url" => "/addon/vipcard/pages/order/list"
                                ],
                                "imageUrl" => "addon/vipcard/vipcard/member/all_order.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "3chqzw56op40",
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
                            "bottom" => 0,
                            "both" => 12
                        ],
                        "pageStyle" => "padding-top:0rpx;padding-bottom:0rpx;padding-right:24rpx;padding-left:24rpx;",
                        "textColor" => "#303133"
                    ],
                    [
                        "path" => "edit-graphic-nav",
                        "uses" => 0,
                        "id" => "3t3mfuxewza0",
                        "componentName" => "GraphicNav",
                        "componentTitle" => "图文导航",
                        "ignore" => [],
                        "textColor" => "#303133",
                        'pageStartBgColor' => '',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 12,
                        "bottomRounded" => 12,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 10,
                            "bottom" => 0,
                            "both" => 12
                        ],
                        "layout" => "vertical",
                        "mode" => "graphic",
                        "showStyle" => "fixed",
                        "rowCount" => 4,
                        "pageCount" => 2,
                        "carousel" => [
                            "type" => "circle",
                            "color" => "#FFFFFF"
                        ],
                        "imageSize" => 40,
                        "aroundRadius" => 25,
                        "font" => [
                            "size" => 14,
                            "weight" => "normal",
                            "color" => "#303133"
                        ],
                        "list" => [
                            [
                                "title" => "我的预约",
                                "link" => [
                                    "name" => "VIPCARD_ORDER_MY_RESERVED",
                                    "parent" => "VIPCARD_LINK",
                                    "title" => "我的预约",
                                    "url" => "/addon/vipcard/pages/order/my_reserved"
                                ],
                                "imageUrl" => "addon/vipcard/vipcard/template/my_yuyue.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "zaw3hcvxym8",
                                "imgWidth" => 144,
                                "imgHeight" => 144
                            ],
                            [
                                "id" => "2wjswzou5ii0",
                                "title" => "我的次卡",
                                "imageUrl" => "addon/vipcard/vipcard/template/my_card.png",
                                "imgWidth" => 144,
                                "imgHeight" => 144,
                                "link" => [
                                    "name" => "VIPCARD_ORDER_MY_RESERVED",
                                    "parent" => "VIPCARD_LINK",
                                    "title" => "我的卡项",
                                    "url" => "/addon/vipcard/pages/order/my_card"
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
                        ]
                    ]
                ]
            ]
        ]
    ]
];
