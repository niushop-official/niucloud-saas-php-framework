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

namespace addon\ttcard\app\validate\order;
use core\base\BaseValidate;
/**
 * 订单管理验证器
 * Class Order
 * @package addon\ttcard\app\validate\order
 */
class Order extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['order_num', 'pay_status', 'price', 'total_price', 'buy_num', 'address_id', 'user_id', 'authentication_id', 'product_id', 'ordertype_id', 'ordertype_viptype', 'order_type_diyname', 'paytime', 'create_time'],
            "edit" => ['order_num', 'pay_status', 'price', 'total_price', 'buy_num', 'address_id', 'user_id', 'authentication_id', 'product_id', 'ordertype_id', 'ordertype_viptype', 'order_type_diyname', 'paytime', 'create_time']
        ];

}
