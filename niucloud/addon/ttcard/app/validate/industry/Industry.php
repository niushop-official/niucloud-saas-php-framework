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

namespace addon\ttcard\app\validate\industry;
use core\base\BaseValidate;
/**
 * 行业管理验证器
 * Class Industry
 * @package addon\ttcard\app\validate\industry
 */
class Industry extends BaseValidate
{

       protected $rule = [
            'name' => 'require',
            'status' => 'require'
        ];

       protected $message = [
            'name.require' => ['common_validate.require', ['name']],
            'status.require' => ['common_validate.require', ['status']]
        ];

       protected $scene = [
            "add" => ['name', 'status'],
            "edit" => ['name', 'status']
        ];

}
