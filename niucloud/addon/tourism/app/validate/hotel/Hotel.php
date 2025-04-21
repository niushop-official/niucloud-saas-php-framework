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

namespace addon\tourism\app\validate\hotel;

/**
 * 酒店验证器
 * Class TourismHotel
 * @package app\validate\tourism_hotel
 */
class Hotel extends \think\Validate
{

    protected $rule = [
        'hotel_name' => 'require',
        'hotel_cover' => 'require',
        'hotel_star' => 'require'
    ];

    protected $message = [
        'hotel_name.require' => 'validate_tourism_edit_hotel.hotel_name_require',
        'hotel_cover.require' => 'validate_tourism_edit_hotel.hotel_cover_require',
        'hotel_star.require' => 'validate_tourism_edit_hotel.hotel_star_require',
    ];

    protected $scene = [
        "add" => ['hotel_name','hotel_cover','hotel_star'],
        "edit" => ['hotel_name','hotel_cover','hotel_star']
    ];

}