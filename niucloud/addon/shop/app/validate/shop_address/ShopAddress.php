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

namespace addon\shop\app\validate\shop_address;

use core\base\BaseValidate;

/**
 * 商家地址库验证器
 * Class ShopAddress
 * @package addon\shop\app\validate\shop_address
 */
class ShopAddress extends BaseValidate
{

    protected $rule = [
        'contact_name' => 'require',
        'mobile' => 'require',
        'province_id' => 'require',
        'city_id' => 'require',
        'district_id' => 'require',
        'address' => 'require',
        'full_address' => 'require',
        'lat' => 'require',
        'lng' => 'require',
        'is_delivery_address' => 'require',
        'is_refund_address' => 'require',
        'is_default_delivery' => 'require',
        'is_default_refund' => 'require',
    ];

    protected $message = [
        'contact_name.require' => [ 'common_validate.require', [ 'contact_name' ] ],
        'mobile.require' => [ 'common_validate.require', [ 'mobile' ] ],
        'province_id.require' => [ 'common_validate.require', [ 'province_id' ] ],
        'city_id.require' => [ 'common_validate.require', [ 'city_id' ] ],
        'district_id.require' => [ 'common_validate.require', [ 'district_id' ] ],
        'address.require' => [ 'common_validate.require', [ 'address' ] ],
        'full_address.require' => [ 'common_validate.require', [ 'full_address' ] ],
        'lat.require' => [ 'common_validate.require', [ 'lat' ] ],
        'lng.require' => [ 'common_validate.require', [ 'lng' ] ],
        'is_delivery_address.require' => [ 'common_validate.require', [ 'is_delivery_address' ] ],
        'is_refund_address.require' => [ 'common_validate.require', [ 'is_refund_address' ] ],
        'is_default_delivery.require' => [ 'common_validate.require', [ 'is_default_delivery' ] ],
        'is_default_refund.require' => [ 'common_validate.require', [ 'is_default_refund' ] ],
    ];

    protected $scene = [
        "add" => [ 'contact_name', 'mobile', 'province_id', 'city_id', 'district_id', 'address', 'full_address', 'lat', 'lng', 'is_delivery_address', 'is_refund_address', 'is_default_delivery', 'is_default_refund' ],
        "edit" => [ 'contact_name', 'mobile', 'province_id', 'city_id', 'district_id', 'address', 'full_address', 'lat', 'lng', 'is_delivery_address', 'is_refund_address', 'is_default_delivery', 'is_default_refund' ]
    ];

}
