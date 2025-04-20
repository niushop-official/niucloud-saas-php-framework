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

namespace app\listener\transfer;

use app\dict\pay\TransferDict;
use app\service\core\site\CoreSiteAccountService;

/**
 * 微信支付转账场景监听器
 */
class TransferCashOutListener
{
    public function handle($data = [])
    {
        //账单记录添加
//        (new CoreSiteAccountService())->addPayLog($pay_info);
        return [
            'member_cash_out' => [
                'name' => '佣金提现',
                'scene' => TransferDict::YJBC,
                'perception' => '劳务报酬',
                'infos' => [
                    '岗位类型' => '业务顾问',
                    '报酬说明' => '佣金提现'
                ]
            ]
        ];
    }
}