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

namespace addon\transfer\app\validate\order;
use core\base\BaseValidate;
/**
 * 转赠支付订单验证器
 * Class Order
 * @package addon\transfer\app\validate\order
 */
class Order extends BaseValidate
{

       protected $rule = [
            'order_no' => 'require',
            'order_from' => 'require',
            'out_trade_no' => 'require',
            'order_status' => 'require',
            'member_id' => 'require',
            'ip' => 'require',
            'order_money' => 'require',
            'pay_time' => 'require',
            'close_time' => 'require',
        ];

       protected $message = [
            'order_no.require' => ['common_validate.require', ['order_no']],
            'order_from.require' => ['common_validate.require', ['order_from']],
            'out_trade_no.require' => ['common_validate.require', ['out_trade_no']],
            'order_status.require' => ['common_validate.require', ['order_status']],
            'member_id.require' => ['common_validate.require', ['member_id']],
            'ip.require' => ['common_validate.require', ['ip']],
            'order_money.require' => ['common_validate.require', ['order_money']],
            'pay_time.require' => ['common_validate.require', ['pay_time']],
            'close_time.require' => ['common_validate.require', ['close_time']],
        ];

       protected $scene = [
            "add" => ['order_no', 'order_from', 'out_trade_no', 'order_status', 'member_id', 'ip', 'order_money', 'pay_time', 'close_time', 'log_id', 'order_type'],
            "edit" => ['order_no', 'order_from', 'out_trade_no', 'order_status', 'member_id', 'ip', 'order_money', 'pay_time', 'close_time', 'log_id', 'order_type']
        ];

}
