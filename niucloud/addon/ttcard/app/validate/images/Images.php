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

namespace addon\ttcard\app\validate\images;
use core\base\BaseValidate;
/**
 * 相册管理验证器
 * Class Images
 * @package addon\ttcard\app\validate\images
 */
class Images extends BaseValidate
{

       protected $rule = [
            'status' => 'require'
        ];

       protected $message = [
            'status.require' => ['common_validate.require', ['status']]
        ];

       protected $scene = [
            "add" => ['status', 'user_id', 'card_id', 'images'],
            "edit" => ['status', 'user_id', 'card_id', 'images']
        ];

}
