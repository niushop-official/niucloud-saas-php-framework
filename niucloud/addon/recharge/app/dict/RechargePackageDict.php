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

namespace addon\recharge\app\dict;


/**
 * 充值套餐相关枚举类
 * Class RechargePackageDict
 * @package app\dict\order
 */
class RechargePackageDict
{
    //开启
    const ON = 1;
    //关闭
    const OFF = 0;

    /**
     * 状态
     * @param $type
     * @return array|mixed|string
     */
    public static function getStatus($type = '')
    {
        $data = [
            self::ON => get_lang('dict_recharge_package_status.on'), // 开启
            self::OFF => get_lang('dict_recharge_package_status.off'), // 关闭
        ];
        if (!$type) {
            return $data;
        }
        return $data[ $type ] ?? '';
    }

}
