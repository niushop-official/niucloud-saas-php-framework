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

namespace addon\tk_vip\app\validate\vip;
use core\base\BaseValidate;
/**
 * 会员VIP管理验证器
 * Class Vip
 * @package addon\tk_vip\app\validate\vip
 */
class Vip extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['member_id', 'level_id', 'over_time'],
            "edit" => ['member_id', 'level_id', 'over_time']
        ];

}
