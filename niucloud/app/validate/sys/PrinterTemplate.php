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

namespace app\validate\sys;

use core\base\BaseValidate;

/**
 * 小票打印模板验证器
 * Class PrinterTemplate
 * @package app\validate\sys_printer_template
 */
class PrinterTemplate extends BaseValidate
{

    protected $rule = [
        'template_type' => 'require',
        'template_name' => 'require',
    ];

    protected $message = [
        'template_type.require' => [ 'common_validate.require', [ 'template_type' ] ],
        'template_name.require' => [ 'common_validate.require', [ 'template_name' ] ],
    ];

    protected $scene = [
        "add" => [ 'template_type', 'template_name', 'value' ],
        "edit" => [ 'template_type', 'template_name', 'value' ]
    ];

}
