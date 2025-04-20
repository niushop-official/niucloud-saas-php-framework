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

namespace addon\tk_vip\app\validate\real;
use core\base\BaseValidate;
/**
 * 实名认证验证器
 * Class Real
 * @package addon\tk_vip\app\validate\real
 */
class Real extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['member_id', 'real_name', 'mobile', 'card_num', 'sex', 'birthday', 'field', 'status', 'real_num'],
            "edit" => ['member_id', 'real_name', 'mobile', 'card_num', 'sex', 'birthday', 'field', 'status', 'real_num']
        ];

}
