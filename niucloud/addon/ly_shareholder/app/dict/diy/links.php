<?php

return [
    'LY_SHAREHOLDER_LINK' => [
        'title' => get_lang('dict_diy.ly_shareholder_link'),
        'child_list' => [
            [
                'name' => 'LY_SHAREHOLDER_INDEX',
                'title' => get_lang('dict_diy.ly_shareholder_link_index'),
                'url' => '/addon/ly_shareholder/pages/index',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'LY_SHAREHOLDER_LEVEL',
                'title' => get_lang('dict_diy.ly_shareholder_link_level'),
                'url' => '/addon/ly_shareholder/pages/share_level',
                'is_share' => 1,
                'action' => 'decorate'
            ],
        ]
    ],
];