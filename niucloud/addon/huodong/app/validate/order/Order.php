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

namespace addon\huodong\app\validate\order;
use core\base\BaseValidate;
/**
 * 报名记录验证器
 * Class Order
 * @package addon\huodong\app\validate\order
 */
class Order extends BaseValidate
{

       protected $rule = [
            'order_no' => 'require',
            'order_from' => 'require',
            'out_trade_no' => 'require',
            'order_status' => 'require',
            'refund_status' => 'require',
            'ip' => 'require',
            'order_money' => 'require'
        ];

       protected $message = [
            'order_no.require' => ['common_validate.require', ['order_no']],
            'order_from.require' => ['common_validate.require', ['order_from']],
            'out_trade_no.require' => ['common_validate.require', ['out_trade_no']],
            'order_status.require' => ['common_validate.require', ['order_status']],
            'refund_status.require' => ['common_validate.require', ['refund_status']],
            'ip.require' => ['common_validate.require', ['ip']],
            'order_money.require' => ['common_validate.require', ['order_money']]
        ];

       protected $scene = [
            "add" => ['order_no', 'order_from', 'out_trade_no', 'order_status', 'refund_status', 'ip', 'order_money'],
            "edit" => ['order_no', 'order_from', 'out_trade_no', 'order_status', 'refund_status', 'ip', 'order_money']
        ];

}
