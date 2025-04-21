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


/**
 *订单批量操作相关枚举类
 */
class OrderBatchDeliveryDict
{
    //批量发货
    const DELIVERY = 'delivery';
    //同城

    /**
     * 获取操作类型
     * @param string $type
     * @return array|array[]|string
     */
    public static function getType(string $type = '')
    {
        $data = [];
        $data[ self::DELIVERY ] = get_lang('dict_shop_batch_delivery_type.delivery');
        if ($type == '') {
            return $data;
        }
        return $data[ $type ] ?? '';
    }


    const PROCESSING = '1';
    const FINISH = '2';
    const FAIL = '3';

    /**
     * 操作状态(订单项)
     * @param string $status
     * @return array|mixed|string
     */
    public static function getStatus(string $status = '')
    {
        $data = [
            self::PROCESSING => get_lang('dict_shop_batch_delivery_status.processing'),
            self::FINISH => get_lang('dict_shop_batch_delivery_status.finish'),
            self::FAIL => get_lang('dict_shop_batch_delivery_status.fail'),
        ];

        if ($status == '') {
            return $data;
        }
        return $data[ $status ] ?? '';
    }

}
