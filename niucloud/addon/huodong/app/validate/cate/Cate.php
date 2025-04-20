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

namespace addon\huodong\app\validate\cate;
use core\base\BaseValidate;
/**
 * 活动分类验证器
 * Class Cate
 * @package addon\huodong\app\validate\cate
 */
class Cate extends BaseValidate
{

       protected $rule = [
            'name' => 'require'
        ];

       protected $message = [
            'name.require' => ['common_validate.require', ['name']]
        ];

       protected $scene = [
            "add" => ['name', 'status'],
            "edit" => ['name', 'status']
        ];

}
