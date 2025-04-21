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

namespace addon\ttcard\app\validate\help;
use core\base\BaseValidate;
/**
 * 使用帮助管理验证器
 * Class Help
 * @package addon\ttcard\app\validate\help
 */
class Help extends BaseValidate
{

       protected $rule = [
            'title' => 'require',
            'content' => 'require',
            'status' => 'require'
        ];

       protected $message = [
            'title.require' => ['common_validate.require', ['title']],
            'content.require' => ['common_validate.require', ['content']],
            'status.require' => ['common_validate.require', ['status']]
        ];

       protected $scene = [
            "add" => ['title', 'content', 'status'],
            "edit" => ['title', 'content', 'status']
        ];

}
