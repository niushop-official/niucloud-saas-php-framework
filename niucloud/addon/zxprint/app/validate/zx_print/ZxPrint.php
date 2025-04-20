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

namespace addon\zxprint\app\validate\zx_print;
use core\base\BaseValidate;
/**
 * 小票打印配置验证器
 * Class ZxPrint
 * @package addon\zxprint\app\validate\zx_print
 */
class ZxPrint extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['client_id', 'client_secret', 'machine_code', 'private_key', 'print_number', 'status', 'auto_print', 'show_buyer_message', 'show_qrcode', 'qrcode_name', 'qrcode_content', 'bottom'],
            "edit" => ['client_id', 'client_secret', 'machine_code', 'private_key', 'print_number', 'status', 'auto_print', 'show_buyer_message', 'show_qrcode', 'qrcode_name', 'qrcode_content', 'bottom']
        ];

}
