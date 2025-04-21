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

namespace addon\ttcard\app\validate\cases;
use core\base\BaseValidate;
/**
 * 成功案例管理验证器
 * Class Cases
 * @package addon\ttcard\app\validate\cases
 */
class Cases extends BaseValidate
{

       protected $rule = [
            'user_id' => 'require',
            'card_id' => 'require',
            'website_id' => 'require',
            'title' => 'require',
            'status' => 'require'
        ];

       protected $message = [
            'user_id.require' => ['common_validate.require', ['user_id']],
            'card_id.require' => ['common_validate.require', ['card_id']],
            'website_id.require' => ['common_validate.require', ['website_id']],
            'title.require' => ['common_validate.require', ['title']],
            'status.require' => ['common_validate.require', ['status']]
        ];

       protected $scene = [
            "add" => ['user_id', 'card_id', 'website_id', 'title', 'video', 'description', 'images', 'status'],
            "edit" => ['user_id', 'card_id', 'website_id', 'title', 'video', 'description', 'images', 'status']
        ];

}
