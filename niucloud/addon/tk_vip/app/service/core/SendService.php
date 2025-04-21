<?php
// +----------------------------------------------------------------------
// | Author: TK
// +----------------------------------------------------------------------

namespace addon\tk_vip\app\service\core;

use app\dict\member\MemberAccountTypeDict;
use app\service\core\member\CoreMemberAccountService;
use core\base\BaseApiService;


/**
 * 进行激励发放方法封装
 */
class SendService extends BaseApiService
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @Notes:等级及签到奖励佣金
     * @Interface sendCommission
     * @param $site_id
     * @param $member_id
     * @param $commission
     * @author: TK
     * @Time: 2024/10/25   下午2:50
     */
    public function sendCommission($site_id,$member_id,$commission)
    {
        (new CoreMemberAccountService())->addLog($site_id, $member_id, MemberAccountTypeDict::COMMISSION, $commission, 'tk_vip_send_commission', '奖励权益可提现佣金');
    }

}
