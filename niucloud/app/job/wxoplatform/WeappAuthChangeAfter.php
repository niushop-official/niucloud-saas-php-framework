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

use app\service\admin\wxoplatform\WeappVersionService;
use app\service\core\pay\CorePayService;
use core\base\BaseJob;
use think\facade\Log;

/**
 * 小程序授权变更之后
 */
class WeappAuthChangeAfter extends BaseJob
{
    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob($site_id, $event)
    {
        event('WeappAuthChangeAfter', ['site_id' => $site_id, 'event' => $event]);
        return true;
    }
}
