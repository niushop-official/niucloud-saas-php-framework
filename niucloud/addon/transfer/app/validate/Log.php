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

namespace addon\transfer\app\validate;
use core\base\BaseValidate;
/**
 * 资产转赠记录验证器
 * Class Log
 * @package addon\transfer\app\validate\log
 */
class Log extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['account_type', 'member_id', 'to_member_id', 'zhuan_money', 'give_money', 'meno'],
            "edit" => ['account_type', 'member_id', 'to_member_id', 'zhuan_money', 'give_money', 'meno']
        ];

}
