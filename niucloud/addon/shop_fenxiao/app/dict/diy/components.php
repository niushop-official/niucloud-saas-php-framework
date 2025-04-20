<?php

return [
    'SHOP_FENXIAO_COMPONENT' => [
        'title' => get_lang('dict_diy.shop_fenxiao_component_type_basic'),
        'list' => [
            'FenxiaoGoodsList' => [
                'title' => '分销商品',
                'icon' => 'iconfont iconfenxiaoshangpinpc',
                'path' => 'edit-fenxiao-goods-list',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10015,
                'value' => [
                    'style' => 'style-1',
                    'source' => 'all',
                    'num' => 20,
                    'is_become_fenxiao' => '1',
                    'goods_category' => '',
                    "goods_category_name" => "请选择",
                    'goods_ids' => [],
                    "sortWay" => "default", // 排序方式，default：综合，sale_num：销量，price：价格
                    "goodsNameStyle" => [
                        "color" => "#303133",
                        "control" => true,
                        "fontWeight" => 'normal'
                    ],
                    "priceStyle" => [
                        "mainColor" => "#333",
                        "mainControl" => true,
                        "lineColor" => "#999CA7",
                        "lineControl" => true
                    ],
                    "commissionStyle" => [
                        "color" => "#FF4142",
                        "control" => true
                    ],
                    "imgElementRounded" => 10,// 图片圆角
                ],
                // 组件属性
                'template' => [
                    "topElementRounded" => 10,// 元素上圆角
                    "bottomElementRounded" => 10 // 元素下圆角
                ]
            ]
        ]
    ]
];