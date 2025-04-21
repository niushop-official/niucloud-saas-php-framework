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

namespace addon\huodong\app\validate\relation;
use core\base\BaseValidate;
/**
 * 推广关系验证器
 * Class Relation
 * @package addon\huodong\app\validate\relation
 */
class Relation extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['member_id', 'pid', 'pid2', 'adddate'],
            "edit" => ['member_id', 'pid', 'pid2', 'adddate']
        ];

}
