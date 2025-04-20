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

namespace addon\qiankun_recharge\app\validate\order;
use core\base\BaseValidate;
/**
 * 充值订单验证器
 * Class Order
 * @package addon\qiankun_recharge\app\validate\order
 */
class Order extends BaseValidate
{

       protected $rule = [
            
        ];

       protected $message = [
            
        ];

       protected $scene = [
            "add" => ['order_no', 'order_from', 'order_type', 'out_trade_no', 'member_id', 'recharge_id', 'give_coupon', 'give_integral', 'give_price', 'paid', 'pay_time', 'refund_status'],
            "edit" => ['order_no', 'order_from', 'order_type', 'out_trade_no', 'member_id', 'recharge_id', 'give_coupon', 'give_integral', 'give_price', 'paid', 'pay_time', 'refund_status']
        ];

}
