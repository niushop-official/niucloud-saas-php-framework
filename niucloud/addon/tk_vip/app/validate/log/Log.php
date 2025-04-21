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

namespace addon\tk_vip\app\validate\log;
use core\base\BaseValidate;
/**
 * 会员日志验证器
 * Class Log
 * @package addon\tk_vip\app\validate\log
 */
class Log extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['member_id', 'level_id', 'type', 'body', 'over_time'],
            "edit" => ['member_id', 'level_id', 'type', 'body', 'over_time']
        ];

}
