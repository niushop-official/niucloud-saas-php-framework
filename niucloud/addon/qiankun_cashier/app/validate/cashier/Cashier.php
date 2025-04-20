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

namespace addon\qiankun_cashier\app\validate\cashier;
use core\base\BaseValidate;
/**
 * 收银员验证器
 * Class Cashier
 * @package addon\qiankun_cashier\app\validate\cashier
 */
class Cashier extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['user_id', 'username', 'password', 'nickname', 'avatar', 'mobile', 'status'],
            "edit" => ['user_id', 'username', 'password', 'nickname', 'avatar', 'mobile', 'status']
        ];

}
