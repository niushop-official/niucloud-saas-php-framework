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
 *  商品分类验证器
 * Class GoodsCategory
 * @package app\validate\goods_category
 */
class Scenic extends \think\Validate
{

    protected $rule = [
        'scenic_name' => 'require',
        'province_id' => 'require',
        'city_id' => 'require',
        'district_id' => 'require',
        'address' => 'require',
        'scenic_level' => 'require',
        'scenic_cover' => 'require',
    ];

    protected $message = [
        "scenic_name.require" => "validate_tourism_scenic.scenic_name_require",
        "province_id.require" => "validate_tourism_scenic.province_id_require",
        "city_id.require" => "validate_tourism_scenic.city_id_require",
        "district_id.require" => "validate_tourism_scenic.district_id_require",
        "address.require" => "validate_tourism_scenic.address_require",
        "scenic_level.require" => "validate_tourism_scenic.scenic_level_require",
        "scenic_cover.require" => "validate_tourism_scenic.scenic_cover_require",
    ];

    protected $scene = [
        "add" => ['scenic_name','province_id','city_id','district_id','address','scenic_level','scenic_cover'],
        "edit" => ['scenic_name','province_id','city_id','district_id','address','scenic_level','scenic_cover']
    ];

}