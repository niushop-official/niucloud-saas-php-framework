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

namespace app\job\wxoplatform;

use core\base\BaseJob;

/**
 * 公众号授权变更之后
 */
class WechatAuthChangeAfter extends BaseJob
{
    /**
     * 消费
     * @param $site_id
     * @param $event
     * @return true
     */
    protected function doJob($site_id, $event)
    {
        event('WechatAuthChangeAfter', ['site_id' => $site_id, 'event' => $event]);
        return true;
    }
}
