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
 * 小程序提交审核
 */
class SubmitAudit extends BaseJob
{
    /**
     * 消费
     * @param $data
     * @return true
     */
    protected function doJob($site_id, $id)
    {
        WeappVersionService::submitCommit($site_id, $id);
        return true;
    }
}
