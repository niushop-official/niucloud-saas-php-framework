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

namespace app\service\core\diy;

use app\dict\sys\ConfigKeyDict;
use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;
use think\Model;

/**
 * 自定义页面服务层
 * Class CoreDiyService
 * @package app\service\core\diy
 */
class CoreDiyService extends BaseCoreService
{
    /**
     * 获取系统默认主题配色
     * @return array
     */
    public function getDefaultColor()
    {
        return [
            'title' => '商务蓝',
            'name' => 'blue',
            'theme' => [
                '--primary-color' => '#007aff', // 主色
                '--primary-help-color' => '#007aff', // 辅色
                '--price-text-color' => '#FF4142',// 价格颜色
                '--primary-color-dark' => '#398ade', // 灰色
                '--primary-color-disabled' => '#9acafc', // 禁用色
                '--primary-color-light' => '#ecf5ff', // 边框色（深）
                '--primary-color-light2' => '#fff7f7', // 边框色（淡）
                '--page-bg-color' => '#f6f6f6', // 页面背景色
            ],
        ];
    }

    /**
     * 获取默认主题配色
     * @return array
     */
    public function getDefaultThemeColor()
    {
        return [
            [
                'title' => '商务蓝',
                'name' => 'blue',
                'theme' => [
                    '--primary-color' => '#007aff', // 主色
                    '--primary-help-color' => '#007aff', // 辅色
                    '--price-text-color' => '#FF4142',// 价格颜色
                    '--primary-color-dark' => '#398ade', // 灰色
                    '--primary-color-disabled' => '#9acafc', // 禁用色
                    '--primary-color-light' => '#ecf5ff', // 边框色（深）
                    '--primary-color-light2' => '#fff7f7', // 边框色（淡）
                    '--page-bg-color' => '#f6f6f6', // 页面背景色
                ],
            ],
            [
                'title' => '热情红',
                'name' => 'red',
                'theme' => [
                    '--primary-color' => '#FF4142', // 主色
                    '--primary-help-color' => '#FB7939', // 辅色
                    '--price-text-color' => '#FF4142',// 价格颜色
                    '--primary-color-dark' => '#F26F3E', // 灰色
                    '--primary-color-disabled' => '#FFB397', // 禁用色
                    '--primary-color-light' => '#FFEAEA', // 边框色（深）
                    '--primary-color-light2' => '#fff7f7', // 边框色（淡）
                    '--page-bg-color' => '#f6f6f6', // 页面背景色
                ],
            ],
            [
                'title' => '活力橙',
                'name' => 'orange',
                'theme' => [
                    '--primary-color' => '#FA6400', // 主色
                    '--primary-help-color' => '#FA6400', // 辅色
                    '--price-text-color' => '#FF2525',// 价格颜色
                    '--primary-color-dark' => '#F48032', // 灰色
                    '--primary-color-disabled' => '#FFC29A', // 禁用色
                    '--primary-color-light' => '#FFF4ED', // 边框色（深）
                    '--primary-color-light2' => '#FFF4ED', // 边框色（淡）
                    '--page-bg-color' => '#f6f6f6', // 页面背景色
                ],
            ]
        ];
    }
}
