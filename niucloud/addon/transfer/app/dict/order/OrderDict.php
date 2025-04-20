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

namespace addon\transfer\app\dict\order;

use app\dict\pay\PayDict;

/**
 */
class OrderDict
{
    //订单状态
    //待支付
    const WAIT_PAY = 1;
    //已完成
    const FINISH = 2;
    //已关闭
    const CLOSE = -1;

    // 退款相关状态
    // 未申请
    const NOT_APPLAY = 0;
    // 退款中
    const REFUNDING = 1;
    // 退款完成
    const REFUND_COMPLETED = 2;
    // 退款失败
    const REFUND_FAIL = -1;

    /**
     * 当前订单支持的支付方式
     */
    const ALLOW_PAY = [
        PayDict::WECHATPAY,
        PayDict::ALIPAY,
        PayDict::OFFLINEPAY,
    ];


    public static function getStatus($status = '')
    {
        $data = [

            self::WAIT_PAY => [
                'name' => '待支付',
                'status' => self::WAIT_PAY,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                    [
                        'name' => '立即支付',
                        'class' => '',
                        'op' => 'pay'
                    ],
                    [
                        'name' => '取消',
                        'class' => 'warning',
                        'op' => 'cancel',
                        'color'=>'#999'
                    ],
                ],
            ],
            self::FINISH => [
                'name' => '已完成',
                'status' => self::FINISH,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                ],
            ],
            self::CLOSE => [
                'name' => '已关闭',
                'status' => self::CLOSE,
                'is_refund' => 0,
                'action' => [],
                'member_action' => [
                ],
            ]

        ];
        if ($status == '') {
            return $data;
        }
        return $data[$status] ?? '';
    }


}
