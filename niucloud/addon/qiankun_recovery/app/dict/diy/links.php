<?php

return [
    'RECOVERY_LINK' => [
        'title' => get_lang('recovery.title'),
        'child_list' => [
            [
                'name' => 'RECOVERY_INDEX',
                'title' => get_lang('recovery.title'),
                'url' => '/addon/qiankun_recovery/pages/index/index',
                'is_share' => 1,
                'action' => 'decorate'
            ],
        ]
    ],
];
