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

namespace addon\ttcard\app\validate\ordertype;
use core\base\BaseValidate;
/**
 * 会员等级验证器
 * Class Ordertype
 * @package addon\ttcard\app\validate\ordertype
 */
class Ordertype extends BaseValidate
{

       protected $rule = [
            'status' => 'require',
            'name' => 'require',
            'type' => 'require',
            'duration' => 'require',
            'tips' => 'require',
            'create_website_num' => 'require',
            'create_card_num' => 'require',
            'originalprice' => 'require',
            'price' => 'require'
        ];

       protected $message = [
            'status.require' => ['common_validate.require', ['status']],
            'name.require' => ['common_validate.require', ['name']],
            'type.require' => ['common_validate.require', ['type']],
            'duration.require' => ['common_validate.require', ['duration']],
            'tips.require' => ['common_validate.require', ['tips']],
            'create_website_num.require' => ['common_validate.require', ['create_website_num']],
            'create_card_num.require' => ['common_validate.require', ['create_card_num']],
            'originalprice.require' => ['common_validate.require', ['originalprice']],
            'price.require' => ['common_validate.require', ['price']]
        ];

       protected $scene = [
            "add" => ['status', 'name', 'diy_name', 'type', 'duration', 'tips', 'create_website_num', 'create_card_num', 'originalprice', 'price'],
            "edit" => ['status', 'name', 'diy_name', 'type', 'duration', 'tips', 'create_website_num', 'create_card_num', 'originalprice', 'price']
        ];

}
