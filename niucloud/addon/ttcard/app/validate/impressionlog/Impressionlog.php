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

namespace addon\ttcard\app\validate\impressionlog;
use core\base\BaseValidate;
/**
 * 个人印象日志管理验证器
 * Class Impressionlog
 * @package addon\ttcard\app\validate\impressionlog
 */
class Impressionlog extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['impression_id', 'user_id', 'card_id'],
            "edit" => ['impression_id', 'user_id', 'card_id']
        ];

}
