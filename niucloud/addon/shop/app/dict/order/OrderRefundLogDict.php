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
 * 订单日志枚举类
 */
class OrderRefundLogDict
{

    const STORE = 'store';
    const MEMBER = 'member';
    const SYSTEM = 'system';


    /**
     * 获取操作人类型
     * @param string $type
     * @return array|array[]|string
     */
    public static function getMainType(string $type = '')
    {
        $data = [
            self::STORE => get_lang('dict_shop_order_log.store'),//商家
            self::MEMBER => get_lang('dict_shop_order_log.member'),//会员
            self::SYSTEM => get_lang('dict_shop_order_log.system'),//系统
        ];
        if (!$type) {
            return $data;
        }
        return $data[$type] ?? '';
    }

}
