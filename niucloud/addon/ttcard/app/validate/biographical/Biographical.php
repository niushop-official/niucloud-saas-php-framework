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

namespace addon\ttcard\app\validate\biographical;
use core\base\BaseValidate;
/**
 * 简历管理验证器
 * Class Biographical
 * @package addon\ttcard\app\validate\biographical
 */
class Biographical extends BaseValidate
{

       protected $rule = [
            'user_id' => 'require',
            'status' => 'require',
            'name' => 'require',
            'phone' => 'require',
            'email' => 'email'
        ];

       protected $message = [
            'user_id.require' => ['common_validate.require', ['user_id']],
            'status.require' => ['common_validate.require', ['status']],
            'name.require' => ['common_validate.require', ['name']],
            'phone.require' => ['common_validate.require', ['phone']],
            'email.email' => ['common_validate.email', ['email']]
        ];

       protected $scene = [
            "add" => ['user_id', 'status', 'name', 'phone', 'avatar', 'age', 'gender_status', 'email', 'wechat_num', 'position', 'expected', 'working', 'type_status', 'education', 'city', 'advantage_content', 'experience_content', 'learning_content', 'certificate_images', 'unemployed_status', 'delive_num', 'view_num', 'reporttime'],
            "edit" => ['user_id', 'status', 'name', 'phone', 'avatar', 'age', 'gender_status', 'email', 'wechat_num', 'position', 'expected', 'working', 'type_status', 'education', 'city', 'advantage_content', 'experience_content', 'learning_content', 'certificate_images', 'unemployed_status', 'delive_num', 'view_num', 'reporttime']
        ];

}
