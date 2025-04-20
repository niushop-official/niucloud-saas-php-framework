<?php

return [
    'TK_VIP' => [
        'title' => '会员权益',
        'list' => [
            'TkVipLevel' => [
                'title' => '会员权益',
                'icon' => 'nc-iconfont nc-icon-qianbaoyueV6xx',
                'path' => 'edit-vip-level',
                'support_page' => [],
                'uses' => 1,
                'sort' => 10009,
                'value' => [
                    "style" => "style-1",
                    "styleName" => "风格1"
                ],
            ],
            'TkVipReal' => [
                'title' => '实名验证',
                'icon' => 'nc-iconfont nc-icon-yinhangkaV6xx',
                'path' => 'edit-vip-real',
                'support_page' => [],
                'uses' => 1,
                'sort' => 10009,
                'value' => [
                    "style" => "style-1",
                    "styleName" => "风格1"
                ],
            ],
            'TkVipManage' => [
                'title' => '手机管理',
                'icon' => 'nc-iconfont nc-icon-shezhiV6xx-2',
                'path' => 'edit-manage', // 编辑组件属性名称
                'support_page' => [], // 支持页面
                'uses' => 1, // 最大添加数量
                'sort' => 10001,
                'value' => [
                    "imageUrl" => '',
                    "imageHeight" => '200',
                    "imageRadius"=>'12',
                    "padding"=>'10'
                ]
            ],
        ],
    ],

];

