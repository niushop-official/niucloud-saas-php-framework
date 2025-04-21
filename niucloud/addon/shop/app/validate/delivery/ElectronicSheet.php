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
 * 电子面单验证器
 * Class ElectronicSheet
 * @package addon\shop\app\validate\delivery
 */
class ElectronicSheet extends BaseValidate
{

    protected $rule = [
        'template_name' => 'require',
        'express_company_id' => 'require',
    ];

    protected $message = [
        'template_name.require' => [ 'common_validate.require', [ 'template_name' ] ],
        'express_company_id.require' => [ 'common_validate.require', [ 'express_company_id' ] ],
    ];

    protected $scene = [
        "add" => [ 'template_name', 'express_company_id' ],
        "edit" => [ 'template_name', 'express_company_id' ]
    ];

}
