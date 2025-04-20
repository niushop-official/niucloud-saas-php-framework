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

use think\validate\ValidateRule;

/**
 * 订单验证器
 */
class TechnicianOrder extends \think\Validate
{

    protected $rule = [
        'order_id' => 'require',
        'check_code' => 'require',
        'item_name' => 'require',
        'item_image' => 'require',
        'price' => 'require',
    ];

    protected $message = [

    ];

    protected $scene = [
        "orderService" => ['order_id', 'check_code'],
        "addItem" => ['order_id', 'item_name', 'price'],
        "editItem" => ['order_item_id', 'item_name', 'price'],
    ];

}