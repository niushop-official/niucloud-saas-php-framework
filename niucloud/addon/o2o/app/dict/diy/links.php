<?php

return [
    'O2O_BASE_LINK' => [
        'title' => get_lang('dict_diy.o2o_link'),
        'type' => 'folder', // 类型，folder 表示文件夹，link 表示链接
        'child_list' => [
            [
                'name' => 'O2O_LINK',
                'title' => get_lang('dict_diy.o2o_title'),
                'child_list' => [
                    [
                        'name' => 'O2O_INDEX',
                        'title' => get_lang('dict_diy.o2o_index'),
                        'url' => '/addon/o2o/pages/index',
                        'is_share' => 1,
                        'action' => 'decorate'
                    ],
                    [
                        'name' => 'O2O_CATEGORY',
                        'title' => get_lang('dict_diy.o2o_category'),
                        'url' => '/addon/o2o/pages/goods/category',
                        'is_share' => 1,
                        'action' => ''
                    ],
                    [
                        'name' => 'O2O_GOODS_LIST',
                        'title' => get_lang('dict_diy.o2o_link_goods_list'),
                        'url' => '/addon/o2o/pages/goods/list',
                        'is_share' => 1,
                        'action' => ''
                    ],
                    [
                        'name' => 'O2O_MEMBER_INDEX',
                        'title' => get_lang('dict_diy.o2o_link_member_index'),
                        'url' => '/addon/o2o/pages/member/index',
                        'is_share' => 1,
                        'action' => 'decorate'
                    ],
                    [
                        'name' => 'O2O_ORDER_LIST',
                        'title' => get_lang('dict_diy.o2o_link_order_list'),
                        'url' => '/addon/o2o/pages/order/list',
                        'is_share' => 0,
                        'action' => ''
                    ],
                    [
                        'name' => 'O2O_REFUND_LIST',
                        'title' => get_lang('dict_diy.o2o_link_order_refund_list'),
                        'url' => '/addon/o2o/pages/refund/list',
                        'is_share' => 0,
                        'action' => ''
                    ],
                    [
                        'name' => 'O2O_TECHNICIAN_LIST',
                        'title' => get_lang('dict_diy.o2o_link_technician_list'),
                        'url' => '/addon/o2o/pages/technician/list',
                        'is_share' => 1,
                        'action' => ''
                    ],
                    [
                        'name' => 'O2O_ADDRESS_LIST',
                        'title' => get_lang('dict_diy.o2o_link_address_list'),
                        'url' => '/addon/o2o/pages/address/index',
                        'is_share' => 0,
                        'action' => ''
                    ],
                    [
                        'name' => 'O2O_LINK_MASTER_STAT_INDEX',
                        'title' => get_lang('dict_diy.o2o_link_master_stat_index'),
                        'url' => '/addon/o2o/pages/master/statistics/index',
                        'is_share' => 1,
                        'action' => ''
                    ],
                ]
            ],
            [
                'name' => 'O2O_GOODS_SELECT',
                'title' => get_lang('dict_diy.o2o_goods_select'),
                'component' => '/src/addon/o2o/views/goods/components/goods-select-content.vue'
            ],
            [
                'name' => 'O2O_GOODS_CATEGORY_SELECT',
                'title' => get_lang('dict_diy.o2o_goods_category_select'),
                'component' => '/src/addon/o2o/views/goods/components/category-select-content.vue'
            ],
            [
                'name' => 'O2O_TECHNICIAN_SELECT',
                'title' => get_lang('dict_diy.o2o_technician_select'),
                'component' => '/src/addon/o2o/views/technician/components/technician-select-content.vue'
            ],

        ]
    ],
];
