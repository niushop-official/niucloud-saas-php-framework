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
        if (!in_array('vipcard', $site_addon)) return;

        return [
            [
                'key' => 'vipcard',
                "title" => get_lang("dict_wap_index.vipcard"),
                'desc' => get_lang("dict_wap_index.vipcard_desc"),
                "url" => "/addon/vipcard/pages/index",
                'icon' => 'addon/vipcard/icon.png'
            ],
        ];
    }
}
