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
 * 商品标签验证器
 * Class Label
 * @package addon\shop\app\validate\goods
 */
class Label extends BaseValidate
{

    protected $rule = [
        'label_name' => 'require',
    ];

    protected $message = [
        'label_name.require' => [ 'common_validate.require', [ 'label_name' ] ],
    ];

    protected $scene = [
        "add" => [ 'label_name', 'memo', 'sort' ],
        "edit" => [ 'label_name', 'memo', 'sort' ]
    ];

}
