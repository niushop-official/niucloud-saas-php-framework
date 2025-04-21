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

namespace addon\recharge\app\validate;

use core\base\BaseValidate;

/**
 * 充值套餐验证器
 * Class Recharge
 * @package addon\recharge\app\validate
 */
class Recharge extends BaseValidate
{

    protected $rule = [
        'face_value' => 'require|gt:0',
        'buy_price' => 'require|gt:0',
        'point' => 'require|egt:0',
        'growth' => 'require|egt:0',
    ];

    protected $message = [
        'face_value.require' => [ 'common_validate.require', [ 'face_value' ] ],
        'buy_price.require' => [ 'common_validate.require', [ 'buy_price' ] ],
        'point.require' => [ 'common_validate.require', [ 'point' ] ],
        'growth.require' => [ 'common_validate.require', [ 'growth' ] ],
    ];

    protected $scene = [
        "add" => [ 'face_value', 'buy_price', 'point', 'growth'],
        "edit" => [ 'face_value', 'buy_price', 'point', 'growth']
    ];

}
