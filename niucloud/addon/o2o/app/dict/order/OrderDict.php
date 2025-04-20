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

namespace addon\o2o\app\dict\order;

use app\dict\pay\PayDict;

/**
 * 订单相关字典类
 * Class HotelOrderDict
 * @package app\dict\order
 */
class OrderDict
{
    //订单状态
    //待支付
    const WAIT_PAY = 'wait_pay';
    //待派单
    const DISPATCH = 'dispatch';
    //待服务
    const WAIT_SERVICE = 'wait_service';
    //服务中
    const IN_SERVICE = 'in_service';
    //已完成
    const FINISH = 'finish';
    //已关闭
    const CLOSE = 'close';

    //支付类型
    const ORDER_TYPE_ORDER = 'o2o';
    const ORDER_TYPE_ITEM = 'o2o_item';


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
                'name' => get_lang('dict_o2o_order.order_status_wait_pay'),
                'status' => self::WAIT_PAY,
                'is_refund' => 0,
                'action' => [

                ],
                'technician_action' => [

                ],
                'member_action' => [
                    [
                        'name' => get_lang('dict_o2o_order.action_pay'),
                        'key' => 'pay'
                    ],
                    [
                        'name' => get_lang('dict_o2o_order.action_cancel'),
                        'key' => 'cancel'
                    ]
                ],
            ],
            self::DISPATCH => [
                'name' =>  get_lang('dict_o2o_order.order_status_dispatch'),
                'status' => self::DISPATCH,
                'is_refund' => 1,
                'action' => [

                    [
                        'name' => get_lang('dict_o2o_order.action_dispatch'),
                        'key' => 'action_dispatch'
                    ],
                ],
                'technician_action' => [
                ],
                'member_action' => [
                ],
            ],
            self::WAIT_SERVICE => [
                'name' =>  get_lang('dict_o2o_order.order_status_wait_service'),
                'status' => self::WAIT_SERVICE,
                'is_refund' => 1,
                'action' => [
                    [
                        'name' => get_lang('dict_o2o_order.again_action_dispatch'),
                        'key' => 'action_dispatch'
                    ],
                ],
                'technician_action' => [
                    [
                        'name' => get_lang('dict_o2o_order.transfer_order'),
                        'key' => 'transfer_order'
                    ],
                    [
                        'name' => get_lang('dict_o2o_order.action_start'),
                        'key' => 'start'
                    ]
                ],
                'member_action' => [

                ],
            ],
            self::IN_SERVICE => [
                'name' =>  get_lang('dict_o2o_order.order_status_in_service'),
                'status' => self::IN_SERVICE,
                'is_refund' => 1,
                'action' => [

                ],
                'technician_action' => [
                    [
                        'name' => get_lang('dict_o2o_order.service_pay'),
                        'key' => 'service_pay'
                    ],
                    [
                        'name' => get_lang('dict_o2o_order.finish'),
                        'key' => 'finish'
                    ],
                ],
                'member_action' => [
//                    [
//                        'name' => get_lang('dict_o2o_order.item_pay'),
//                        'key' => 'item_pay'
//                    ],
                ],
            ],
            self::FINISH => [
                'name' =>  get_lang('dict_o2o_order.order_status_finish'),
                'status' => self::FINISH,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [

                ],
            ],
            self::CLOSE => [
                'name' => get_lang('dict_o2o_order.order_status_close'),
                'status' => self::CLOSE,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                    [
                        'name' => get_lang('dict_o2o_order.action_delete'),
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