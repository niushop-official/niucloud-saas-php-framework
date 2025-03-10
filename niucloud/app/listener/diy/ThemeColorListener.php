<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace app\listener\diy;

/**
 * 主题色
 * Class ThemeColorListener
 * @package addon\shop\app\listener\diy
 */
class ThemeColorListener
{

    public function handle($params)
    {
        if (!empty($params[ 'key' ]) && $params[ 'key' ] == 'app') {
            return [
                // 系统主题色
                'theme_color' => [
                    [
                        'title' => '商务蓝',
                        'name' => 'blue',
                        'theme' => [
                            '--page-bg-color' => "#F6F6F6",//页面背景色
                            '--primary-color' => "#007aff",//主色调
                            '--primary-color-light' => "#ecf5ff",//主色调浅色（淡）
                            '--primary-color-light2' => "#FFF4ED",//主色调深色（深）
                            '--primary-help-color2' => "#007aff",//辅色调
                            '--primary-color-dark' => "#999999",//灰色调
                            '--primary-color-disabled' => "#CCCCCC",//禁用色
                        ]
                    ]
                ],
                // 主题颜色字段，前端展示用，字段中的value值颜色为添加自定义颜色的默认值，默认黑色风格
                'theme_field' => [
                    [
                        'title' => '页面背景色',
                        'label' => "--page-bg-color",
                        'value' => "#F6F6F6",
                        'tip' => "页面背景色在uniapp中使用：var(--page-bg-color)",
                    ],
                    [
                        'title' => '主色调',
                        'label' => "--primary-color",
                        'value' => "rgba(51, 51, 51, 1)",
                        'tip' => "主色调在uniapp中使用：var(--primary-color)",
                    ],
                    [
                        'title' => '主色调浅色（淡）',
                        'label' => "--primary-color-light",
                        'value' => "rgba(51, 51, 51, 0.1)",
                        'tip' => "主色调浅色（淡）在uniapp中使用：var(--primary-color-light)",
                    ],
                    [
                        'title' => '主色调深色（深）',
                        'label' => "--primary-color-light2",
                        'value' => "rgba(51, 51, 51, 0.8)",
                        'tip' => "主色调深色（深）在uniapp中使用：var(--primary-color-light2)",
                    ],
                    [
                        'title' => '辅色调',
                        'label' => "--primary-help-color2",
                        'value' => "rgba(51, 51, 51, 1)",
                        'tip' => "辅色调在uniapp中使用：var(--primary-help-color2)",
                    ],
                    [
                        'title' => '灰色调',
                        'label' => "--primary-color-dark",
                        'value' => "#999999",
                        'tip' => "灰色调在uniapp中使用：var(--primary-color-dark)",
                    ],
                    [
                        'title' => '禁用色',
                        'label' => "--primary-color-disabled",
                        'value' => "#CCCCCC",
                        'tip' => "禁用色在uniapp中使用：var(--primary-color-disabled)",
                    ],
                ]
            ];
        }
    }
}