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

namespace addon\shop\app\validate\delivery;

use core\base\BaseValidate;

/**
 * 物流公司验证器
 * Class Company
 * @package addon\shop\app\validate\delivery
 */
class Company extends BaseValidate
{

    protected $rule = [
        'company_name' => 'require',
    ];

    protected $message = [
        'company_name.require' => [ 'common_validate.require', [ 'company_name' ] ],
    ];

    protected $scene = [
        "add" => [ 'company_name' ],
        "edit" => [ 'company_name' ]
    ];

}
