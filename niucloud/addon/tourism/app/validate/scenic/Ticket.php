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
class Ticket extends \think\Validate
{

    protected $rule = [
        'goods_name' => 'require',
        'price' => 'require',
        'stock' => 'require',
    ];

    protected $message = [
        "goods_name.require" => "validate_tourism_ticket.goods_name_require",
        "price.require" => "validate_tourism_ticket.price_require",
        "stock.require" => "validate_tourism_ticket.stock_require"
    ];

    protected $scene = [
        "add" => ['goods_name','price','stock'],
        "edit" => ['goods_name','price','stock']
    ];

}