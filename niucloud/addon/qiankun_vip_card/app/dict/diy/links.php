<?php

return [
    'QIANKUN_VIP_CARD_LINK' => [
        'title'      => get_lang('dict_diy.qiankun_vip_card_link'),
        'child_list' => [
            [
                'name'     => 'QIANKUN_VIP_CARD',
                'title'    => get_lang('dict_diy.qiankun_vip_card_link'),
                'url'      => '/addon/qiankun_vip_card/pages/index/index',
                'is_share' => 1,
                'action'   => '',
            ],
            [
                'name'     => 'QIANKUN_VIP_CARD_EXCHANGE',
                'title'    => get_lang('dict_diy.qiankun_vip_card_exchange'),
                'url'      => '/addon/qiankun_vip_card/pages/exchange/exchange',
                'is_share' => 1,
                'action'   => '',
            ],
        ],
    ],
];