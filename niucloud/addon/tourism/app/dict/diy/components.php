<?php

return [
    'TOURISM_COMPONENT' => [
        'title' => get_lang('dict_diy.tourism_component_type_basic'),
        'list' => [
            'TourismTravel' => [
                'title' => '线路',
                'icon' => 'iconfont iconxianlupc',
                'path' => 'edit-tourism-travel',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10005,
                'value' => [
                    'head' => '热门推荐',
                    'style' => 'style1',
                    'link' => [
                        'name' => ""
                    ],
                    'count' => 8,
                    'articleIds' => [],
                    'layout' => 'twoLines',
                    'source' => 'all',
                    'num' => 10,
                    'way_id' => []
                ],
            ],
            'TourismTickets' => [
                'title' => '景点',
                'icon' => 'iconfont iconjingdianpc',
                'path' => 'edit-tourism-tickets',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10006,
                'value' => [
                    'head' => '热门推荐',
                    'style' => 'style1',
                    'link' => [
                        'name' => ""
                    ],
                    'count' => 8,
                    'articleIds' => [],
                    'layout' => 'twoLines',
                    'source' => 'all',
                    'num' => 10,
                    'scenic_id' => []
                ],
            ],
            'TourismHotel' => [
                'title' => '酒店',
                'icon' => 'iconfont iconjiudianpc',
                'path' => 'edit-tourism-hotel',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10007,
                'value' => [
                    'head' => '热门推荐',
                    'style' => 'style1',
                    'link' => [
                        'name' => ""
                    ],
                    'count' => 8,
                    'articleIds' => [],
                    'layout' => 'oneLines',
                    'source' => 'all',
                    'num' => 10,
                    'hotel_id' => []
                ],
            ]
        ],
    ],

];
