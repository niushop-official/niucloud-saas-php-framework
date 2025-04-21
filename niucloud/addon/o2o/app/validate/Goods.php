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

namespace addon\o2o\app\validate;

use core\base\BaseValidate;

/**
 * 服务验证器
 */
class Goods extends BaseValidate
{

    protected $rule = [
        'goods_name' => 'require',
        'goods_image' => 'require',
        'goods_category' => 'require',
        'status' => 'number|between:0,1',
        'goods_desc' => 'require',
    ];

    protected $message = [
        'goods_name.require' => 'o2o_service_goods.goods_name_require',
        'goods_image.require' => 'o2o_service_goods.goods_image_require',
        'goods_category.require' => 'o2o_service_goods.goods_category_require',
        'goods_cover.require' => 'o2o_service_goods.goods_cover_require'
    ];

    protected $scene = [
        "add" => [ 'goods_name', 'goods_cover', 'goods_image', 'goods_category', 'sku_unit', 'virtual_sale_num', 'status', 'sort' ],
        "edit" => [ 'goods_name', 'goods_cover', 'goods_image', 'goods_category', 'sku_unit', 'virtual_sale_num', 'status', 'sort']
    ];

}