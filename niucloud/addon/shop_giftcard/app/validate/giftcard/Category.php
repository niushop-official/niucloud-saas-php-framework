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

namespace addon\shop_giftcard\app\validate\giftcard;

use core\base\BaseValidate;

/**
 * 礼品卡分类验证器
 * Class Category
 * @package addon\shop_giftcard\app\validate\giftcard
 */
class Category extends BaseValidate
{

    protected $rule = [
        'category_name' => 'require|unique:shop_giftcard_category',
    ];

    protected $message = [
        'category_name.require' => [ 'common_validate.require', [ 'category_name' ] ],
        'category_name.unique' => 'common_validate.category_name_unique',
    ];

    protected $scene = [
        "add" => [ 'category_name' ],
        "edit" => [ 'category_name' ]
    ];

}
