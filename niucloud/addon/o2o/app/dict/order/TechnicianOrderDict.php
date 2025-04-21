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

/**
 * 订单相关字典类
 * Class HotelOrderDict
 * @package app\dict\order
 */
class TechnicianOrderDict
{
    //订单状态

    //待服务
    const WAIT_SERVICE = 'wait_service';
    //服务中
    const IN_SERVICE = 'in_service';
    //已完成
    const FINISH = 'finish';
    //已关闭
    const CLOSE = 'close';


    public static function getStatus($status = '')
    {
        $data = [

            self::WAIT_SERVICE => [
                'name' =>  get_lang('dict_o2o_order.order_status_wait_service'),
                'status' => self::WAIT_SERVICE,
                'is_refund' => 1,
                'action' => [],
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
                'action' => [],
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
                    [
                        'name' => get_lang('dict_o2o_order.item_pay'),
                        'key' => 'item_pay'
                    ],
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
