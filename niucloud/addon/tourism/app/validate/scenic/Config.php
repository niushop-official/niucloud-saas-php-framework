<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的saas管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------

namespace addon\tourism\app\validate\scenic;

/**
 * 景点设置验证
 * Class TourismHotel
 * @package aaddon\tourism\app\validate\scenic
 */
class Config extends \think\Validate
{

    protected $rule = [
        'is_allow_refund' => 'in:0,1',
        'refund_rate' => 'between:0,100',
    ];

    protected $message = [
        'is_allow_refund.in' => 'validate_tourism_scenic_config.is_allow_refund_in',
        'refund_rate.between' => 'validate_tourism_scenic_config.refund_rate_between'
    ];

    protected $scene = [
        "set" => ['is_allow_refund', 'refund_rate'],
    ];

}