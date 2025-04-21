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

namespace addon\vipcard\app\dict\order;

/**
 * 订单维权日志相关字典类
 * Class HotelOrderDict
 * @package app\dict\order
 */
class OrderRefundLogDict
{
    const APPLY = 'apply';

    const AGREE = 'agree';

    const REFUSE = 'refuse';

    const REFUND = 'refund';
    const CANCEL = 'cancel';

    const COMPLETE = 'completed';

    public static function getLogAction(string $action) {
        $actions = [
            self::APPLY => get_lang('dict_vipcard_order_refund_log.apply'),
            self::AGREE => get_lang('dict_vipcard_order_refund_log.agree'),
            self::REFUSE => get_lang('dict_vipcard_order_refund_log.refuse'),
            self::CANCEL => get_lang('dict_vipcard_order_refund_log.cancel'),
            self::COMPLETE => get_lang('dict_vipcard_order_refund_log.completed'),
            self::REFUND => get_lang('dict_vipcard_order_refund_log.refund')
        ];
        return $actions[ $action ] ?? '';
    }
}
