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
 * 队列会员礼包发放任务
 */
class MemberGiftGrantJob extends BaseJob
{
    public function doJob($site_id, $member_id, $gift, $param = [])
    {
        (new CoreMemberService())->memberGiftGrant($site_id, $member_id, $gift, $param);
        return true;
    }

    public function failed($data)
    {

    }
}
