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
 * 商品品牌验证器
 * Class Brand
 * @package addon\shop\app\validate\goods
 */
class Brand extends BaseValidate
{

    protected $rule = [
        'brand_name' => 'require',
    ];

    protected $message = [
        'brand_name.require' => [ 'common_validate.require', [ 'brand_name' ] ],
    ];

    protected $scene = [
        "add" => [ 'brand_name', 'logo', 'desc', 'sort' ],
        "edit" => [ 'brand_name', 'logo', 'desc', 'sort' ]
    ];

}
