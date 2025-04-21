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
 * 代理商验证器
 */
class AgentLevel extends BaseValidate
{

    protected $rule = [
        'name' => 'require',
        'money' => 'require|gt:0',
        'discount' => 'require|between:0,10',
    ];

    protected $message = [
        'name.require' => 'shop_fenxiao_agent_validate.agent_level_name_require',
        'money.require' => 'shop_fenxiao_agent_validate.agent_level_money_require',
        'discount.require' => 'shop_fenxiao_agent_validate.agent_level_discount_require',
        'money.gt' => 'shop_fenxiao_agent_validate.agent_level_money_require',
        'discount.between' => 'shop_fenxiao_agent_validate.agent_level_discount_require',
    ];

    protected $scene = [
        'add' => [ 'name', 'money', 'discount' ],
        'edit' => [ 'name', 'money', 'discount' ],
    ];

}
