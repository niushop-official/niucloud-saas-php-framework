<?php

return [
    'VIPCARD_BASE_LINK' => [
        'title' => get_lang('dict_diy.vipcard_title'),
        'type' => 'folder', // 类型，folder 表示文件夹，link 表示链接
        'child_list' => [
            [
                'name' => 'VIPCARD_LINK',
                'title' => get_lang('dict_diy.vipcard_link'),
                'child_list' => [
                    [
                        'name' => 'VIPCARD_INDEX',
                        'title' => get_lang('dict_diy.vipcard_index'),
                        'url' => '/addon/vipcard/pages/index',
                        'is_share' => 1,
                        'action' => 'decorate'
                    ],
                    [
                        'name' => 'VIPCARD_CARD',
                        'title' => get_lang('dict_diy.vipcard_card'),
                        'url' => '/addon/vipcard/pages/card/list',
                        'is_share' => 1,
                        'action' => ''
                    ],
                    [
                        'name' => 'VIPCARD_SERVICE',
                        'title' => get_lang('dict_diy.vipcard_service'),
                        'url' => '/addon/vipcard/pages/service/list',
                        'is_share' => 1,
                        'action' => ''
                    ],
                    [
                        'name' => 'VIPCARD_VERIFY',
                        'title' => get_lang('dict_diy.vipcard_verify'),
                        'url' => '/addon/vipcard/pages/verify/index',
                        'is_share' => 0,
                        'action' => ''
                    ],
                    [
                        'name' => 'VIPCARD_VERIFY_RECORD',
                        'title' => get_lang('dict_diy.vipcard_verify_record'),
                        'url' => '/addon/vipcard/pages/verify/record',
                        'is_share' => 0,
                        'action' => ''
                    ],
                    [
                        'name' => 'VIPCARD_ORDER_LIST',
                        'title' => get_lang('dict_diy.vipcard_order_list'),
                        'url' => '/addon/vipcard/pages/order/list',
                        'is_share' => 0,
                        'action' => ''
                    ],
                    [
                        'name' => 'VIPCARD_ORDER_MY_RESERVED',
                        'title' => get_lang('dict_diy.vipcard_my_reserved'),
                        'url' => '/addon/vipcard/pages/order/my_reserved',
                        'is_share' => 0,
                        'action' => ''
                    ],
                    [
                        'name' => 'VIPCARD_ORDER_MY_CARD',
                        'title' => get_lang('dict_diy.vipcard_my_card'),
                        'url' => '/addon/vipcard/pages/order/my_card',
                        'is_share' => 0,
                        'action' => ''
                    ]
                ]
            ],
            [
                'name' => 'VIPCARD_SERVICE_SELECT',
                'title' => get_lang('dict_diy.vipcard_service_select'),
                'component' => '/src/addon/vipcard/views/service/select_content.vue',
            ],
            [
                'name' => 'VIPCARD_SELECT',
                'title' => get_lang('dict_diy.vipcard_select'),
                'component' => '/src/addon/vipcard/views/card/select_content.vue',
            ]
        ]
    ]
];
