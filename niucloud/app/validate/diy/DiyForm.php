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

namespace app\validate\diy;

use think\Validate;

/**
 * 万能表单验证器
 * Class DiyForm
 * @package app\validate\diy
 */
class DiyForm extends Validate
{

    protected $rule = [
        'title' => 'require',
        'type' => 'require',
        'value' => 'require',
    ];

    protected $message = [];

    protected $scene = [
        "add" => [ 'title', 'type', 'value' ],
        "edit" => [ 'title', 'value' ],
    ];

}
