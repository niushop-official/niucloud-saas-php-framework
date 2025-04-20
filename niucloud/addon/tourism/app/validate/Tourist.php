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

namespace addon\tourism\app\validate;

/**
 * 酒店订单验证器
 * Class TourismHotel
 * @package app\validate\tourism_hotel
 */
class Tourist extends \think\Validate
{
    protected $rule = [
        'name' => 'require|chs',
        'id_card' => 'require|idCard',
    ];

    protected $message = [

    ];

    protected $scene = [
        "add" => ['name','id_card'],
        "edit" => ['name','id_card']
    ];

}