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

namespace addon\qiankun_source\app\validate\category;
use core\base\BaseValidate;
/**
 * 乾坤素材分类验证器
 * Class Category
 * @package addon\qiankun_source\app\validate\category
 */
class Category extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['title', 'icon', 'sort', 'status'],
            "edit" => ['title', 'icon', 'sort', 'status']
        ];

}
