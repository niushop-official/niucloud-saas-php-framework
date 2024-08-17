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

namespace app\service\core\member;

use app\dict\member\MemberAccountChangeTypeDict;
use app\dict\member\MemberAccountTypeDict;
use app\model\member\Member;
use app\model\member\MemberAccountLog;
use core\base\BaseCoreService;
use core\exception\CommonException;
use Exception;
use think\facade\Db;

/**
 * 会员账户流水服务层
 * Class CoreMemberAccountService
 * @package app\service\core\member
 */
class CoreMemberAccountService extends BaseCoreService
{

    public function addLog(int $site_id, int $member_id, string $account_type, $account_data, string $from_type, string $memo, $related_id = 0)
    {
        $member_model = new Member();
        $member_account_log_model = new MemberAccountLog();
        //账户检测
        $member_info = $member_model->where([
            [ 'member_id', '=', $member_id ],
            [ 'site_id', '=', $site_id ]
        ])->field($account_type . ',' . $account_type . "_get" . ', username, mobile, nickname')->lock(true)->find();
        if (empty($member_info)) throw new CommonException('MEMBER_NOT_EXIST');
        $account_new_data = round((float) $member_info[ $account_type ] + (float) $account_data, 2);

        if ($account_new_data < 0) {
            throw new CommonException('ACCOUNT_INSUFFICIENT');
        }

        $data = array(
            'site_id' => $site_id,
            'member_id' => $member_id,
            'account_type' => $account_type,
            'account_data' => $account_data,
            "account_sum" => $account_new_data,
            'from_type' => $from_type,
            'create_time' => time(),
            'nickname' => $member_info[ 'nickname' ],
            'mobile' => $member_info[ 'mobile' ],
            'memo' => $memo,
            'related_id' => $related_id,
        );

        Db::startTrans();
        try {

            $res = $member_account_log_model->create($data);
            //账户更新
            if ($account_data > 0) {
                if ($account_type == MemberAccountTypeDict::GROWTH) {
                    $account_type_get = $member_info[ $account_type . "_get" ] + $account_data;
                } else {
                    $from_type_arr = MemberAccountChangeTypeDict::getType($account_type)[ $from_type ];
                    $is_change_get = $from_type_arr[ 'is_change_get' ] ?? 1;
                    if ($is_change_get) {
                        $account_type_get = $member_info[ $account_type . "_get" ] + $account_data;
                    } else {
                        $account_type_get = $member_info[ $account_type . "_get" ];
                    }
                }
            } else {
                $account_type_get = $member_info[ $account_type . "_get" ];
            }
            $member_model->update([
                $account_type => $account_new_data,
                $account_type . "_get" => $account_type_get
            ], [
                'member_id' => $member_id
            ]);
            //账户变化事件
            $data[] = [
                $account_type => $account_new_data,
                $account_type . "_get" => $account_type_get
            ];
            event("MemberAccount", $data);
            Db::commit();
            return $res->id;
        } catch (Exception $e) {
            Db::rollback();
            throw new CommonException($e->getMessage());
        }
    }

}
