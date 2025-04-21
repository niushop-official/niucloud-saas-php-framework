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
 * 商品参数验证器
 * Class Attr
 * @package addon\shop\app\validate\goods
 */
class Attr extends BaseValidate
{

    protected $rule = [
        'attr_name' => 'require',
        'attr_value_format' => 'require',
    ];

    protected $message = [
        'attr_name.require' => [ 'common_validate.require', [ 'attr_name' ] ],
        'attr_value_format.require' => [ 'common_validate.require', [ 'attr_value_format' ] ],
    ];

    protected $scene = [
        "add" => [ 'attr_name', 'sort' ],
        "edit" => [ 'attr_name', 'sort' ]
    ];

}
