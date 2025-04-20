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

namespace addon\shop_giftcard\app\dict\order;

/**
 * 订单相关枚举类
 */
class OrderDict
{
    // 订单状态
    // 待支付
    const WAIT_PAY = 1;

    // 已完成
    const FINISH = 2;

    // 已关闭
    const CLOSE = -1;

    // 业务类型
    const TYPE = 'giftcard';

    public static function getStatus($status = '')
    {
        $data = [
            self::WAIT_PAY => [
                'name' => get_lang('dict_shop_giftcard_order.status_wait_pay'), // 待支付
                'status' => self::WAIT_PAY,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [],
            ],
            self::FINISH => [
                'name' => get_lang('dict_shop_giftcard_order.status_finish'), // 已完成
                'status' => self::FINISH,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [],
            ],
            self::CLOSE => [
                'name' => get_lang('dict_shop_giftcard_order.status_close'), // 已关闭
                'status' => self::CLOSE,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [],
            ]

        ];
        if ($status == '') {
            return $data;
        }
        return $data[ $status ] ?? '';
    }

}
