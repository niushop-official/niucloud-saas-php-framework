<?php
return [
    [
        "name" => "上门服务模板", // 海报模板名称
        'type' => 'o2o_goods', // 海报类型
        "data" => [
            "global" => [
                "bgType" => "color",
                "bgColor" => "#ffffff",
                "bgUrl" => "",
//                "imgWidth" => 1500,
//                "imgHeight" => 2400,
                "width" => 720,
                "height" => 1280
            ],
            "value" => [
                [
                    "id" => "2v1nc497xhc0",
                    "componentName" => "O2oGoodsImage",
                    "componentTitle" => "服务项目图片",
                    "type" => "image",
                    "path" => "o2o-goods-image",
                    "uses" => 1,
                    "relate" => "goods_img",
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
                    "componentName" => "O2oGoodsName",
                    "componentTitle" => "服务项目名称",
                    "type" => "text",
                    "path" => "o2o-goods-name",
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
                    "componentName" => "O2oGoodsPrice",
                    "componentTitle" => "服务项目价格",
                    "type" => "text",
                    "path" => "o2o-goods-price",
                    "uses" => 1,
                    "relate" => "goods_price",
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
                    "value" => "长按识别图中的二维码查看项目详情",
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