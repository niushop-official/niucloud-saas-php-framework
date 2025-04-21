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

namespace addon\shop\app\listener;

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
        $key = 'shop';

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
                            "parent" => "SHOP_LINK",
                            "name" => "SHOP_INDEX",
                            "title" => get_lang('dict_diy.shop_link_index'),
                            "url" => "/addon/shop/pages/index"
                        ],
                        "iconPath" => "addon/shop/diy/tabbar/system-home.png",
                        "iconSelectPath" => "addon/shop/diy/tabbar/system-home-selected.png"
                    ],
                    [
                        "text" => "商品分类",
                        "link" => [
                            "parent" => "SHOP_LINK",
                            "name" => "SHOP_GOODS_CATEGORY",
                            "title" => "商品分类",
                            "url" => "/addon/shop/pages/goods/category"
                        ],
                        "iconPath" => "addon/shop/diy/tabbar/system-category.png",
                        "iconSelectPath" => "addon/shop/diy/tabbar/system-category-selected.png"
                    ],
                    [
                        "text" => "购物车",
                        "link" => [
                            "parent" => "SHOP_LINK",
                            "name" => "SHOP_GOODS_CART",
                            "title" => "购物车",
                            "url" => "/addon/shop/pages/goods/cart"
                        ],
                        "iconPath" => "addon/shop/diy/tabbar/system-cart.png",
                        "iconSelectPath" => "addon/shop/diy/tabbar/system-cart-selected.png"
                    ],
                    [
                        "text" => "我的",
                        "link" => [
                            "parent" => "SHOP_LINK",
                            "name" => "SHOP_MEMBER_INDEX",
                            "title" => get_lang('dict_diy.member_index'),
                            "url" => "/addon/shop/pages/member/index"
                        ],
                        "iconPath" => "addon/shop/diy/tabbar/system-my.png",
                        "iconSelectPath" => "addon/shop/diy/tabbar/system-my-selected.png"
                    ]
                ]
            ]
        ];
    }
}
