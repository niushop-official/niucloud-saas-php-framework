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
 *  商品分类验证器
 * Class GoodsCategory
 * @package app\validate\goods_category
 */
class Room extends \think\Validate
{

       protected $rule = [
            'goods_name' => 'require',
            'stock' => 'require',
            'goods_cover' => 'require',
        ];

       protected $message = [
           'goods_name.require' => 'validate_tourism_room.goods_name_require',
           'stock.require' => 'validate_tourism_room.stock_require',
           'goods_cover.require' => 'validate_tourism_room.goods_cover_require'
       ];

       protected $scene = [
            "add" => ['goods_name','price','goods_cover'],
            "update" => ['goods_name','price','goods_cover']
        ];

}