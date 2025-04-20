<?php

return [
    'DIY_O2O_INDEX' => [
        'o2o_index' => [ // 页面标识
            "title" => "上门服务", // 页面名称
            'cover' => '', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '', // 页面描述
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
                        "path" => "edit-o2o-search",
                        "uses" => 1,
                        "id" => "25tm2kzwe9nk",
                        "componentName" => "O2oSearch",
                        "componentTitle" => "搜索",
                        "ignore" => [],
                        "searchStyle" => "style-1",
                        "searchLink" => [
                            "name" => ""
                        ],
                        "iconType" => "img",
                        "imageUrl" => "",
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
                            "top" => 10,
                            "bottom" => 10,
                            "both" => 10
                        ],
                        "style" => "style2",
                        "bg_color" => "#FFFFFF",
                        "pageStyle" => "padding-top:20rpx;padding-bottom:20rpx;padding-right:20rpx;padding-left:20rpx;",
                        "searchText" => "请输入项目名称"
                    ],
                    [
                        "path" => "edit-rubik-cube",
                        "uses" => 0,
                        "id" => "4m3xkrv1wby0",
                        "componentName" => "RubikCube",
                        "componentTitle" => "魔方",
                        "ignore" => [],
                        "mode" => "row1-of4",
                        "imageGap" => 7.5,
                        "list" => [
                            [
                                "imageUrl" => "addon/o2o/diy/index/rubikcube_1.png",
                                "imgWidth" => 83.25,
                                "imgHeight" => 113.05555555555556,
                                "link" => [
                                    "name" => ""
                                ],
                                "pageItemStyle" => "border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;",
                                "widthStyle" => "calc((100% - 23px) / 4)"
                            ], [
                                "imageUrl" => "addon/o2o/diy/index/rubikcube_2.png",
                                "imgWidth" => 83.25,
                                "imgHeight" => 113.05555555555556,
                                "link" => [
                                    "name" => ""
                                ],
                                "pageItemStyle" => "border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;",
                                "widthStyle" => "calc((100% - 23px) / 4)"
                            ], [
                                "imageUrl" => "addon/o2o/diy/index/rubikcube_3.png",
                                "imgWidth" => 83.25,
                                "imgHeight" => 113.05555555555556,
                                "link" => [
                                    "name" => ""
                                ],
                                "pageItemStyle" => "border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;",
                                "widthStyle" => "calc((100% - 23px) / 4)"
                            ], [
                                "imageUrl" => "addon/o2o/diy/index/rubikcube_4.png",
                                "imgWidth" => 83.25,
                                "imgHeight" => 113.05555555555556,
                                "link" => [
                                    "name" => ""
                                ],
                                "pageItemStyle" => "border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;border-top-left-radius:0rpx;border-top-right-radius:0rpx;border-bottom-left-radius:0rpx;border-bottom-right-radius:0rpx;",
                                "widthStyle" => "calc((100% - 23px) / 4)"
                            ] ],
                        "textColor" => "#303133",
                        'pageStartBgColor' => 'rgba(255, 255, 255, 1)',
                        'pageEndBgColor' => '',
                        'pageGradientAngle' => 'to bottom',
                        'componentBgUrl' => '',
                        'componentBgAlpha' => 2,
                        "componentStartBgColor" => "",
                        "componentEndBgColor" => "",
                        "componentGradientAngle" => "to bottom",
                        "topRounded" => 10,
                        "bottomRounded" => 0,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 10,
                            "bottom" => 10,
                            "both" => 10
                        ],
                        "pageStyle" => "background-color:rgba(255, 255, 255, 1);padding-top:20rpx;padding-bottom:20rpx;padding-right:20rpx;padding-left:20rpx;"
                    ],
                    [
                        "path" => "edit-graphic-nav",
                        "uses" => 0,
                        "id" => "7c75avfhswo0",
                        "componentName" => "GraphicNav",
                        "componentTitle" => "图文导航",
                        "ignore" => [],
                        "layout" => "horizontal",
                        "mode" => "graphic",
                        "showStyle" => "fixed",
                        "rowCount" => 5,
                        "pageCount" => 2,
                        "carousel" => [
                            "type" => "circle",
                            "color" => "#FFFFFF"
                        ],
                        "imageSize" => 30,
                        "aroundRadius" => 0,
                        "font" => [
                            "size" => 14,
                            "weight" => "normal",
                            "color" => "#303133"
                        ],
                        "list" => [
                            [
                                "title" => "深度保洁",
                                "link" => [
                                    "parent" => "O2O_LINK",
                                    "name" => "O2O_CATEGORY",
                                    "title" => "项目分类",
                                    "url" => "/addon/o2o/pages/goods/category",
                                    "action" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/index/nav_1.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "86mcxqg7ycg",
                                "imgWidth" => 83,
                                "imgHeight" => 83
                            ], [
                                "title" => "清洁玻璃",
                                "link" => [
                                    "parent" => "O2O_LINK",
                                    "name" => "O2O_CATEGORY",
                                    "title" => "项目分类",
                                    "url" => "/addon/o2o/pages/goods/category",
                                    "action" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/index/nav_2.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "4ylm8o81jr80",
                                "imgWidth" => 75,
                                "imgHeight" => 75
                            ], [
                                "title" => "家具养护",
                                "link" => [
                                    "parent" => "O2O_LINK",
                                    "name" => "O2O_CATEGORY",
                                    "title" => "项目分类",
                                    "url" => "/addon/o2o/pages/goods/category",
                                    "action" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/index/nav_3.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "6wp1x2w81a40",
                                "imgWidth" => 84,
                                "imgHeight" => 78
                            ], [
                                "title" => "做饭保洁",
                                "link" => [
                                    "parent" => "O2O_LINK",
                                    "name" => "O2O_CATEGORY",
                                    "title" => "项目分类",
                                    "url" => "/addon/o2o/pages/goods/category",
                                    "action" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/index/nav_4.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "57bbo260q4k0",
                                "imgWidth" => 84,
                                "imgHeight" => 75
                            ], [
                                "id" => "6jyeoqb04io0",
                                "title" => "收纳整理",
                                "imageUrl" => "addon/o2o/diy/index/nav_5.png",
                                "imgWidth" => 78,
                                "imgHeight" => 75,
                                "link" => [
                                    "parent" => "O2O_LINK",
                                    "name" => "O2O_CATEGORY",
                                    "title" => "项目分类",
                                    "url" => "/addon/o2o/pages/goods/category",
                                    "action" => ""
                                ],
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ]
                            ] ],
                        // 轮播图设置
                        'swiper' => [
                            'indicatorColor' => 'rgba(0, 0, 0, 0.3)', // 未选中颜色
                            "indicatorActiveColor" => '#FF0E0E',
                            'indicatorStyle' => 'style-1',
                            'indicatorAlign' => 'center',
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
                            "top" => 10,
                            "bottom" => 10,
                            "both" => 10
                        ],
                        "pageStyle" => "background-color:rgba(255, 255, 255, 1);padding-top:20rpx;padding-bottom:20rpx;padding-right:20rpx;padding-left:20rpx;"
                    ],
                    [
                        "path" => "edit-notice",
                        "uses" => 0,
                        "id" => "62clfcnabuk0",
                        "componentName" => "Notice",
                        "componentTitle" => "公告",
                        "ignore" => [],
                        "noticeType" => "img",
                        "imgType" => "diy",
                        "systemUrl" => "style_1",
                        "imageUrl" => "addon/o2o/diy/index/notice.png",
                        "showType" => "popup",
                        "scrollWay" => "upDown",
                        "fontSize" => 14,
                        "fontWeight" => "normal",
                        "noticeTitle" => "公告",
                        "list" => [
                            [
                                "id" => "1rz6s4buaxc0",
                                "link" => [
                                    "name" => ""
                                ],
                                "text" => "北京市用户1283848495【家具护养】服务下单了…"
                            ]
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
                        "topRounded" => 5,
                        "bottomRounded" => 5,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 10,
                            "bottom" => 0,
                            "both" => 10
                        ],
                        "pageStyle" => "padding-top:0rpx;padding-bottom:2rpx;padding-right:0rpx;padding-left:0rpx;"
                    ],
                    [
                        "path" => "edit-image-ads",
                        "uses" => 0,
                        "id" => "2rl3a6d4l6w0",
                        "componentName" => "ImageAds",
                        "componentTitle" => "图片广告",
                        "ignore" => [],
                        "imageHeight" => 141,
                        "isSameScreen"=> false,
                        "list" => [
                            [
                                "link" => [
                                    "name" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/index/img_adv.png",
                                "imgWidth" => 1053,
                                "imgHeight" => 396,
                                "id" => "65ydcgyawmw0",
                                "width" => 375,
                                "height" => 141.02564102564102
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
                            "top" => 10,
                            "bottom" => 10,
                            "both" => 10
                        ],
                        "pageStyle" => "padding-top:20rpx;padding-bottom:20rpx;padding-right:20rpx;padding-left:20rpx;"
                    ],
                    [
                        "path" => "edit-o2o-goods-list",
                        "uses" => 0,
                        "id" => "4cm2d420w1k0",
                        "componentName" => "O2oGoodsList",
                        "componentTitle" => "项目列表",
                        "ignore" => [],
                        "style" => "style3",
                        "source" => "all",
                        "num" => 10,
                        "goods_category" => 0,
                        "goods_ids" => [],
                        "title_is_show" => true,
                        "title_link" => "",
                        "title_font_size" => 16,
                        "title_text_color" => "#303133",
                        "title_font_weight" => "bold",
                        "sub_title_color" => "#927354",
                        "sub_title_text" => "",
                        "sub_title_font_size" => 12,
                        "more_is_show" => true,
                        "more_font_size" => 12,
                        "more_color" => "#666666",
                        "more_text" => "更多",
                        "more_link" => [
                            "parent" => "O2O_LINK",
                            "name" => "O2O_CATEGORY",
                            "title" => "项目分类",
                            "url" => "/addon/o2o/pages/goods/category",
                            "action" => ""
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
                            "top" => 11,
                            "bottom" => 14,
                            "both" => 13
                        ],
                        "title_isShow" => false,
                        "pageStyle" => "background-color:rgba(255, 242, 242, 1);padding-top:22rpx;padding-bottom:28rpx;padding-right:26rpx;padding-left:26rpx;",
                        "title_text" => "家庭保洁",
                        "title_icon" => "addon/o2o/diy/index/title_icon.png"
                    ],
                    [
                        "path" => "edit-o2o-goods-list",
                        "uses" => 0,
                        "id" => "412xw3ifvrg0",
                        "componentName" => "O2oGoodsList",
                        "componentTitle" => "项目列表",
                        "ignore" => [],
                        "style" => "style2",
                        "source" => "all",
                        "num" => 10,
                        "goods_category" => "",
                        "goods_ids" => [],
                        "title_is_show" => true,
                        "title_font_size" => 16,
                        "title_text_color" => "#303133",
                        "title_font_weight" => "bold",
                        "sub_title_color" => "#927354",
                        "sub_title_text" => "专业服务 省心又省钱",
                        "sub_title_font_size" => 12,
                        "more_is_show" => true,
                        "more_font_size" => 12,
                        "more_color" => "#666666",
                        "more_text" => "更多",
                        "more_link" => [
                            "parent" => "O2O_LINK",
                            "name" => "O2O_CATEGORY",
                            "title" => "项目分类",
                            "url" => "/addon/o2o/pages/goods/category",
                            "action" => ""
                        ],
                        "title_text" => "推荐服务",
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
                            "top" => 10,
                            "bottom" => 10,
                            "both" => 10
                        ],
                        "title_icon" => "",
                        "pageStyle" => "padding-top:0rpx;padding-bottom:0rpx;padding-right:0rpx;padding-left:0rpx;"
                    ],
                    [
                        "path" => "edit-graphic-nav",
                        "uses" => 0,
                        "id" => "1plfcbdiaym8",
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
                        "imageSize" => 23,
                        "aroundRadius" => 1,
                        "font" => [
                            "size" => 14,
                            "weight" => "normal",
                            "color" => "rgba(153, 153, 153, 1)"
                        ],
                        "list" => [
                            [
                                "title" => "运营范围",
                                "link" => [
                                    "name" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/index/bottom_nav_1.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "5zmbt7xudm80",
                                "imgWidth" => 81,
                                "imgHeight" => 69
                            ], [
                                "title" => "城市覆盖",
                                "link" => [
                                    "name" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/index/bottom_nav_2.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "7a5051aiwsw0",
                                "imgWidth" => 81,
                                "imgHeight" => 72
                            ], [
                                "title" => "服务家庭",
                                "link" => [
                                    "name" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/index/bottom_nav_3.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "3gztl1arnso0",
                                "imgWidth" => 75,
                                "imgHeight" => 75
                            ], [
                                "title" => "随叫随到",
                                "link" => [
                                    "name" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/index/bottom_nav_4.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "4y6uj9uco540",
                                "imgWidth" => 72,
                                "imgHeight" => 72
                            ] ],
                        // 轮播图设置
                        'swiper' => [
                            'indicatorColor' => 'rgba(0, 0, 0, 0.3)', // 未选中颜色
                            "indicatorActiveColor" => '#FF0E0E',
                            'indicatorStyle' => 'style-1',
                            'indicatorAlign' => 'center',
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
                            "top" => 20,
                            "bottom" => 20,
                            "both" => 0
                        ]
                    ]
                ]
            ]
        ]
    ],
    'DIY_O2O_MEMBER_INDEX' => [
        'o2o_member_index' => [
            "title" => "上门服务个人中心", // 页面名称
            'cover' => '', // 页面封面图
            'preview' => '', // 页面预览图
            'desc' => '个人中心', // 页面描述
            'mode' => 'diy', // 页面模式：diy：自定义，fixed：固定
            'data' => [
                "global" => [
                    "title" => "个人中心",
                    'pageStartBgColor' => '#F8F8F8',
                    'pageEndBgColor' => '',
                    'pageGradientAngle' => 'to bottom',
                    "bgUrl" => "addon/o2o/diy/member/member_bg.png",
                    'bgHeightScale' => 0,
                    "imgWidth" => 1372,
                    "imgHeight" => 680,
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
                        "path" => "edit-o2o-member-info",
                        "id" => "67qv49qgxp00",
                        "componentName" => "O2oMemberInfo",
                        "componentTitle" => "会员信息",
                        "uses" => 0,
                        "ignore" => [],
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
                        "style" => "style-1",
                        "styleName" => "风格1",
                        "textColor" => "#FFFFFF",
                        "bgUrl" => "addon/o2o/diy/member/member_bg.png",
                        "bgColorStart" => "",
                        "bgColorEnd" => "",
                        "pageStyle" => "padding-top:24rpx;padding-bottom:12rpx;padding-right:32rpx;padding-left:32rpx;"
                    ],
                    [
                        "path" => "edit-o2o-order-info",
                        "uses" => 1,
                        "id" => "719ood0bxow0",
                        "componentName" => "O2oOrderInfo",
                        "componentTitle" => "订单中心",
                        "ignore" => [
                            "componentBgUrl"
                        ],
                        "textColor" => "#303133",
                        "fontSize" => 16,
                        "fontWeight" => "normal",
                        "text" => "订单中心",
                        "more" => [
                            "text" => "全部订单",
                            "color" => "#999999"
                        ],
                        "item" => [
                            "fontSize" => 12,
                            "fontWeight" => "normal",
                            "color" => "#303133"
                        ],
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
                            "top" => 15,
                            "bottom" => 0,
                            "both" => 12
                        ]
                    ],
                    [
                        "path" => "edit-o2o-technician",
                        "uses" => 0,
                        "id" => "2l5loljjum40",
                        "componentName" => "O2oTechnician",
                        "componentTitle" => "技师中心",
                        "ignore" => [],
                        "imageHeight" => 140,
                        "imageUrl" => "addon/o2o/diy/member/technician.jpg",
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
                        "topRounded" => 0,
                        "bottomRounded" => 0,
                        "elementBgColor" => "",
                        "topElementRounded" => 0,
                        "bottomElementRounded" => 0,
                        "margin" => [
                            "top" => 10,
                            "bottom" => 0,
                            "both" => 0
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
                        "text" => "常用工具",
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
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
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
                        "aroundRadius" => 7,
                        "font" => [
                            "size" => 12,
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
                                "title" => "地址管理",
                                "link" => [
                                    "parent" => "O2O_LINK",
                                    "name" => "O2O_ADDRESS_LIST",
                                    "title" => "上门服务地址列表",
                                    "url" => "/addon/o2o/pages/address/index",
                                    "action" => ""
                                ],
                                "imageUrl" => "addon/o2o/diy/member/address.png",
                                "label" => [
                                    "control" => false,
                                    "text" => "热门",
                                    "textColor" => "#FFFFFF",
                                    "bgColorStart" => "#F83287",
                                    "bgColorEnd" => "#FE3423"
                                ],
                                "id" => "6gqbh1tvyr00",
                                "imgWidth" => 38,
                                "imgHeight" => 42
                            ],
                            [
                                "id" => "64kucyvrh1w0",
                                "title" => "退款管理",
                                "imageUrl" => "addon/o2o/diy/member/refund.png",
                                "imgWidth" => 121,
                                "imgHeight" => 113,
                                "link" => [
                                    "parent" => "O2O_LINK",
                                    "name" => "O2O_REFUND_LIST",
                                    "title" => "上门服务退款列表",
                                    "url" => "/addon/o2o/pages/refund/list",
                                    "action" => ""
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
                        "pageStartBgColor" => "",
                        "pageEndBgColor" => "",
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
                            "bottom" => 10,
                            "both" => 0
                        ],
                        "pageStyle" => "padding-top:12rpx;padding-bottom:24rpx;padding-right:32rpx;padding-left:32rpx;",
                        "swiper" => [
                            "indicatorColor" => "rgba(0, 0, 0, 0.3)",
                            "indicatorActiveColor" => "#FF0E0E",
                            "indicatorStyle" => "style-1",
                            "indicatorAlign" => "center"
                        ]
                    ]
                ]
            ]
        ]
    ]
];
