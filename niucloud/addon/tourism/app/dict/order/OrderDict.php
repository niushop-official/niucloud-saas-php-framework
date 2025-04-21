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

namespace addon\tourism\app\dict\order;

use app\dict\pay\PayDict;

/**
 * 旅游订单相关字典类
 * Class HotelOrderDict
 * @package app\dict\order
 */
class OrderDict
{
    //订单状态
    //待支付
    const WAIT_PAY = 0;
    const WAIT_USE = 1;
    //已完成
    const FINISH = 10;
    //已关闭
    const CLOSE = -1;

    /**
     * 当前订单支持的支付方式
     */
    const ALLOW_PAY = [
        PayDict::WECHATPAY,
        PayDict::ALIPAY,
        PayDict::BALANCEPAY
    ];

    public static function getStatus($status = '')
    {
        $data = [
            self::WAIT_PAY => [
                'name' => get_lang('dict_tourism_order.order_status_wait_pay'),
                'status' => self::WAIT_PAY,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                    [
                        'name' => get_lang('dict_tourism_order.action_pay'),
                        'key' => 'pay'
                    ],
                    [
                        'name' => get_lang('dict_tourism_order.action_cancel'),
                        'key' => 'cancel'
                    ]
                ],
            ],
            self::WAIT_USE => [
                'name' =>  get_lang('dict_tourism_order.order_status_wait_use'),
                'status' => self::WAIT_USE,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                ],
            ],
            self::FINISH => [
                'name' =>  get_lang('dict_tourism_order.order_status_finish'),
                'status' => self::FINISH,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                ],
            ],
            self::CLOSE => [
                'name' => get_lang('dict_tourism_order.order_status_close'),
                'status' => self::CLOSE,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                    [
                        'name' => get_lang('dict_tourism_order.action_delete'),
                        'key' => 'delete'
                    ]
                ]
            ]
        ];

        if ($status == '') {
            return $data;
        }
        return $data[ $status ] ?? '';
    }
}