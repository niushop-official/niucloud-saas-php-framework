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

namespace addon\o2o\app\listener;

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
        $key = 'o2o';
        $site_addon = ( new CoreSiteService() )->getAddonKeysBySiteId(request()->siteId());
        if (!in_array($key, $site_addon)) return;

        if (!empty($params) && !empty($params[ 'key' ]) && $params[ 'key' ] != $key) return;

        $core_addon_service = new CoreAddonService();
        $addon_info = $core_addon_service->getAddonConfig($key);

        return [
            'key' => $key,
            'info' => $addon_info,
            'value' => [
                "backgroundColor" => "#ffffff",
                "textColor" => "#606266",
                "textHoverColor" => "#FA6400",
                "type" => "1",
                "list" => [
                    [
                        "text" => "首页",
                        "link" => [
                            "parent" => "O2O_LINK",
                            "name" => "O2O_INDEX",
                            "title" => "上门服务首页",
                            "url" => "/addon/o2o/pages/index",
                            "action" => "decorate"
                        ],
                        "iconPath" => "addon/o2o/tabbar/index.png",
                        "iconSelectPath" => "addon/o2o/tabbar/index_selected.png"
                    ],
                    [
                        "text" => "项目",
                        "link" => [
                            "parent" => "O2O_LINK",
                            "name" => "O2O_CATEGORY",
                            "title" => "项目",
                            "url" => "/addon/o2o/pages/goods/category",
                            "action" => ""
                        ],
                        "iconPath" => "addon/o2o/tabbar/category.png",
                        "iconSelectPath" => "addon/o2o/tabbar/category_selected.png"
                    ],
                    [
                        "text" => "技师",
                        "link" => [
                            "parent" => "O2O_LINK",
                            "name" => "O2O_TECHNICIAN_LIST",
                            "title" => "技师列表",
                            "url" => "/addon/o2o/pages/technician/list",
                            "action" => ""
                        ],
                        "iconPath" => "addon/o2o/tabbar/technician.png",
                        "iconSelectPath" => "addon/o2o/tabbar/technician_selected.png"
                    ],

                    [
                        "text" => "我的",
                        "link" => [
                            "parent" => "O2O_LINK",
                            "name" => "O2O_MEMBER_INDEX",
                            "title" => "上门服务个人中心",
                            "url" => "/addon/o2o/pages/member/index",
                            "action" => "decorate"
                        ],
                        "iconPath" => "addon/o2o/tabbar/member.png",
                        "iconSelectPath" => "addon/o2o/tabbar/member_selected.png"
                    ]
                ]
            ]
        ];
    }
}
