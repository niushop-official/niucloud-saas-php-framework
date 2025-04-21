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

namespace addon\ttcard\app\validate\statistics;
use core\base\BaseValidate;
/**
 * 数据统计管理验证器
 * Class Statistics
 * @package addon\ttcard\app\validate\statistics
 */
class Statistics extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['type', 'from_user_id', 'user_id', 'card_id', 'ip'],
            "edit" => ['type', 'from_user_id', 'user_id', 'card_id', 'ip']
        ];

}
