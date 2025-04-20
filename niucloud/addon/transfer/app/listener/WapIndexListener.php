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

namespace addon\transfer\app\listener;

use app\service\core\site\CoreSiteService;

/**
 * 手机端首页加载事件
 */
class WapIndexListener
{
    public function handle()
    {
        $site_addon = (new CoreSiteService())->getAddonKeysBySiteId(request()->siteId());
        if (!in_array('transfer', $site_addon)) return;
        return [
            [
                'key' => 'transfer',
                "title" => get_lang("dict_wap_index.transfer"),
                'desc' => get_lang("dict_wap_index.transfer_desc"),
                "url" => "/addon/transfer/pages/index/index",
                'icon'=>'addon/transfer/icon.png'
            ],
        ];
    }
}
