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
 * 订单相关枚举类
 */
class OrderGoodsDict
{


    // 退款相关状态
    // 没有退款
    const NORMAL = 1;
    // 退款中
    const REFUNDING = 2;
    // 退款完成
    const REFUND_FINISH = 3;
    // 退款失败
//    const REFUND_FAIL = -1;
    // 部分退款
    const PARTIAL_REFUND = -2;
    /**
     * 获取退款状态
     * @param string $status
     * @return array|array[]|string
     */
    public static function getRefundStatus(string $status = '')
    {
        $data = [
            self::NORMAL => get_lang('dict_shop_order_refund.normal'),
            self::REFUNDING => get_lang('dict_shop_order_refund.refunding'),
            self::REFUND_FINISH => get_lang('dict_shop_order_refund.refund_finish'),
        ];
        if ($status == '') {
            return $data;
        }
        return $data[$status] ?? '';
    }


}
