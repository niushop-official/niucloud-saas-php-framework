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

namespace addon\shortvideo\app\validate\label;
use core\base\BaseValidate;
/**
 * 话题管理验证器
 * Class Label
 * @package addon\shortvideo\app\validate\label
 */
class Label extends BaseValidate
{

       protected $rule = [
            'name' => 'require',
        ];

       protected $message = [
            'name.require' => ['common_validate.require', ['name']],
        ];

       protected $scene = [
            "add" => ['name', 'status', 'adddate'],
            "edit" => ['name', 'status', 'adddate', 'sort']
        ];

}
