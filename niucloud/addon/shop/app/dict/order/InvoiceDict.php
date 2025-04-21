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

use app\dict\pay\PayDict;

/**
 * 订单相关枚举类
 */
class InvoiceDict
{
    //个人
    const PERSON = 1;

    //公司
    const COMPANY = 2;

    /**
     * 当前订单支持的支付方式
     */
    const ALLOW_PAY = [
        PayDict::WECHATPAY,
        PayDict::ALIPAY,
        PayDict::OFFLINEPAY,
    ];

    const TYPE = 'shop';

    //普票
    const COMMON = '1';
    //专票
    const SPECIAL = '2';

    //未生效
    const WAIT_OPEN = 1;
    //已生效
    const OPEN = 2;

    //未开票
    const WAIT_INVOICE = 0;
    //已开票
    const INVOICED = 1;

    /**
     * 发票抬头类型
     * @return array
     */
    public static function getHeaderType()
    {
        return [
            self::COMPANY => get_lang('dict_shop_invoice.header_type_company'),
            self::PERSON => get_lang('dict_shop_invoice.header_type_person'),
        ];
    }

    public static function getType()
    {
        return [
            self::COMMON => get_lang('dict_shop_invoice.common'),
            self::SPECIAL => get_lang('dict_shop_invoice.sprcial'),
        ];
    }

    public static function getStatus()
    {
        return [
            self::WAIT_OPEN => get_lang('dict_shop_invoice.wait_open'),
            self::OPEN => get_lang('dict_shop_invoice.open'),
        ];
    }

    public static function getIsInvoice()
    {
        return [
            self::WAIT_INVOICE => get_lang('dict_shop_invoice.wait_invoice'),
            self::INVOICED => get_lang('dict_shop_invoice.invoiced'),
        ];
    }

}
