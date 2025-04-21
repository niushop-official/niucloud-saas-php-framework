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

namespace app\listener\system;

use app\service\admin\wxoplatform\WeappVersionService;

/**
 *
 * Class AppInit
 * @package app\listener\system
 */
class WeappAuthChangeAfter
{
    public function handle(array $data)
    {
        // 授权成功
        if ($data['event'] == 'authorized') {
            request()->siteId($data['site_id']);

            $service = new WeappVersionService();
            // 设置隐私协议
            $service->setPrivacySetting();
            // 设置服务器域名
            $service->setDomain();
            // 提交小程序代码
            $service->siteWeappCommit();
        } else if ($data['event'] == 'unauthorized') {
        // 授权取消

        }
    }
}
