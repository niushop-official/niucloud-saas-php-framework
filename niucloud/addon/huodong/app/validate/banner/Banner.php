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

namespace addon\huodong\app\validate\banner;
use core\base\BaseValidate;
/**
 * 轮播图管理验证器
 * Class Banner
 * @package addon\huodong\app\validate\banner
 */
class Banner extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['title', 'image', 'status'],
            "edit" => ['title', 'image', 'status']
        ];

}
