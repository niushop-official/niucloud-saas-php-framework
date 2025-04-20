<?php

return [
    'DIY_SHOP_GIFTCARD_INDEX' => [
        'shop_giftcard_index_style1' => [ // 页面标识
            "title" => "礼品卡首页", // 页面名称
            'cover' => '', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '', // 页面描述
            'mode' => 'diy', // 页面模式：diy：自定义，fixed：固定
            // 页面数据源
            "data" => [
                "global" => [
                    "title" => "礼品卡首页",
                    "pageStartBgColor" => "rgba(255, 255, 255, 1)",
                    "pageEndBgColor" => "",
                    "pageGradientAngle" => "to bottom",
                    "bgUrl" => "addon/shop_giftcard/diy/index/index_bg.jpg",
                    "bgHeightScale" => 0,
                    "imgWidth" => 750,
                    "imgHeight" => 176,
                    "topStatusBar" => [
                        "isShow" => true,
                        "bgColor" => null,
                        "rollBgColor" => "#ffffff",
                        "style" => "style-1",
                        "styleName" => "风格1",
                        "textColor" => "rgba(255, 255, 255, 1)",
                        "rollTextColor" => "#333333",
                        "textAlign" => "center",
                        "inputPlaceholder" => "请输入搜索关键词",
                        "imgUrl" => "",
                        "link" => [
                            "name" => ""
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
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
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
                        "id" => "58m6ydgm0k80",
                        "componentName" => "ImageAds",
                        "componentTitle" => "图片广告",
                        "ignore" => [],
                        "textColor" => "#303133",
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
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
                        "imageHeight" => 172,
                        "isSameScreen"=> false,
                        "list" => [
                            [
                                "link" => [
                                    "name" => ""
                                ],
                                "imageUrl" => "addon/shop_giftcard/diy/index/banner.jpg",
                                "imgWidth" => 750,
                                "imgHeight" => 344,
                                "id" => "5xcp9bw2ew80",
                                "width" => 375,
                                "height" => 172
                            ]
                        ],
                    ],
                    [
                        "path" => "edit-horz-blank",
                        "uses" => 0,
                        "id" => "38lmw7b9s0o0",
                        "componentName" => "HorzBlank",
                        "componentTitle" => "辅助空白",
                        "ignore" => [
                            "pageBgColor",
                            "componentBgUrl"
                        ],
                        "height" => 15,
                        "textColor" => "#303133",
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 12,
                        "bottomRounded" => 0,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => -14,
                            "bottom" => 0,
                            "both" => 0
                        ],
                    ],
                    [
                        "path" => "edit-text",
                        "uses" => 0,
                        "position" => "",
                        "id" => "62zc9d8zuhw0",
                        "componentName" => "Text",
                        "componentTitle" => "标题",
                        "ignore" => [],
                        "style" => "style-1",
                        "styleName" => "风格1",
                        "text" => "精选好礼",
                        "link" => [
                            "name" => ""
                        ],
                        "textColor" => "#303133",
                        "fontSize" => 15,
                        "fontWeight" => "normal",
                        "textAlign" => "left",
                        "subTitle" => [
                            "text" => "副标题",
                            "color" => "#999999",
                            "fontSize" => 14,
                            "control" => false,
                            "fontWeight" => "normal"
                        ],
                        "more" => [
                            "text" => "更多",
                            "control" => false,
                            "isShow" => true,
                            "link" => [
                                "name" => ""
                            ],
                            "color" => "#999999"
                        ],
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => null,
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
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
                            "both" => 0
                        ],
                    ],
                    [
                        "path" => "edit-horz-blank",
                        "uses" => 0,
                        "id" => "4fdez7jtv4s0",
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
                    [
                        "path" => "edit-giftcard-list",
                        "uses" => 0,
                        "id" => "23peh7fzvctc",
                        "componentName" => "GiftcardList",
                        "componentTitle" => "礼品卡列表",
                        "ignore" => [],
                        "style" => "style-1",
                        "source" => "all",
                        "num" => 10,
                        "category_id" => "",
                        "category_name" => "请选择",
                        "giftcard_ids" => [],
                        "sortWay" => "default",
                        "cardNameStyle" => [
                            "color" => "#303133",
                            "control" => true,
                            "fontWeight" => "normal"
                        ],
                        "textColor" => "#303133",
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
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
                            "both" => 10
                        ],
                    ],
                    [
                        "path" => "edit-float-btn",
                        "uses" => 1,
                        "position" => "fixed",
                        "id" => "1v25o249cvls",
                        "componentName" => "FloatBtn",
                        "componentTitle" => "浮动按钮",
                        "ignore" => [
                            "pageBgColor",
                            "marginTop",
                            "marginBottom",
                            "marginBoth"
                        ],
                        "textColor" => "#303133",
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
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
                        "imageSize" => 40,
                        "aroundRadius" => 0,
                        "style" => "style-1",
                        "styleName" => "风格一",
                        "bottomPosition" => "lowerRight",
                        "list" => [
                            [
                                "imageUrl" => "addon/shop_giftcard/diy/index/shop_index.png",
                                "link" => [
                                    "parent" => "SHOP_LINK",
                                    "name" => "SHOP_INDEX",
                                    "title" => "商城首页",
                                    "url" => "/addon/shop/pages/index",
                                    "action" => "decorate"
                                ],
                                "id" => "6ua7hwe7bm80"
                            ]
                        ],
                        "offset" => 30,
                        "lateralOffset" => 15
                    ]
                ]

            ]

        ]
    ],
    'DIY_SHOP_GIFTCARD_MEMBER_INDEX' => [
        'shop_giftcard_member_index_style1' => [
            "title" => "礼品卡个人中心", // 页面名称
            'cover' => '', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '个人中心', // 页面描述
            'mode' => 'diy', // 页面模式：diy：自定义，fixed：固定
            'data' => [
                "global" => [
                    "title" => "礼品卡个人中心",
                    "pageStartBgColor" => "rgba(246, 246, 246, 1)",
                    "pageEndBgColor" => "",
                    "pageGradientAngle" => "to bottom",
                    "bgUrl" => "addon/shop_giftcard/diy/member/bg.jpg",
                    "bgHeightScale" => 0,
                    "imgWidth" => 750,
                    "imgHeight" => 680,
                    "topStatusBar" => [
                        "isShow" => true,
                        "bgColor" => null,
                        "rollBgColor" => "#ffffff",
                        "style" => "style-1",
                        "styleName" => "风格1",
                        "textColor" => "rgba(255, 255, 255, 1)",
                        "rollTextColor" => "#333333",
                        "textAlign" => "center",
                        "inputPlaceholder" => "请输入搜索关键词",
                        "imgUrl" => "",
                        "link" => [
                            "name" => ""
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
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
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
                        "path" => "edit-shop-member-info",
                        "uses" => 1,
                        "id" => "70g59dabvdg0",
                        "componentName" => "ShopMemberInfo",
                        "componentTitle" => "会员信息",
                        "ignore" => [
                            "componentBgUrl"
                        ],
                        "style" => "style-1",
                        "styleName" => "风格1",
                        "bgUrl" => "",
                        "isShowAccount" => false,
                        "uidTextColor" => "#FFFFFF",
                        'accountTextColor' => '#FFFFFF',
                        "textColor" => "#FFFFFF",
                        "pageStartBgColor" => null,
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
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
                    [
                        "path" => "edit-rubik-cube",
                        "uses" => 0,
                        "id" => "5e0gnm97oog0",
                        "componentName" => "RubikCube",
                        "componentTitle" => "魔方",
                        "ignore" => [],
                        "mode" => "row1-of2",
                        "imageGap" => 15,
                        "list" => [
                            [
                                "imageUrl" => "addon/shop_giftcard/diy/member/receive_list.png",
                                "imgWidth" => 340,
                                "imgHeight" => 201,
                                "link" => [
                                    "parent" => "SHOP_GIFTCARD_LINK",
                                    "name" => "SHOP_GIFTCARD_receive_list",
                                    "title" => "收到的礼品卡列表",
                                    "url" => "/addon/shop_giftcard/pages/receive_list"
                                ]
                            ],
                            [
                                "imageUrl" => "addon/shop_giftcard/diy/member/give_list.png",
                                "imgWidth" => 340,
                                "imgHeight" => 200,
                                "link" => [
                                    "parent" => "SHOP_GIFTCARD_LINK",
                                    "name" => "SHOP_GIFTCARD_give_list",
                                    "title" => "送出的礼品卡列表",
                                    "url" => "/addon/shop_giftcard/pages/give_list"
                                ]
                            ]
                        ],
                        "textColor" => "#303133",
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
                        "componentStartBgColor" => "",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 0,
                        "bottomRounded" => 0,
                        "elementBgColor" => "",
                        "topElementRounded" => 12,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 5,
                            "bottom" => 10,
                            "both" => 10
                        ]
                    ],
                    [
                        "path" => "edit-graphic-nav",
                        "uses" => 0,
                        "id" => "6rt731kfbdc0",
                        "componentName" => "GraphicNav",
                        "componentTitle" => "图文导航",
                        "ignore" => [],
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
                                "title" => "购卡记录",
                                "link" => [
                                    "parent" => "SHOP_GIFTCARD_LINK",
                                    "name" => "SHOP_GIFTCARD_ORDER_LIST",
                                    "title" => "礼品卡订单列表",
                                    "url" => "/addon/shop_giftcard/pages/order_list"
                                ],
                                "imageUrl" => "addon/shop_giftcard/diy/member/order_list.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "5xatwr0myrs0",
                                "imgWidth" => 66,
                                "imgHeight" => 66
                            ],
                            [
                                "title" => "我的卡包",
                                "link" => [
                                    "parent" => "SHOP_GIFTCARD_LINK",
                                    "name" => "SHOP_GIFTCARD_MY_CARD_LIST",
                                    "title" => "我的卡包",
                                    "url" => "/addon/shop_giftcard/pages/my_card_list"
                                ],
                                "imageUrl" => "addon/shop_giftcard/diy/member/my_card_list.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "5ra0gyo2in00",
                                "imgWidth" => 66,
                                "imgHeight" => 66
                            ],
                            [
                                "title" => "卡密激活",
                                "link" => [
                                    "parent" => "SHOP_GIFTCARD_LINK",
                                    "name" => "SHOP_GIFTCARD_ACTIVATE",
                                    "title" => "礼品卡激活中心",
                                    "url" => "/addon/shop_giftcard/pages/activate"
                                ],
                                "imageUrl" => "addon/shop_giftcard/diy/member/activate.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "7168luhawmc0",
                                "imgWidth" => 66,
                                "imgHeight" => 66
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
                        "pageStartBgColor" => null,
                        "pageEndBgColor" => "",
                        "pageGradientAngle" => "to bottom",
                        "componentBgUrl" => "",
                        "componentBgAlpha" => 2,
                        "componentStartBgColor" => "rgba(255, 255, 255, 1)",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 12,
                        "bottomRounded" => 12,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 3,
                            "bottom" => 0,
                            "both" => 10
                        ]
                    ]
                ]
            ]
        ]
    ],
];
