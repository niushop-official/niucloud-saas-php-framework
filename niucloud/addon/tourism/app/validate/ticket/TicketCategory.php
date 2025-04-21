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

namespace app\validate\goods_category;

/**
 *  商品分类验证器
 * Class GoodsCategory
 * @package app\validate\goods_category
 */
class GoodsCategory extends \think\Validate
{

       protected $rule = [
            'category_name' => 'require',
            'pid' => 'require',
            'level' => 'require',
            'sort' => 'require',
            'image' => 'require',
            'create_time' => 'require',
            'update_time' => 'require',
        ];

       protected $message = [];

       protected $scene = [
            "add" => ['category_name','pid','level','sort','image'],
            "update" => ['category_name','pid','level','sort','image']
        ];

}