<?php

return [
    'SHORTVIDEO_LINK' => [
        'title' => get_lang('dict_diy.shortvideo_link'),
        'child_list' => [
            [
                'name' => 'shortvideo_video',
                'title' => '短视频功能',
                'url' => '/addon/shortvideo/pages/index',
                'is_share' => 0,
                'action' => ''
            ],[
                'name' => 'shortvideo_list',
                'title' => '瀑布流图文列表',
                'url' => '/addon/shortvideo/pages/list',
                'is_share' => 0,
                'action' => ''
            ]
        ]
    ],
];
