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
 * 商品服务验证器
 * Class Serve
 * @package addon\shop\app\validate\goods
 */
class Service extends BaseValidate
{

    protected $rule = [
        'service_name' => 'require',
    ];

    protected $message = [
        'service_name.require' => [ 'common_validate.require', [ 'service_name' ] ],
    ];

    protected $scene = [
        "add" => [ 'service_name', 'desc' ],
        "edit" => [ 'service_name', 'desc' ]
    ];

}
