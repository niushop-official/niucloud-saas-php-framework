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

namespace app\api\controller\member;

use app\dict\member\MemberAccountChangeTypeDict;
use app\dict\member\MemberAccountTypeDict;
use app\service\api\member\MemberAccountService;
use core\base\BaseApiController;
use core\exception\AdminException;
use think\db\exception\DbException;
use think\Response;

/**
 * 会员账户
 * Class Account
 * @package app\api\controller\member
 */
class Account extends BaseApiController
{
    /**
     * 积分流水
     * @return Response
     */
    public function point(): Response
    {
        $data = $this->request->params([
            ['from_type', ''],
            ['amount_type', 'all'],//全部all 收入income 支出disburse
            ['create_time', []],
        ]);
        $data['account_type'] = MemberAccountTypeDict::POINT;
        return success((new MemberAccountService())->getPointPage($data));
    }

    /**
     * 余额流水
     * @return Response
     */
    public function balance(): Response
    {
        $data = $this->request->params([
            ['from_type', '']
        ]);
        $data['account_type'] = MemberAccountTypeDict::BALANCE;
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 余额流水(新)
     * @return Response
     */
    public function balanceList(): Response
    {
        $data = $this->request->params([
            ['from_type', ''],
            ['trade_type', ''],
            ['create_time', []]
        ]);
        return success((new MemberAccountService())->getBalancePage($data));
    }

    /**
     * 零钱流水
     * @return Response
     */
    public function money(): Response
    {
        $data = $this->request->params([
            ['from_type', '']
        ]);
        $data['account_type'] = MemberAccountTypeDict::MONEY;
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 账户记录数量
     * @return Response
     * @throws DbException
     */
    public function count(): Response
    {
        $data = $this->request->params([
            ['from_type', ''],
            ['account_type', '']
        ]);
        return success(data:(new MemberAccountService())->getCount($data));
    }

    /**
     * 佣金流水
     * @return Response
     */
    public function commission(): Response
    {
        $data = $this->request->params([
            ['keyword', ''],
            ['from_type', ''],
            ['account_data_gt', ''],
            ['account_data_lt', ''],
            ['create_time', []],
        ]);
        $data['account_type'] = MemberAccountTypeDict::COMMISSION;
        return success((new MemberAccountService())->getPage($data));
    }

    /**
     * 账户来源
     * @param $account_type
     * @return Response
     */
    public function getFromType($account_type): Response
    {
        if (!array_key_exists($account_type, MemberAccountTypeDict::getType())) throw new AdminException('MEMBER_TYPE_NOT_EXIST');
        return success(MemberAccountChangeTypeDict::getType($account_type));
    }

    public function pointCount()
    {
        return success((new MemberAccountService())->getPointCount());
    }

}
