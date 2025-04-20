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

namespace addon\ttcard\app\validate\card;
use core\base\BaseValidate;
/**
 * 名片管理验证器
 * Class Card
 * @package addon\ttcard\app\validate\card
 */
class Card extends BaseValidate
{

       protected $rule = [
            'user_id' => 'require',
            'status' => 'require',
            'auditing_status' => 'require',
            'industry_id' => 'require',
            'name' => 'require',
            'phone' => 'mobile',
            'email' => 'email',
            'recommend' => 'require',
            'default_status' => 'require',
            'connections_status' => 'require'
        ];

       protected $message = [
            'user_id.require' => ['common_validate.require', ['user_id']],
            'status.require' => ['common_validate.require', ['status']],
            'auditing_status.require' => ['common_validate.require', ['auditing_status']],
            'industry_id.require' => ['common_validate.require', ['industry_id']],
            'name.require' => ['common_validate.require', ['name']],
            'phone.mobile' => ['common_validate.mobile', ['phone']],
            'email.email' => ['common_validate.email', ['email']],
            'recommend.require' => ['common_validate.require', ['recommend']],
            'default_status.require' => ['common_validate.require', ['default_status']],
            'connections_status.require' => ['common_validate.require', ['connections_status']]
        ];

       protected $scene = [
            "add" => ['user_id', 'status', 'auditing_status', 'industry_id', 'avatar', 'name', 'gender', 'age', 'phone', 'position', 'tags', 'email', 'address', 'wechat_num', 'wechat_code_image', 'card_bg_id', 'card_diy_bg', 'description', 'video', 'recommend', 'default_status', 'connections_status', 'weigh', 'minicode_image'],
            "edit" => ['user_id', 'status', 'auditing_status', 'industry_id', 'avatar', 'name', 'gender', 'age', 'phone', 'position', 'tags', 'email', 'address', 'wechat_num', 'wechat_code_image', 'card_bg_id', 'card_diy_bg', 'description', 'video', 'recommend', 'default_status', 'connections_status', 'weigh', 'minicode_image']
        ];

}
