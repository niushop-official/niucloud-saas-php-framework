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

namespace addon\ttcard\app\validate\impression;
use core\base\BaseValidate;
/**
 * 个人印象验证器
 * Class Impression
 * @package addon\ttcard\app\validate\impression
 */
class Impression extends BaseValidate
{

       protected $rule = [
            'name' => 'require'
        ];

       protected $message = [
            'name.require' => ['common_validate.require', ['name']]
        ];

       protected $scene = [
            "add" => ['name'],
            "edit" => ['name']
        ];

}
