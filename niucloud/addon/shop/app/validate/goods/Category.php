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

namespace addon\shop\app\validate\goods;

use core\base\BaseValidate;

/**
 * 商品分类验证器
 * Class Category
 * @package addon\shop\app\validate\goods
 */
class   Category extends BaseValidate
{

    protected $rule = [
        'category_name' => 'require',
        'pid' => 'require',
    ];

    protected $message = [
        'category_name.require' => [ 'common_validate.require', [ 'category_name' ] ],
        'pid.require' => [ 'common_validate.require', [ 'pid' ] ],
    ];

    protected $scene = [
        "add" => [ 'category_name', 'pid' ],
        "edit" => [ 'category_name', 'pid' ]
    ];

}
