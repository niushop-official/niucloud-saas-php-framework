<?php

return [
    'shop_giftcard_give' => [
        'title' => get_lang('dict_diy_poster.shop_giftcard_component_type_basic'),
        'support' => [ 'shop_giftcard_give' ], // 支持的插件
        'list' => [
            'GiftCardImage' => [
                'title' => "礼品卡图片",
                'type' => 'image',
                'icon' => "iconfont icona-lipinkatupianpc30",
                'path' => "giftcard-image", // 属性编辑
                'uses' => 1,
                'sort' => 10006,
                'relate' => 'giftcard_image', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 580,
                    "height" => 353,
                    'minWidth' => 60, // 最小宽度
                    'minHeight' => 60 // 最小高度
                ],
            ],
            'GiftCardName' => [
                'title' => "礼品卡名称",
                'type' => 'text',
                'icon' => "iconfont icona-lipinkamingchengpc30",
                'path' => "giftcard-name",
                'uses' => 1,
                'sort' => 10007,
                'relate' => 'giftcard_name', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 482,
                    "height" => 52,
                    "minWidth" => 120,
                    "minHeight" => 44
                ]
            ],
            'GiftCardValidity' => [
                'title' => "礼品卡有效期",
                'type' => 'text',
                'icon' => "iconfont icona-lipinkayouxiaoqipc30",
                'path' => "giftcard-validity",
                'uses' => 1,
                'sort' => 10008,
                'relate' => 'giftcard_validity', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 484,
                    "height" => 45,
                    "minWidth" => 120,
                    "minHeight" => 44
                ]
            ],
            'GiftCardBlessing' => [
                'title' => "祝福语",
                'type' => 'text',
                'icon' => "iconfont icona-lipinkazhufuyupc30",
                'path' => "giftcard-blessing",
                'uses' => 1,
                'sort' => 10009,
                'relate' => 'giftcard_blessing', // 关联字段，空为不处理
                'value' => '',
                'template' => [
                    "width" => 482,
                    "height" => 116,
                    "minWidth" => 120,
                    "minHeight" => 44
                ]
            ],

        ]
    ],

];