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

namespace addon\vipcard\app\listener;

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
        $key = 'vipcard';

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
                            "parent" => "VIPCARD_LINK",
                            "name" => "VIPCARD_INDEX",
                            "title" => get_lang('dict_diy.vipcard_index'),
                            "url" => "/addon/vipcard/pages/index"
                        ],
                        "iconPath" => "addon/shop/diy/tabbar/system-home.png",
                        "iconSelectPath" => "addon/shop/diy/tabbar/system-home-selected.png"
                    ],
                    [
                        "text" => "卡项",
                        "link" => [
                            "parent" => "VIPCARD_LINK",
                            "name" => "VIPCARD_CARD",
                            "title" => "卡项",
                            "url" => "/addon/vipcard/pages/card/list"
                        ],
                        "iconPath" => "addon/vipcard/vipcard/tabbar/system-category.png",
                        "iconSelectPath" => "addon/vipcard/vipcard/tabbar/system-category-selected.png"
                    ],
                    [
                        "text" => "项目",
                        "link" => [
                            "parent" => "VIPCARD_LINK",
                            "name" => "VIPCARD_SERVICE",
                            "title" => "项目",
                            "url" => "/addon/vipcard/pages/service/list"
                        ],
                        "iconPath" => "addon/vipcard/vipcard/tabbar/system-service-list.png",
                        "iconSelectPath" => "addon/vipcard/vipcard/tabbar/system-service-list-selected.png"
                    ],
                    [
                        "text" => "我的",
                        "link" => [
                            "parent" => "MEMBER_LINK",
                            "name" => "MEMBER_CENTER",
                            "title" => get_lang('dict_diy.member_index'),
                            "url" => "/app/pages/member/index"
                        ],
                        "iconPath" => "addon/shop/diy/tabbar/system-my.png",
                        "iconSelectPath" => "addon/shop/diy/tabbar/system-my-selected.png"
                    ]
                ]
            ]
        ];
    }
}
