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

namespace app\validate\member;

use think\Validate;

/**
 * 会员标签验证
 * Class Member
 * @package app\validate\member
 */
class MemberLevel extends Validate
{


    protected $rule = [
        'level_name' => 'require|max:30',
        'growth' => 'require|integer',
    ];

    protected $message = [
        'level_name.require' => 'validate_member.level_name_require',
        'growth.require' => 'validate_member.level_growth_require',
        'growth.integer' => 'validate_member.level_growth_integer',
    ];

    protected $scene = [
        'add' => ['level_name', 'growth'],
        'edit' => ['level_name', 'growth'],
    ];
}
