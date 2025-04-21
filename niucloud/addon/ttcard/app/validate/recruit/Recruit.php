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

namespace addon\ttcard\app\validate\recruit;
use core\base\BaseValidate;
/**
 * 招聘管理验证器
 * Class Recruit
 * @package addon\ttcard\app\validate\recruit
 */
class Recruit extends BaseValidate
{

       protected $rule = [
            'user_id' => 'require',
            'status' => 'require',
            'recruit_status' => 'require',
            'website_id' => 'require',
            'title' => 'require',
            'type_status' => 'require'
        ];

       protected $message = [
            'user_id.require' => ['common_validate.require', ['user_id']],
            'status.require' => ['common_validate.require', ['status']],
            'recruit_status.require' => ['common_validate.require', ['recruit_status']],
            'website_id.require' => ['common_validate.require', ['website_id']],
            'title.require' => ['common_validate.require', ['title']],
            'type_status.require' => ['common_validate.require', ['type_status']]
        ];

       protected $scene = [
            "add" => ['user_id', 'status', 'recruit_status', 'website_id', 'industry_id', 'scale', 'title', 'position', 'type_status', 'education', 'content', 'city', 'address', 'age', 'month_salary', 'tags'],
            "edit" => ['user_id', 'status', 'recruit_status', 'website_id', 'industry_id', 'scale', 'title', 'position', 'type_status', 'education', 'content', 'city', 'address', 'age', 'month_salary', 'tags']
        ];

}
