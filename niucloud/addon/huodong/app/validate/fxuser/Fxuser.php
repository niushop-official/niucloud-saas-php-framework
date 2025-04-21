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

namespace addon\huodong\app\validate\fxuser;
use core\base\BaseValidate;
/**
 * 推广员验证器
 * Class Fxuser
 * @package addon\huodong\app\validate\fxuser
 */
class Fxuser extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['member_id', 'type', 'name', 'mobile', 'idcard', 'sfz1', 'sfz2', 'ying_image', 'status'],
            "edit" => ['member_id', 'type', 'name', 'mobile', 'idcard', 'sfz1', 'sfz2', 'ying_image', 'status']
        ];

}
