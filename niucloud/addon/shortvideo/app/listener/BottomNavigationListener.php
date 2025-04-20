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

namespace addon\shortvideo\app\listener;

use app\service\core\addon\CoreAddonService;
use app\service\core\site\CoreSiteService;

/**
 * 底部导航
 */
class BottomNavigationListener
{
    /**
     * @param array $params
     * @return array|void
     */
    public function handle($params = [])
    {
        $key = 'shortvideo';

        $site_addon = ( new CoreSiteService() )->getAddonKeysBySiteId(request()->siteId());
        if (!in_array($key, $site_addon)) return;

        if (!empty($params) && !empty($params[ 'key' ]) && $params[ 'key' ] != $key) return;

        $core_addon_service = new CoreAddonService();
        $addon_info = $core_addon_service->getAddonConfig($key);

        return [
            'key' => $key,
            'info' => $addon_info,
            'value' => [
                'backgroundColor' => '#ffffff',
                'textColor' => '#888',
                'textHoverColor' => '#ff2c50',
                'type' => '1',
                'list' => [
                    [
                        "text" => "短视频",
                        "link" => [
                            "parent" => "SHORTVIDEO_LINK",
                            "name" => "SHORTVIDEO_VIDEO",
                            "title" => "短视频",
                            "url" => "/addon/shortvideo/pages/index"
                        ],
                        "iconPath" => "addon/shortvideo/tabbar/index.png",
                        "iconSelectPath" => "addon/shortvideo/tabbar/index2.png"
                    ],
                    [
                        "text" => "逛一逛",
                        "link" => [
                            "parent" => "SHORTVIDEO_LINK",
                            "name" => "SHORTVIDEO_LIST",
                            "title" => "逛一逛",
                            "url" => "/addon/shortvideo/pages/list"
                        ],
                        "iconPath" => "addon/shortvideo/tabbar/list.png",
                        "iconSelectPath" => "addon/shortvideo/tabbar/list2.png"
                    ],
                ]
            ]
        ];
    }
}
