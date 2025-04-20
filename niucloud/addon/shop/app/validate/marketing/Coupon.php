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

namespace addon\shop\app\validate\marketing;

use core\base\BaseValidate;

/**
 * 商品优惠券验证器
 * Class Coupon
 * @package addon\shop\app\validate\marketing
 */
class Coupon extends BaseValidate
{

    protected $rule = [
        'title' => 'require',
        'price' => 'require',
        'receive_type' => 'require',
        'type' => 'require',
        'start_time' => 'require',
        'end_time' => 'require',
    ];

    protected $message = [
        'title.require' => [ 'common_validate.require', [ 'title' ] ],
        'price.require' => [ 'common_validate.require', [ 'price' ] ],
        'receive_type.require' => [ 'common_validate.require', [ 'receive_type' ] ],
        'type.require' => [ 'common_validate.require', [ 'type' ] ],
        'start_time.require' => [ 'common_validate.require', [ 'start_time' ] ],
        'end_time.require' => [ 'common_validate.require', [ 'end_time' ] ],
    ];

    protected $scene = [
        "add" => [ 'title', 'price', 'receive_type', 'type', 'start_time', 'end_time' ],
    ];

}
