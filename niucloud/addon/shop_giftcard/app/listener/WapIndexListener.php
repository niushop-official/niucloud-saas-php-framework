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

use app\service\core\site\CoreSiteService;

/**
 * 手机端首页加载事件
 */
class WapIndexListener
{
    public function handle($params = [])
    {
        $site_id = request()->siteId();
        if (!empty($params[ 'site_id' ])) {
            $site_id = $params[ 'site_id' ];
        }
        $site_addon = ( new CoreSiteService() )->getAddonKeysBySiteId($site_id);
        if (!in_array('shop_giftcard', $site_addon)) return;

        return [
            [
                'key' => 'shop_giftcard',
                "title" => get_lang("dict_wap_index.shop_giftcard"),
                'desc' => get_lang("dict_wap_index.shop_giftcard_desc"),
                "url" => "/addon/shop_giftcard/pages/index",
                'icon' => 'addon/shop_giftcard/icon.png'
            ],
        ];
    }
}
