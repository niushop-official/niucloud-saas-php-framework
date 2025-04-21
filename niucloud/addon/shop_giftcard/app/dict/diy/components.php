<?php

return [
    'SHOP_GIFTCARD_COMPONENT' => [
        'title' => get_lang('dict_diy.shop_giftcard_component_type_basic'),
        'list' => [
            'GiftcardList' => [
                'title' => '礼品卡列表',
                'icon' => 'iconfont iconshangpinliebiaopc',
                'path' => 'edit-giftcard-list',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10000,
                'value' => [
                    'style' => 'style-1',
                    'source' => 'all',
                    'num' => 10,
                    'category_id' => '',
                    "category_name" => "请选择",
                    'giftcard_ids' => [],
                    "sortWay" => "default", // 排序方式，default：综合，sale_num：销量，price：价格
                    "cardNameStyle" => [
                        "color" => "#303133",
                        "control" => true,
                        "fontWeight" => 'normal'
                    ],
                ],
            ],
        ]
    ],

];