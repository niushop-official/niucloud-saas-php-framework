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

namespace addon\ttcard\app\validate\cardbackground;
use core\base\BaseValidate;
/**
 * 背景图管理验证器
 * Class Cardbackground
 * @package addon\ttcard\app\validate\cardbackground
 */
class Cardbackground extends BaseValidate
{

       protected $rule = [
            'title' => 'require',
            'type' => 'require',
            'image' => 'require',
            'status' => 'require'
        ];

       protected $message = [
            'title.require' => ['common_validate.require', ['title']],
            'type.require' => ['common_validate.require', ['type']],
            'image.require' => ['common_validate.require', ['image']],
            'status.require' => ['common_validate.require', ['status']]
        ];

       protected $scene = [
            "add" => ['title', 'type', 'image', 'status'],
            "edit" => ['title', 'type', 'image', 'status']
        ];

}
