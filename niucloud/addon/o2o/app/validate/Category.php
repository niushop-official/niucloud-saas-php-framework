<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\o2o\app\validate;

/**
 * 服务分类验证器
 */
class Category extends \think\Validate
{

    protected $rule = [
        'category_name' => 'require',
    ];

    protected $message = [
        'category_name.require' => 'o2o_service_category.category_name_require',
    ];

    protected $scene = [
        "add" => ['category_name'],
        "edit" => ['category_name']
    ];

}