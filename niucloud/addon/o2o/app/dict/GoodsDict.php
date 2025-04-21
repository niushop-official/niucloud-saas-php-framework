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

namespace addon\o2o\app\dict;

/**
 * 商品项目相关字典类
 * Class HotelOrderDict
 * @package app\dict\order
 */
class GoodsDict
{
    ///上架
    const UP = 1;
    //下架
    const DOWN = 0;

    //购买类型

    const RESERVATION = 'reservation'; //预约
    const BUY = 'buy'; //购买

    /**
     * 状态
     */
    public static function getStatus($status = ''){
        $data = [
            self::UP => [
                "status" => self::UP,
                "name"   => "已上架"
            ],
            self::DOWN => [
                "status" => self::DOWN,
                "name"   => "已下架"
            ],
        ];
        return $data;
    }


    /**
     * 类型
     */
    public static function getBuyType($status = ''){
        $data = [
            self::RESERVATION => [
                "status" => self::RESERVATION,
                "name"   => "预约"
            ],
            self::BUY => [
                "status" => self::BUY,
                "name"   => "一口价"
            ]
        ];
        if($status) return $data[$status] ?? [];
        return $data;
    }
}