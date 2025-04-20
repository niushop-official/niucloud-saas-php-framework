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
 * 订单项类型字典类
 * Class HotelOrderDict
 * @package app\dict\order
 */
class OrderItemType
{
    ///预约
    const RESERVATION = 'reservation';

    ///一口价
    const BUY = 'buy';

    //custom
    const CUSTOM = 'custom';

    /**
     * 状态
     */
    public static function getStatus($status = ''){
        $data = [
            self::RESERVATION => [
                "status" => self::RESERVATION,
                "name"   => "预约"
            ],
            self::BUY => [
                "status" => self::BUY,
                "name"   => "一口价"
            ],
            self::CUSTOM => [
                "status" => self::CUSTOM,
                "name"   => "师傅报单"
            ],
        ];
        return $data;
    }
}