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

namespace addon\vipcard\app\validate;

/**
 * 服务验证器
 */
class Service extends \think\Validate
{

    protected $rule = [
        'goods_name' => 'require',
        'category_id' => 'require',
        'goods_cover' => 'require',
        'price' => 'require'
    ];

    protected $message = [
        'goods_name.require' => 'vipcard_service_goods.goods_name_require',
        'category_id.require' => 'vipcard_service_goods.category_id_require',
        'goods_cover.require' => 'vipcard_service_goods.goods_cover_require',
        'price.require' => 'vipcard_service_goods.price_require',
    ];

    protected $scene = [
        "add" => ['goods_name', 'category_id', 'goods_cover', 'price'],
        "edit" => ['goods_name', 'category_id', 'goods_cover', 'price']
    ];

}