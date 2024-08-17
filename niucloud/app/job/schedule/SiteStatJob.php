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

namespace app\job\schedule;

use core\base\BaseJob;
use think\facade\Log;

/**
 * 统计
 */
class SiteStatJob extends BaseJob
{
    public function doJob()
    {
//        event('Stat');
//        Log::write('站点统计' . date('Y-m-d h:i:s'));
        return true;
    }
}
