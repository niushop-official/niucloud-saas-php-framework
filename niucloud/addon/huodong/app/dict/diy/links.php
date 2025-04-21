<?php

return [
    'HUODONG_LINK' => [
        'title' => get_lang('dict_diy.huodong_link'),
        'child_list' => [
            [
                'name' => 'HUODONG_INDEX',
                'title' => get_lang('dict_diy.huodong_index'),
                'url' => '/addon/huodong/pages/index/index',
                'is_share' => 1,
                'action' => ''
            ],
            [
                'name' => 'HUODONG_FENXIAO_APPLY',
                'title' => get_lang('dict_diy.fenxiao_apply'),
                'url' => '/addon/huodong/pages/fenxiao/apply',
                'is_share' => 0,
                'action' => ''
            ],[
                'name' => 'HUODONG_FENXIAO_INDEX',
                'title' => '推广主页',
                'url' => '/addon/huodong/pages/fenxiao/index',
                'is_share' => 0,
                'action' => ''
            ],
            [
                'name' => 'HUODONG_ORDER',
                'title' => get_lang('dict_diy.huodong_order'),
                'url' => '/addon/huodong/pages/order/list',
                'is_share' => 0,
                'action' => ''
            ],
            [
                'name' => 'HUODONG_RANK',
                'title' => get_lang('dict_diy.huodong_rank'),
                'url' => '/addon/huodong/pages/index/rank',
                'is_share' => 0,
                'action' => ''
            ]
        ]
    ],
];
