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
 * 自提门店验证器
 * Class Store
 * @package addon\shop\app\validate\delivery
 */
class Store extends BaseValidate
{

    protected $rule = [
        'store_name' => 'require',
        'store_mobile' => 'require|mobile',
        'address' => 'require',
        'trade_time' => 'require',
    ];

    protected $message = [
        'store_name.require' => [ 'common_validate.require', [ 'store_name' ] ],
        'store_mobile.require' => [ 'common_validate.require', [ 'store_mobile' ] ],
        'store_mobile.mobile' => [ 'common_validate.mobile', [ 'store_mobile' ] ],
        'address.require' => [ 'common_validate.require', [ 'address' ] ],
        'trade_time.require' => [ 'common_validate.require', [ 'trade_time' ] ],
    ];

    protected $scene = [
        "add" => [ 'store_name', 'store_mobile', 'address', 'trade_time' ],
        "edit" => [ 'store_name', 'store_mobile', 'address', 'trade_time' ]
    ];

}
