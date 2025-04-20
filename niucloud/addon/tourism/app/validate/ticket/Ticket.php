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

namespace app\validate\goods;

/**
 * 商品表验证器
 * Class Goods
 * @package app\validate\goods
 */
class Goods extends \think\Validate
{

       protected $rule = [
            'site_id' => 'require',
            'goods_name' => 'require',
            'goods_type' => 'require',
            'goods_no' => 'require',
            'goods_cover' => 'require',
            'goods_image' => 'require',
            'category_id' => 'require',
            'sale_num' => 'require',
            'verify_validity_type' => 'require',
            'verify_validity' => 'require',
            'status' => 'require',
            'sort' => 'require',
            'price' => 'require',
            'sale_price' => 'require',
            'cost_price' => 'require',
            'is_vip' => 'require',
            'vip_type' => 'require',
            'vip_price' => 'require',
            'create_time' => 'require',
            'is_delete' => 'require',
            'update_time' => 'require',
            'delete_time' => 'require',
        ];

       protected $message = [];

       protected $scene = [
            "add" => ['site_id','goods_name','goods_type','goods_no','goods_cover','goods_image','category_id','sale_num','verify_validity_type','verify_validity','status','sort','price','sale_price','cost_price','is_vip','vip_type','vip_price','is_delete','delete_time'],
            "update" => ['site_id','goods_name','goods_type','goods_no','goods_cover','goods_image','category_id','sale_num','verify_validity_type','verify_validity','status','sort','price','sale_price','cost_price','is_vip','vip_type','vip_price','is_delete','delete_time']
        ];

}