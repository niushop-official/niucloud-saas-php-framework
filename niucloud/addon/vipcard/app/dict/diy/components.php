<?php

return [
    'VIPCARD_COMPONENT' => [
        'title' => get_lang('dict_diy.vipcard_component_type_basic'),
        'list' => [
            'VipcardStore' => [
                'title' => '会员信息',
                'icon' => 'iconfont iconhuiyuanqiandaopc',
                'path' => 'edit-vipcard-store',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10005,
                'value' => [
                    'head' => '热门推荐',
                    'style' => 'style1',
                    'link' => [
                        'name' => ""
                    ],
                    'source' => 'initial',
                    'count' => 8
                ],
            ],
            'VipcardReserve' => [
                'title' => '预约',
                'icon' => 'iconfont iconqiehuanpc',
                'path' => 'edit-vipcard-reserve',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10006,
                'value' => [
                    'head' => '热门推荐',
                    'style' => 'style1',
                    'link' => [
                        'name' => ""
                    ],
                    'source' => 'all',
                    'count' => 8,
                    'goods_ids' => ''
                ],
            ],
            'VipcardCard' => [
                'title' => '卡项',
                'icon' => 'iconfont iconkaxiangpc',
                'path' => 'edit-vipcard-card',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10007,
                'value' => [
                    'head' => '热门推荐',
                    'style' => 'style1',
                    'link' => [
                        'name' => ""
                    ],
                    'source' => 'all',
                    'count' => 8,
                    'goods_ids' => ''
                ],
            ]
        ],
    ],

];
