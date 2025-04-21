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

namespace addon\shop_fenxiao\app\validate\agent;

use core\base\BaseValidate;

/**
 * 代理商等级验证器
 */
class Agent extends BaseValidate
{

    protected $rule = [
        'member_id' => 'require|gt:0',
        'agent_level' => 'require|gt:0',
    ];

    protected $message = [
        'member_id.require' => 'shop_fenxiao_agent_validate.agent_member_require',
        'agent_level.require' => 'shop_fenxiao_agent_validate.agent_level_require',
        'member_id.gt' => 'shop_fenxiao_agent_validate.agent_member_require',
        'agent_level.gt' => 'shop_fenxiao_agent_validate.agent_level_require',
    ];

    protected $scene = [
        'add' => [ 'member_id', 'agent_level' ],
        'edit' => [ 'agent_level' ],
    ];

}
