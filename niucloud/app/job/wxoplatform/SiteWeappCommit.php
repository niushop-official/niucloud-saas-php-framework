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
use core\base\BaseJob;

/**
 * 小程序代码上传
 */
class SiteWeappCommit extends BaseJob
{
    /**
     * 消费
     * @param $site_id
     * @param $site_group_id
     * @return true
     */
    protected function doJob($site_id, $site_group_id)
    {
        WeappVersionService::weappCommit($site_id, $site_group_id);
        return true;
    }
}
