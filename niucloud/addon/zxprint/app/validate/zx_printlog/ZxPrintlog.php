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

namespace addon\zxprint\app\validate\zx_printlog;
use core\base\BaseValidate;
/**
 * 小票打印记录验证器
 * Class ZxPrintlog
 * @package addon\zxprint\app\validate\zx_printlog
 */
class ZxPrintlog extends BaseValidate
{

       protected $rule = [
            'order_id' => 'require'
        ];

       protected $message = [
            'order_id.require' => ['common_validate.require', ['order_id']]
        ];

       protected $scene = [
            "add" => ['order_id', 'create_time'],
            "edit" => ['order_id']
        ];

}
