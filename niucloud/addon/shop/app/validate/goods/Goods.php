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

namespace addon\shop\app\validate\goods;

use core\base\BaseValidate;

/**
 * 商品验证器
 * Class Goods
 * @package addon\shop\app\validate\goods
 */
class Goods extends BaseValidate
{

    protected $rule = [
        'goods_name' => 'require',
        'goods_type' => 'require',
        'goods_image' => 'require',
        'goods_category' => 'require',
        'stock' => 'require',
        'status' => 'number|between:0,1',
        'goods_desc' => 'require',
    ];

    protected $message = [
        'goods_name.require' => [ 'common_validate.require', [ 'goods_name' ] ],
        'goods_type.require' => [ 'common_validate.require', [ 'goods_type' ] ],
        'goods_image.require' => [ 'common_validate.require', [ 'goods_image' ] ],
        'goods_category.require' => [ 'common_validate.require', [ 'goods_category' ] ],
        'stock.require' => [ 'common_validate.require', [ 'stock' ] ],
        'status.require' => [ 'common_validate.require', [ 'status' ] ],
        'goods_desc.require' => [ 'common_validate.require', [ 'goods_desc' ] ],
    ];

    protected $scene = [
        "add" => [ 'goods_name', 'goods_type', 'goods_cover', 'goods_image', 'goods_desc', 'brand_id', 'goods_category', 'label_ids', 'service_ids', 'unit', 'stock', 'sale_num', 'virtual_sale_num', 'status', 'sort', 'delivery_type', 'is_free_shipping', 'fee_type', 'delivery_money', 'delivery_template_id' ],
        "edit" => [ 'goods_name', 'goods_type', 'goods_cover', 'goods_image', 'goods_desc', 'brand_id', 'goods_category', 'label_ids', 'service_ids', 'unit', 'stock', 'sale_num', 'virtual_sale_num', 'status', 'sort', 'delivery_type', 'is_free_shipping', 'fee_type', 'delivery_money', 'delivery_template_id' ],
    ];

}
