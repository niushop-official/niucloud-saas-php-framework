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

namespace addon\tk_vip\app\validate\order;
use core\base\BaseValidate;
/**
 * VIP订单验证器
 * Class Order
 * @package addon\tk_vip\app\validate\order
 */
class Order extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['member_id', 'order_from', 'order_id', 'body', 'level_id', 'sku_id', 'day', 'status', 'out_trade_no', 'pay_time', 'close_time', 'close_reason', 'remark', 'refund_status'],
            "edit" => ['member_id', 'order_from', 'order_id', 'body', 'level_id', 'sku_id', 'day', 'status', 'out_trade_no', 'pay_time', 'close_time', 'close_reason', 'remark', 'refund_status']
        ];

}
