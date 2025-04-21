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

namespace addon\ttcard\app\validate\biographicaldelive;
use core\base\BaseValidate;
/**
 * 简历投递管理验证器
 * Class Biographicaldelive
 * @package addon\ttcard\app\validate\biographicaldelive
 */
class Biographicaldelive extends BaseValidate
{

       protected $rule = [
            'status' => 'require',
            'from_user_id' => 'require',
            'to_user_id' => 'require',
            'recruit_id' => 'require',
            'biographical_id' => 'require',
            'view_status' => 'require'
        ];

       protected $message = [
            'status.require' => ['common_validate.require', ['status']],
            'from_user_id.require' => ['common_validate.require', ['from_user_id']],
            'to_user_id.require' => ['common_validate.require', ['to_user_id']],
            'recruit_id.require' => ['common_validate.require', ['recruit_id']],
            'biographical_id.require' => ['common_validate.require', ['biographical_id']],
            'view_status.require' => ['common_validate.require', ['view_status']]
        ];

       protected $scene = [
            "add" => ['status', 'from_user_id', 'to_user_id', 'recruit_id', 'biographical_id', 'view_status'],
            "edit" => ['status', 'from_user_id', 'to_user_id', 'recruit_id', 'biographical_id', 'view_status']
        ];

}
