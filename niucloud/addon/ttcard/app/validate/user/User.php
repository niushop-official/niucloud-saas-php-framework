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

namespace addon\ttcard\app\validate\user;
use core\base\BaseValidate;
/**
 * 用户管理验证器
 * Class User
 * @package addon\ttcard\app\validate\user
 */
class User extends BaseValidate
{

       protected $rule = [
            'phone' => 'mobile'
        ];

       protected $message = [
            'phone.mobile' => ['手机号不能为空', ['phone']]
        ];

       protected $scene = [
            "add" => ['status', 'username', 'password', 'avatar', 'nickname', 'phone', 'ordertype_id', 'expirationtime', 'grade_status', 'prelogintime', 'logintime'],
            "edit" => ['status', 'username', 'password', 'avatar', 'nickname', 'phone', 'ordertype_id', 'expirationtime', 'grade_status', 'prelogintime', 'logintime']
        ];

}
