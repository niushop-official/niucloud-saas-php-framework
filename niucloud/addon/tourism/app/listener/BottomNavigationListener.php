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

namespace addon\tourism\app\listener;

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
        $key = 'tourism';
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
                'textColor' => '#333333',
                'textHoverColor' => '#FF4500',
                'type' => '1',
                'list' => [
                    [
                        "text" => "首页",
                        "link" => [
                            "parent" => "TOURISM_LINK",
                            "name" => "TOURISM_INDEX",
                            "title" => get_lang('dict_diy.tourism_index'),
                            "url" => "/addon/tourism/pages/index"
                        ],
                        "iconPath" => "addon/tourism/tourism/tabbar/system-home.png",
                        "iconSelectPath" => "addon/tourism/tourism/tabbar/system-home-selected.png"
                    ],
                    [
                        "text" => "我的",
                        "link" => [
                            "parent" => "MEMBER_LINK",
                            "name" => "MEMBER_CENTER",
                            "title" => get_lang('dict_diy.member_index'),
                            "url" => "/app/pages/member/index"
                        ],
                        "iconPath" => "addon/tourism/tourism/tabbar/system-my.png",
                        "iconSelectPath" => "addon/tourism/tourism/tabbar/system-my-selected.png"
                    ]
                ]
            ]
        ];
    }
}
