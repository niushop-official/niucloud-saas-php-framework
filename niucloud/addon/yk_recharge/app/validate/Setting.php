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

namespace addon\yk_recharge\app\validate;


use think\Validate;

/**
 * 余额验证
 * Class CmsArticle
 * @package app\validate\article
 */
class Setting extends Validate
{

    //用户名或密码的规范可能是从数据库中获取的
    protected $rule = [
        'amount' => 'require|max:20',
    ];

    protected $message = [
        'amount.require' => 'validate_balance.amount_require',
    ];

    protected $scene = [
        'add' => ['amount'],
        'edit' => ['amount'],
    ];
}
