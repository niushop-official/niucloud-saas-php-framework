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

namespace addon\ttcard\app\validate\invite;
use core\base\BaseValidate;
/**
 * 微官网邀请管理验证器
 * Class Invite
 * @package addon\ttcard\app\validate\invite
 */
class Invite extends BaseValidate
{

       protected $rule = [
            'from_user_id' => 'require',
            'from_website_id' => 'require',
            'to_user_id' => 'require',
            'to_user_card_id' => 'require'
        ];

       protected $message = [
            'from_user_id.require' => ['common_validate.require', ['from_user_id']],
            'from_website_id.require' => ['common_validate.require', ['from_website_id']],
            'to_user_id.require' => ['common_validate.require', ['to_user_id']],
            'to_user_card_id.require' => ['common_validate.require', ['to_user_card_id']]
        ];

       protected $scene = [
            "add" => ['status', 'from_user_id', 'from_website_id', 'to_user_id', 'to_user_card_id'],
            "edit" => ['status', 'from_user_id', 'from_website_id', 'to_user_id', 'to_user_card_id']
        ];

}
