<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\huodong\app\validate\fxbill;
use core\base\BaseValidate;
/**
 * 活动佣金明细验证器
 * Class Fxbill
 * @package addon\huodong\app\validate\fxbill
 */
class Fxbill extends BaseValidate
{

       protected $rule = [
            'member_id' => 'require',
            'account_type' => 'require',
            'account_data' => 'require',
            'account_sum' => 'require',
            'from_type' => 'require',
            'related_id' => 'require',
            'memo' => 'require',
        ];

       protected $message = [
            'member_id.require' => ['common_validate.require', ['member_id']],
            'account_type.require' => ['common_validate.require', ['account_type']],
            'account_data.require' => ['common_validate.require', ['account_data']],
            'account_sum.require' => ['common_validate.require', ['account_sum']],
            'from_type.require' => ['common_validate.require', ['from_type']],
            'related_id.require' => ['common_validate.require', ['related_id']],
            'memo.require' => ['common_validate.require', ['memo']],
        ];

       protected $scene = [
            "add" => ['member_id', 'account_type', 'account_data', 'account_sum', 'from_type', 'related_id', 'memo', 'from_member_id', 'fxlevel', 'status'],
            "edit" => ['member_id', 'account_type', 'account_data', 'account_sum', 'from_type', 'related_id', 'memo', 'from_member_id', 'fxlevel', 'status']
        ];

}
