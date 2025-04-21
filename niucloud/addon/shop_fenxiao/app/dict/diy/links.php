<?php

return [
    'SHOP_FENXIAO_LINK' => [
        'title' => get_lang('dict_diy.shop_fenxiao_link'),
        'child_list' => [
            [
                'name' => 'SHOP_FENXIAO_INDEX',
                'title' => get_lang('dict_diy.shop_fenxiao_link_index'),
                'url' => '/addon/shop_fenxiao/pages/index',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'SHOP_FENXIAO_ZONE',
                'title' => get_lang('dict_diy.shop_fenxiao_link_zone'),
                'url' => '/addon/shop_fenxiao/pages/zone',
                'is_share' => 1,
                'action' => 'decorate'
            ],
        ]
    ],
];