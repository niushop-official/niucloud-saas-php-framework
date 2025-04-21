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

namespace addon\shop_fenxiao\app\listener\diy;

/**
 * 主题色
 * Class ThemeColorListener
 * @package addon\shop_fenxiao\app\listener\diy
 */
class ThemeColorListener
{

    public function handle($params)
    {
        if (!empty($params[ 'key' ]) && $params[ 'key' ] == 'shop_fenxiao') {
            return [
                // 应用主题色
                'theme_color' => [
                    [
                        'title' => '热情红',
                        'name' => 'red',
                        'theme' => [
                            '--page-bg-color' => "#F6F6F6",//页面背景色
                            '--price-text-color' => "#FF4142",//价格颜色
                            '--primary-color' => "#FF4142",//主色调
                            '--primary-color-light' => "#FFEAEA",//主色调浅色（淡）
                            '--primary-color-light2' => "#FFF7F7",//主色调深色（深）
                            '--primary-help-color1' => "#FFB000",//辅色调1
                            '--primary-help-color2' => "#FB7939",//辅色调2
                            '--primary-help-color3' => "#F26F3E",//辅色调3
                            '--primary-help-color4' => "#FFB397",//辅色调4
                            '--primary-help-color5' => "#FFA029",//辅色调5
                            '--primary-color-dark' => "#999999",//灰色调
                            '--primary-color-disabled' => "#CCCCCC",//禁用色
                        ],
                    ],
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
                        'title' => '价格颜色',
                        'label' => "--price-text-color",
                        'value' => "#FF4142",
                        'tip' => "价格颜色在uniapp中使用：var(--price-text-color)",
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
                        'title' => '辅色调1',
                        'label' => "--primary-help-color1",
                        'value' => "rgba(51, 51, 51, 1)",
                        'tip' => "辅色调1在uniapp中使用：var(--primary-help-color1)",
                    ],
                    [
                        'title' => '辅色调2',
                        'label' => "--primary-help-color2",
                        'value' => "rgba(51, 51, 51, 1)",
                        'tip' => "辅色调2在uniapp中使用：var(--primary-help-color2)",
                    ],
                    [
                        'title' => '辅色调3',
                        'label' => "--primary-help-color3",
                        'value' => "rgba(51, 51, 51, 1)",
                        'tip' => "辅色调3在uniapp中使用：var(--primary-help-color3)",
                    ],
                    [
                        'title' => '辅色调4',
                        'label' => "--primary-help-color4",
                        'value' => "rgba(51, 51, 51, 1)",
                        'tip' => "辅色调4在uniapp中使用：var(--primary-help-color4)",
                    ],
                    [
                        'title' => '辅色调5',
                        'label' => "--primary-help-color5",
                        'value' => "rgba(51, 51, 51, 1)",
                        'tip' => "辅色调5在uniapp中使用：var(--primary-help-color5)",
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