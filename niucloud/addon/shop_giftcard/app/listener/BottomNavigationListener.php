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

namespace addon\shop_giftcard\app\listener;

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
        $key = 'shop_giftcard';

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
                            "parent" => "SHOP_GIFTCARD_LINK",
                            "name" => "SHOP_GIFTCARD_INDEX",
                            "title" => get_lang('dict_diy.shop_giftcard_link_index'),
                            'url' => '/addon/shop_giftcard/pages/index',
                        ],
                        "iconPath" => "addon/shop_giftcard/diy/tabbar/giftcard_index.png",
                        "iconSelectPath" => "addon/shop_giftcard/diy/tabbar/giftcard_index_selected.png"
                    ],
                    [
                        "text" => "礼品卡",
                        "link" => [
                            "parent" => "SHOP_GIFTCARD_LINK",
                            "name" => "SHOP_GIFTCARD_LIST",
                            'title' => get_lang('dict_diy.shop_giftcard_link_list'),
                            'url' => '/addon/shop_giftcard/pages/list',
                        ],
                        "iconPath" => "addon/shop_giftcard/diy/tabbar/giftcard_list.png",
                        "iconSelectPath" => "addon/shop_giftcard/diy/tabbar/giftcard_list_selected.png"
                    ],
                    [
                        "text" => "卡包",
                        "link" => [
                            "parent" => "SHOP_GIFTCARD_LINK",
                            "name" => "SHOP_GIFTCARD_MY_CARD_LIST",
                            'title' => get_lang('dict_diy.shop_giftcard_link_my_card_list'),
                            'url' => '/addon/shop_giftcard/pages/my_card_list',
                        ],
                        "iconPath" => "addon/shop_giftcard/diy/tabbar/my_cart_list.png",
                        "iconSelectPath" => "addon/shop_giftcard/diy/tabbar/my_cart_list_selected.png"
                    ],
                    [
                        "text" => "我的",
                        "link" => [
                            "parent" => "SHOP_GIFTCARD_LINK",
                            "name" => "SHOP_GIFTCARD_MEMBER_INDEX",
                            'title' => get_lang('dict_diy.shop_giftcard_link_member_index'),
                            'url' => '/addon/shop_giftcard/pages/member',
                        ],
                        "iconPath" => "addon/shop_giftcard/diy/tabbar/giftcard_my.png",
                        "iconSelectPath" => "addon/shop_giftcard/diy/tabbar/giftcard_my_selected.png"
                    ]
                ]
            ]
        ];
    }
}
