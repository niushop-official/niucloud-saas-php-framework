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

namespace addon\huodong\app\listener;

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
        $key = 'huodong';

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
                'textHoverColor' => '#1677ff',
                'type' => '1',
                'list' => [
                    [
                        "text" => "活动报名",
                        "link" => [
                            "parent" => "HUODONG_LINK",
                            "name" => "HUODONG_BAOMING",
                            "title" => "活动报名",
                            "url" => "/addon/huodong/pages/index/index"
                        ],
                        "iconPath" => "addon/huodong/tabbar/index.png",
                        "iconSelectPath" => "addon/huodong/tabbar/index2.png"
                    ],
                    [
                        "text" => "报名记录",
                        "link" => [
                            "parent" => "HUODONG_LINK",
                            "name" => "HUODONG_ORDER",
                            "title" => "报名记录",
                            "url" => "/addon/huodong/pages/order/list"
                        ],
                        "iconPath" => "addon/huodong/tabbar/order.png",
                        "iconSelectPath" => "addon/huodong/tabbar/order2.png"
                    ],
                    [
                        "text" => "排行榜",
                        "link" => [
                            "parent" => "HUODONG_LINK",
                            "name" => "HUODONG_RANK",
                            "title" => "排行榜",
                            "url" => "/addon/huodong/pages/index/rank"
                        ],
                        "iconPath" => "addon/huodong/tabbar/rank.png",
                        "iconSelectPath" => "addon/huodong/tabbar/rank2.png"
                    ],
                ]
            ]
        ];
    }
}
