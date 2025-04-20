<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\vipcard\app\listener;

/**
 * 站点首页加载事件
 * Class AppInit
 * @package app\listener\system
 */
class SiteIndexListener
{
    public function handle()
    {
        return [
            [
                "name" => get_lang("dict_site_index.vipcard"),
                "view_path" => "vipcard/site_index"
            ],
        ];
    }
}