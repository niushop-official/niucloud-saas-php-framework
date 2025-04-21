<?php
return [
    [
        "name" => "酒店模板", // 海报模板名称
        'type' => 'tourism_hotel', // 海报类型
        "data" => [
            "global" => [
                "bgType" => "color",
                "bgColor" => "#ffffff",
                "bgUrl" => "",
                "width" => 720,
                "height" => 1280
            ],
            "value" => [
                [
                    "id" => "2v1nc497xhc0",
                    "componentName" => "HotelImage",
                    "componentTitle" => "酒店图片",
                    "type" => "image",
                    "path" => "tourism-goods-image",
                    "uses" => 1,
                    "relate" => "goods_cover",
                    "value" => "",
                    "width" => 720,
                    "height" => 720,
                    "minWidth" => 60,
                    "minHeight" => 60,
                    "x" => 0,
                    "y" => 0,
                    "angle" => 0,
                    "zIndex" => 1
                ],
                [
                    "id" => "29f3czpuw134",
                    "componentName" => "HotelName",
                    "componentTitle" => "名称",
                    "type" => "text",
                    "path" => "tourism-goods-name",
                    "uses" => 1,
                    "relate" => "goods_name",
                    "value" => "",
                    "width" => 640,
                    "height" => 94,
                    "minWidth" => 120,
                    "minHeight" => 44,
                    "x" => 40,
                    "y" => 760,
                    "angle" => 0,
                    "zIndex" => 2,
                    "fontFamily" => "",
                    "fontSize" => 44,
                    "weight" => false,
                    "space" => 0,
                    "lineHeight" => 1,
                    "fontColor" => "#303133"
                ],
                [
                    "id" => "2vmf9ovhene0",
                    "componentName" => "HotelPrice",
                    "componentTitle" => "价格",
                    "type" => "text",
                    "path" => "tourism-goods-price",
                    "uses" => 1,
                    "relate" => "price",
                    "value" => "",
                    "width" => 330,
                    "height" => 60,
                    "minWidth" => 120,
                    "minHeight" => 44,
                    "x" => 40,
                    "y" => 940,
                    "weight" => false,
                    "space" => 0,
                    "lineHeight" => 0,
                    "angle" => 0,
                    "zIndex" => 3,
                    "fontFamily" => "static/font/price.ttf",
                    "fontSize" => 44,
                    "fontColor" => "#E4163F"
                ],
                [
                    "id" => "2rlojy3o60i0",
                    "componentName" => "Qrcode",
                    "componentTitle" => "二维码",
                    "type" => "qrcode",
                    "path" => "qrcode",
                    "uses" => 1,
                    "relate" => "url",
                    "value" => "",
                    "width" => 200,
                    "height" => 200,
                    "minWidth" => 60,
                    "minHeight" => 60,
                    "x" => 480,
                    "y" => 940,
                    "angle" => 0,
                    "zIndex" => 5
                ],
                [
                    "id" => "7a18udv7t950",
                    "componentName" => "draw",
                    "componentTitle" => "绘画",
                    "type" => "draw",
                    "path" => "draw",
                    "uses" => 1,
                    "relate" => "draw",
                    "value" => "",
                    "width" => 720,
                    "height" => 70,
                    "minWidth" => 60,
                    "minHeight" => 60,
                    "x" => 0,
                    "y" => 1206,
                    "angle" => 0,
                    "zIndex" => 6,
                    "drawType" => "Polygon",
                    "bgColor" => "#eeeeee",
                    "points" => [
                        [
                            0,
                            1206
                        ],
                        [
                            720,
                            1206
                        ],
                        [
                            720,
                            1280
                        ],
                        [
                            0,
                            1280
                        ]
                    ]
                ],
                [
                    "id" => "6hlj5l3as0w0",
                    "componentName" => "Text",
                    "componentTitle" => "文本",
                    "type" => "text",
                    "path" => "text",
                    "uses" => 0,
                    "relate" => "",
                    "value" => "长按识别图中的二维码查看商品详情",
                    "width" => 512,
                    "height" => 48,
                    "minWidth" => 120,
                    "minHeight" => 44,
                    "x" => 110,
                    "y" => 1230,
                    "angle" => 0,
                    "zIndex" => 7,
                    "weight" => false,
                    "space" => 0,
                    "lineHeight" => 0,
                    "fontFamily" => "",
                    "fontSize" => 32,
                    "fontColor" => "#666666"
                ],
            ]
        ]
    ],

    [
        "name" => "景点模板", // 海报模板名称
        'type' => 'tourism_scenic', // 海报类型
        "data" => [
            "global" => [
                "bgType" => "color",
                "bgColor" => "#ffffff",
                "bgUrl" => "",
                "width" => 720,
                "height" => 1280
            ],
            "value" => [
                [
                    "id" => "2v1nc497xhc0",
                    "componentName" => "ScenicImage",
                    "componentTitle" => "景点图片",
                    "type" => "image",
                    "path" => "tourism-goods-image",
                    "uses" => 1,
                    "relate" => "goods_cover",
                    "value" => "",
                    "width" => 720,
                    "height" => 720,
                    "minWidth" => 60,
                    "minHeight" => 60,
                    "x" => 0,
                    "y" => 0,
                    "angle" => 0,
                    "zIndex" => 1
                ],
                [
                    "id" => "29f3czpuw134",
                    "componentName" => "ScenicName",
                    "componentTitle" => "名称",
                    "type" => "text",
                    "path" => "tourism-goods-name",
                    "uses" => 1,
                    "relate" => "goods_name",
                    "value" => "",
                    "width" => 640,
                    "height" => 94,
                    "minWidth" => 120,
                    "minHeight" => 44,
                    "x" => 40,
                    "y" => 760,
                    "angle" => 0,
                    "zIndex" => 2,
                    "fontFamily" => "",
                    "fontSize" => 44,
                    "weight" => false,
                    "space" => 0,
                    "lineHeight" => 1,
                    "fontColor" => "#303133"
                ],
                [
                    "id" => "2vmf9ovhene0",
                    "componentName" => "ScenicPrice",
                    "componentTitle" => "价格",
                    "type" => "text",
                    "path" => "tourism-goods-price",
                    "uses" => 1,
                    "relate" => "price",
                    "value" => "",
                    "width" => 330,
                    "height" => 60,
                    "minWidth" => 120,
                    "minHeight" => 44,
                    "x" => 40,
                    "y" => 940,
                    "weight" => false,
                    "space" => 0,
                    "lineHeight" => 0,
                    "angle" => 0,
                    "zIndex" => 3,
                    "fontFamily" => "static/font/price.ttf",
                    "fontSize" => 44,
                    "fontColor" => "#E4163F"
                ],
                [
                    "id" => "2rlojy3o60i0",
                    "componentName" => "Qrcode",
                    "componentTitle" => "二维码",
                    "type" => "qrcode",
                    "path" => "qrcode",
                    "uses" => 1,
                    "relate" => "url",
                    "value" => "",
                    "width" => 200,
                    "height" => 200,
                    "minWidth" => 60,
                    "minHeight" => 60,
                    "x" => 480,
                    "y" => 940,
                    "angle" => 0,
                    "zIndex" => 5
                ],
                [
                    "id" => "7a18udv7t950",
                    "componentName" => "draw",
                    "componentTitle" => "绘画",
                    "type" => "draw",
                    "path" => "draw",
                    "uses" => 1,
                    "relate" => "draw",
                    "value" => "",
                    "width" => 720,
                    "height" => 70,
                    "minWidth" => 60,
                    "minHeight" => 60,
                    "x" => 0,
                    "y" => 1206,
                    "angle" => 0,
                    "zIndex" => 6,
                    "drawType" => "Polygon",
                    "bgColor" => "#eeeeee",
                    "points" => [
                        [
                            0,
                            1206
                        ],
                        [
                            720,
                            1206
                        ],
                        [
                            720,
                            1280
                        ],
                        [
                            0,
                            1280
                        ]
                    ]
                ],
                [
                    "id" => "6hlj5l3as0w0",
                    "componentName" => "Text",
                    "componentTitle" => "文本",
                    "type" => "text",
                    "path" => "text",
                    "uses" => 0,
                    "relate" => "",
                    "value" => "长按识别图中的二维码查看商品详情",
                    "width" => 512,
                    "height" => 48,
                    "minWidth" => 120,
                    "minHeight" => 44,
                    "x" => 110,
                    "y" => 1230,
                    "angle" => 0,
                    "zIndex" => 7,
                    "weight" => false,
                    "space" => 0,
                    "lineHeight" => 0,
                    "fontFamily" => "",
                    "fontSize" => 32,
                    "fontColor" => "#666666"
                ],
            ]
        ]
    ],
    [
        "name" => "线路模板", // 海报模板名称
        'type' => 'tourism_way', // 海报类型
        "data" => [
            "global" => [
                "bgType" => "color",
                "bgColor" => "#ffffff",
                "bgUrl" => "",
                "width" => 720,
                "height" => 1280
            ],
            "value" => [
                [
                    "id" => "2v1nc497xhc0",
                    "componentName" => "WayImage",
                    "componentTitle" => "线路图片",
                    "type" => "image",
                    "path" => "tourism-goods-image",
                    "uses" => 1,
                    "relate" => "goods_cover",
                    "value" => "",
                    "width" => 720,
                    "height" => 720,
                    "minWidth" => 60,
                    "minHeight" => 60,
                    "x" => 0,
                    "y" => 0,
                    "angle" => 0,
                    "zIndex" => 1
                ],
                [
                    "id" => "29f3czpuw134",
                    "componentName" => "WayName",
                    "componentTitle" => "名称",
                    "type" => "text",
                    "path" => "tourism-goods-name",
                    "uses" => 1,
                    "relate" => "goods_name",
                    "value" => "",
                    "width" => 640,
                    "height" => 94,
                    "minWidth" => 120,
                    "minHeight" => 44,
                    "x" => 40,
                    "y" => 760,
                    "angle" => 0,
                    "zIndex" => 2,
                    "fontFamily" => "",
                    "fontSize" => 44,
                    "weight" => false,
                    "space" => 0,
                    "lineHeight" => 1,
                    "fontColor" => "#303133"
                ],
                [
                    "id" => "2vmf9ovhene0",
                    "componentName" => "WayPrice",
                    "componentTitle" => "价格",
                    "type" => "text",
                    "path" => "tourism-goods-price",
                    "uses" => 1,
                    "relate" => "price",
                    "value" => "",
                    "width" => 330,
                    "height" => 60,
                    "minWidth" => 120,
                    "minHeight" => 44,
                    "x" => 40,
                    "y" => 940,
                    "weight" => false,
                    "space" => 0,
                    "lineHeight" => 0,
                    "angle" => 0,
                    "zIndex" => 3,
                    "fontFamily" => "static/font/price.ttf",
                    "fontSize" => 44,
                    "fontColor" => "#E4163F"
                ],
                [
                    "id" => "2rlojy3o60i0",
                    "componentName" => "Qrcode",
                    "componentTitle" => "二维码",
                    "type" => "qrcode",
                    "path" => "qrcode",
                    "uses" => 1,
                    "relate" => "url",
                    "value" => "",
                    "width" => 200,
                    "height" => 200,
                    "minWidth" => 60,
                    "minHeight" => 60,
                    "x" => 480,
                    "y" => 940,
                    "angle" => 0,
                    "zIndex" => 5
                ],
                [
                    "id" => "7a18udv7t950",
                    "componentName" => "draw",
                    "componentTitle" => "绘画",
                    "type" => "draw",
                    "path" => "draw",
                    "uses" => 1,
                    "relate" => "draw",
                    "value" => "",
                    "width" => 720,
                    "height" => 70,
                    "minWidth" => 60,
                    "minHeight" => 60,
                    "x" => 0,
                    "y" => 1206,
                    "angle" => 0,
                    "zIndex" => 6,
                    "drawType" => "Polygon",
                    "bgColor" => "#eeeeee",
                    "points" => [
                        [
                            0,
                            1206
                        ],
                        [
                            720,
                            1206
                        ],
                        [
                            720,
                            1280
                        ],
                        [
                            0,
                            1280
                        ]
                    ]
                ],
                [
                    "id" => "6hlj5l3as0w0",
                    "componentName" => "Text",
                    "componentTitle" => "文本",
                    "type" => "text",
                    "path" => "text",
                    "uses" => 0,
                    "relate" => "",
                    "value" => "长按识别图中的二维码查看商品详情",
                    "width" => 512,
                    "height" => 48,
                    "minWidth" => 120,
                    "minHeight" => 44,
                    "x" => 110,
                    "y" => 1230,
                    "angle" => 0,
                    "zIndex" => 7,
                    "weight" => false,
                    "space" => 0,
                    "lineHeight" => 0,
                    "fontFamily" => "",
                    "fontSize" => 32,
                    "fontColor" => "#666666"
                ],
            ]
        ]
    ]

];