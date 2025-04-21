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
 * 小票打印机验证器
 * Class Printer
 * @package addon\app\validate\sys_printer
 */
class Printer extends BaseValidate
{

    protected $rule = [
        'brand' => 'require',
        'printer_name' => 'require',
        'printer_code' => 'require',
        'printer_key' => 'require',
        'open_id' => 'require',
        'apikey' => 'require',
        'print_width' => 'require',
    ];

    protected $message = [
        'brand.require' => [ 'common_validate.require', [ 'brand' ] ],
        'printer_name.require' => [ 'common_validate.require', [ 'printer_name' ] ],
        'printer_code.require' => [ 'common_validate.require', [ 'printer_code' ] ],
        'printer_key.require' => [ 'common_validate.require', [ 'printer_key' ] ],
        'open_id.require' => [ 'common_validate.require', [ 'open_id' ] ],
        'apikey.require' => [ 'common_validate.require', [ 'apikey' ] ],
        'print_width.require' => [ 'common_validate.require', [ 'print_width' ] ],
    ];

    protected $scene = [
        "add" => [ 'brand', 'printer_name', 'printer_code', 'printer_key', 'open_id', 'apikey', 'value', 'print_width' ],
        "edit" => [ 'brand', 'printer_name', 'printer_code', 'printer_key', 'open_id', 'apikey', 'value', 'print_width' ]
    ];

}
