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

namespace addon\ttcard\app\validate\authentication;
use core\base\BaseValidate;
/**
 * 认证信息管理验证器
 * Class Authentication
 * @package addon\ttcard\app\validate\authentication
 */
class Authentication extends BaseValidate
{

       protected $rule = [
            'status' => 'require',
            'examine_status' => 'require',
            'user_id' => 'require',
            'website_id' => 'require',
            'ordertype_id' => 'require',
            'name' => 'require',
            'idcard_num' => 'require'
        ];

       protected $message = [
            'status.require' => ['common_validate.require', ['status']],
            'examine_status.require' => ['common_validate.require', ['examine_status']],
            'user_id.require' => ['common_validate.require', ['user_id']],
            'website_id.require' => ['common_validate.require', ['website_id']],
            'ordertype_id.require' => ['common_validate.require', ['ordertype_id']],
            'name.require' => ['common_validate.require', ['name']],
            'idcard_num.require' => ['common_validate.require', ['idcard_num']]
        ];

       protected $scene = [
            "add" => ['status', 'examine_status', 'user_id', 'website_id', 'ordertype_id', 'ordertype_diyname', 'name', 'idcard_num', 'idcard_z_image', 'idcard_f_image', 'businesslicense_image', 'tips'],
            "edit" => ['status', 'examine_status', 'user_id', 'website_id', 'ordertype_id', 'ordertype_diyname', 'name', 'idcard_num', 'idcard_z_image', 'idcard_f_image', 'businesslicense_image', 'tips']
        ];

}
