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

namespace app\job\member;

use app\service\core\member\CoreMemberService;
use core\base\BaseJob;

/**
 * 队列设置会员会员码
 */
class SetMemberNoJob extends BaseJob
{
    public function doJob($site_id, $member_id)
    {
        CoreMemberService::setMemberNo($site_id, $member_id);
        return true;
    }
}
