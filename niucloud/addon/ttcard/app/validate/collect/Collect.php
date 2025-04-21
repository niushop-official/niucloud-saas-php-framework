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

namespace addon\ttcard\app\validate\collect;
use core\base\BaseValidate;
/**
 * 收藏管理验证器
 * Class Collect
 * @package addon\ttcard\app\validate\collect
 */
class Collect extends BaseValidate
{

       protected $rule = [
            'user_id' => 'require',
            'card_id' => 'require'
        ];

       protected $message = [
            'user_id.require' => ['common_validate.require', ['user_id']],
            'card_id.require' => ['common_validate.require', ['card_id']]
        ];

       protected $scene = [
            "add" => ['user_id', 'card_id'],
            "edit" => ['user_id', 'card_id']
        ];

}
