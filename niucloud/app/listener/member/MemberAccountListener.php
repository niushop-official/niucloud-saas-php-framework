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


namespace app\listener\member;

use app\dict\member\MemberAccountTypeDict;
use app\service\core\member\CoreMemberLevelService;

/**
 * 会员账户变化事件（积分，余额，零钱）
 * Class MemberAccount
 * @package app\listener\member
 */
class MemberAccountListener
{
    /**
     * 接收会员账户变化记录
     * @param array $account_log
     */
    public function handle(array $account_log)
    {
        // 如果是会员成长值变更
        if ($account_log['account_type'] == MemberAccountTypeDict::GROWTH) {
            (new CoreMemberLevelService())->checkLevelUpgrade($account_log['site_id'], $account_log['member_id']);
        }
        return;
    }
}
