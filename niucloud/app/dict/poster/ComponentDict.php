<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\dict\poster;

use core\dict\DictLoader;

/**
 * 基础组件+业务组件
 * Class ComponentDict
 * @package app\dict\poster
 */
class ComponentDict
{

    public static function getComponent()
    {
        $system_components = [
            'basic' => [
                'title' => get_lang('dict_diy_poster.component_type_basic'),
                'support' => [], // 支持的插件
                'list' => [
                    'Text' => [
                        'title' => "文本", // 组件名称
                        'type' => 'text', // 组件类型，文本：text，image：图片，qrcode：二维码
                        'icon' => "iconfont iconbiaoti", // 组件图标
                        'path' => "text", // 组件预览，前缀 edit-，编辑组件属性，前缀 preview-
                        'uses' => 0,
                        'sort' => 10000,
                        'relate' => '', // 关联字段，空为不处理// 组件属性
                        'value' => '文本内容',
                        'template' => [
                            "width" => 165, // 宽度
                            'height' => 53 // 高度
                        ]
                    ],
                    'Image' => [
                        'title' => "图片",
                        'type' => 'image',
                        'icon' => "iconfont icontupian1",
                        'path' => "image",
                        'uses' => 0,
                        'sort' => 10001,
                        'relate' => '', // 关联字段，空为不处理
                        'value' => '',
                    ],
                    'Qrcode' => [
                        'title' => "二维码",
                        'type' => 'qrcode',
                        'icon' => "iconfont iconerweima",
                        'path' => "qrcode",
                        'uses' => 1,
                        'sort' => 10002,
                        'relate' => 'url', // 关联字段，空为不处理
                        'value' => '',
                    ],
                    'HeadImg' => [
                        'title' => "头像",
                        'type' => 'image',
                        'icon' => "iconfont icongeren",
                        'path' => "headimg",
                        'uses' => 1,
                        'sort' => 10003,
                        'relate' => 'headimg', // 关联字段，空为不处理
                        'value' => '',
                        'template' => [
                            "width" => 100, // 宽度
                            'height' => 100, // 高度
                            'minWidth' => 60, // 最小宽度
                            'minHeight' => 60, // 最小高度
                            'shape' => 'circle'
                        ],
                    ],
                    'NickName' => [
                        'title' => "昵称",
                        'type' => 'text',
                        'icon' => "iconfont iconnicheng1",
                        'path' => "nickname",
                        'uses' => 1,
                        'sort' => 10004,
                        'relate' => 'nickname', // 关联字段，空为不处理
                        'value' => '',
                        'template' => [
                            "width" => 164, // 宽度
                            'height' => 55, // 高度
                            'minWidth' => 120, // 最小宽度
                            'minHeight' => 50, // 最小高度
                        ],
                    ],
                    'Draw' => [
                        'title' => "绘画",
                        'type' => 'draw',
                        'icon' => "iconfont iconhuihua1",
                        'path' => "draw",
                        'uses' => 0,
                        'sort' => 10005,
                        'relate' => '', // 关联字段，空为不处理
                        'value' => '',
                        'template' => [
                            "width" => 200, // 宽度
                            'height' => 200, // 高度
                            'minWidth' => 60, // 最小宽度
                            'minHeight' => 60, // 最小高度
                            'drawType' => 'Polygon',
                            'bgColor' => '#eeeeee',
                            'points' => [], // [x,y]：左上，右上，右下，左下
                        ],
                    ],
                    'FriendsPayMessage' => [
                        'title' => "帮付留言",
                        'type' => 'text',
                        'icon' => "nc-iconfont nc-icon-daifuliuyanV6xx",
                        'path' => "friendspay-message",
                        'uses' => 1,
                        'sort' => 10006,
                        'relate' => 'friendspay_message', // 关联字段，空为不处理
                        'value' => get_lang('dict_pay_config.pay_leave_message'),
                        'template' => [
                            "width" => 611,
                            "height" => 85,
                            "minWidth" => 120,
                            "minHeight" => 44,
                        ]
                    ],
                    'FriendsPayMoney' => [
                        'title' => "帮付金额",
                        'type' => 'text',
                        'icon' => "nc-iconfont nc-icon-daifujineV6xx",
                        'path' => "friendspay-money",
                        'uses' => 1,
                        'sort' => 10007,
                        'relate' => 'friendspay_money', // 关联字段，空为不处理
                        'value' => '帮付金额',
                        'template' => [
                            "width" => 436,
                            "height" => 50,
                            "minWidth" => 120,
                            "minHeight" => 44,
                        ]
                    ],
                ],
            ],
        ];

        return ( new DictLoader("Poster") )->loadComponents($system_components);
    }

}
