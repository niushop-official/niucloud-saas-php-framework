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

namespace addon\ttcard\app\validate\feedback;
use core\base\BaseValidate;
/**
 * 意见反馈管理验证器
 * Class Feedback
 * @package addon\ttcard\app\validate\feedback
 */
class Feedback extends BaseValidate
{

       protected $rule = [
            'user_id' => 'require',
            'title' => 'require',
            'content' => 'require',
            'status' => 'require'
        ];

       protected $message = [
            'user_id.require' => ['common_validate.require', ['user_id']],
            'title.require' => ['common_validate.require', ['title']],
            'content.require' => ['common_validate.require', ['content']],
            'status.require' => ['common_validate.require', ['status']]
        ];

       protected $scene = [
            "add" => ['user_id', 'title', 'content', 'status'],
            "edit" => ['user_id', 'title', 'content', 'status']
        ];

}
