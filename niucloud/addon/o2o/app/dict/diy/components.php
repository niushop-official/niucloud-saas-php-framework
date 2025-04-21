<?php

return [
    'O2O_COMPONENT' => [
        'title' => get_lang('dict_diy.o2o_component_type_basic'),
        'list' => [
            'O2oGoodsList' => [
                'title' => '项目列表',
                'icon' => 'iconfont iconzuoyoutuwenpc',
                'path' => 'edit-o2o-goods-list',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10011,
                'value' => [
                    'style' => 'style1',
                    'source' => 'all',
                    "num" => 10,
                    "goods_category" => "",
                    "goods_ids" => [],
                    "title_is_show" => true,
                    "title_font_size" => 16,
                    "title_text_color" => "#303133",
                    "title_font_weight" => "bold",
                    "sub_title_color" => "#927354",
                    "sub_title_text" => "专业服务 省心又省钱",
                    "sub_title_font_size" => 12,
                    "more_is_show" => true,
                    "more_font_size" => 12,
                    "more_color" => "#666666",
                    "more_text" => "更多",
                    "more_link" => [
                        "name" => ''
                    ],
                    "title_text" => "推荐服务"
                ],
            ],
            'O2oTechnician' => [
                'title' => '技师中心',
                'icon' => 'iconfont iconjishizhongxinpc',
                'path' => 'edit-o2o-technician',
                'support_page' => [],
                'uses' => 0,
                'sort' => 10011,
                'value' => [
                    'imageHeight' => '50',
                    'imageUrl' => '',
                ],
            ],
            'O2oSearch' => [
                'title' => '搜索',
                'icon' => 'iconfont iconsousuopc-1',
                'path' => 'edit-o2o-search',
                'support_page' => [],
                'uses' => 1,
                'sort' => 10012,
                'value' => [
                    "style" => "style1",
                    "border_radius" => "搜索",
                    "bg_color" => "#ffffff",
                    "text_color" => "#999999",
                    "search_text" => "请输入项目名称",
                    "icon" => "",
                    "imageUrl" => ""
                ],
            ],
            'O2oMemberInfo' => [
                'title' => '会员信息',
                'icon' => 'iconfont iconhuiyuanqiandaopc',
                'path' => 'edit-o2o-member-info',
                'support_page' => [ 'DIY_O2O_MEMBER_INDEX' ],
                'uses' => 1,
                'sort' => 10013,
                'value' => [
                    "style" => "style-1",
                    "styleName" => "风格1",
                    'bgUrl' => '',
                    'bgColorStart' => '',
                    'bgColorEnd' => ''
                ],
            ],
            'O2oOrderInfo' => [
                'title' => '订单中心',
                'icon' => 'iconfont icondingdanzhongxinPC-1',
                'path' => 'edit-o2o-order-info',
                'support_page' => [ 'DIY_O2O_MEMBER_INDEX' ],
                'uses' => 1,
                'sort' => 10014,
                'value' => [
                    "textColor" => "#303133",
                    "fontSize" => 16,
                    "fontWeight" => "normal",
                    "text" => "订单中心",
                    "more" => [
                        "text" => "全部订单",
                        "color" => "#999999",
                    ],
                    "item" => [
                        "fontSize" => 12,
                        "fontWeight" => "normal",
                        "color" => "#303133"
                    ],
                ]
            ],
        ],
    ],

];