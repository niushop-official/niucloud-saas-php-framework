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

namespace addon\shop\app\dict\order;


use addon\shop\app\dict\delivery\DeliveryDict;

/**
 *订单配送相关枚举类
 */
class OrderDeliveryDict
{
    //订单状态
    //快递
    const EXPRESS = 'express';
    //同城
    const LOCAL_DELIVERY = 'local_delivery';
    //自提
    const STORE = 'store';
    //无需快递
    const NONE_EXPRESS = 'none_express';
    //虚拟发货
    const VIRTUAL = 'virtual';


    /**
     * 获取配送方式(用于订单)
     * @param string $type
     * @return array|array[]|string
     */
    public static function getType(string $type = '')
    {
        $data = DeliveryDict::getType();
        $data[self::VIRTUAL] = get_lang('dict_shop_delivery_type.virtual');
        if ($type == '') {
            return $data;
        }
        return $data[$type] ?? '';
    }
    //已收货

    /**
     * 配送子级配送方式
     * @param string $type
     * @return array|array[]|string
     */
    public static function getChildType(string $type = '')
    {
        $data = [
            DeliveryDict::EXPRESS => [
                self::EXPRESS => get_lang('dict_shop_delivery_type.express'),
                self::NONE_EXPRESS => get_lang('dict_shop_delivery_type.none_express')
            ],
            DeliveryDict::LOCAL_DELIVERY => [
                self::LOCAL_DELIVERY => get_lang('dict_shop_delivery_type.local_delivery')
            ],
            DeliveryDict::STORE => [
                self::STORE => get_lang('dict_shop_delivery_type.store')
            ],
            self::VIRTUAL => [
                self::VIRTUAL => get_lang('dict_shop_delivery_type.virtual'),
            ],
        ];

        if ($type == '') {
            return $data;
        }
        return $data[$type] ?? '';
    }

    const WAIT_DELIVERY = 'wait_delivery';
    const DELIVERYING = 'delivery';
    const DELIVERY_FINISH = 'delivery_finish';
    const TAKED = 'taked';

    const EXPIRE = 'expire';//失效
    /**
     * 配送状态(订单项)
     * @param string $status
     * @return array|mixed|string
     */
    public static function getStatus(string $status = '')
    {
        $data = [
            self::WAIT_DELIVERY => get_lang('dict_shop_delivery_status.wait_delivery'),
            self::DELIVERYING => get_lang('dict_shop_delivery_status.delivery'),
            self::DELIVERY_FINISH => get_lang('dict_shop_delivery_status.delivery_finish'),
            self::TAKED => get_lang('dict_shop_delivery_status.taked'),
        ];

        if ($status == '') {
            return $data;
        }
        return $data[$status] ?? '';
    }

}
