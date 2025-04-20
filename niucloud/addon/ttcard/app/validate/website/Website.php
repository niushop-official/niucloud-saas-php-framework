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

namespace addon\ttcard\app\validate\website;
use core\base\BaseValidate;
/**
 * 微官网管理验证器
 * Class Website
 * @package addon\ttcard\app\validate\website
 */
class Website extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['status', 'user_id', 'card_id', 'team_card_ids', 'industry_id', 'swiper_images', 'name', 'phone', 'wechat_num', 'weixin_image', 'address', 'logo', 'description', 'video', 'images', 'minicode_image', 'create_time'],
            "edit" => ['status', 'user_id', 'card_id', 'team_card_ids', 'industry_id', 'swiper_images', 'name', 'phone', 'wechat_num', 'weixin_image', 'address', 'logo', 'description', 'video', 'images', 'minicode_image', 'create_time']
        ];

}
