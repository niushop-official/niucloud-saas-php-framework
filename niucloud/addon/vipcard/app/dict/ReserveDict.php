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

namespace addon\vipcard\app\dict;

/**
 * 卡项相关字典类
 * Class HotelOrderDict
 * @package app\dict\order
 */
class ReserveDict
{
    const REMOVE = -1;

    const TREAT_TO_STORE = 1;

    const TO_STORE = 2;

    const COMOLETE = 3;

    const TO_BE_CONFIRMED = 4;

    /**
     * 获取卡项类型
     * @param string $type
     * @return array|array[]
     */
    public static function getStatus(string $type = '') {
        $status = [
            self::REMOVE => [
                'status' => self::REMOVE,
                'name' => get_lang('dict_vipcard_reserve_status_name.remove'),
            ],
            self::TREAT_TO_STORE => [
                'status' => self::TREAT_TO_STORE,
                'name' => get_lang('dict_vipcard_reserve_status_name.treat_to_store'),
            ],
            self::TO_STORE => [
                'status' => self::TO_STORE,
                'name' => get_lang('dict_vipcard_reserve_status_name.to_store'),
            ],
            self::COMOLETE => [
                'status' => self::COMOLETE,
                'name' => get_lang('dict_vipcard_reserve_status_name.comolete'),
            ],
            self::TO_BE_CONFIRMED => [
                'status' => self::TO_BE_CONFIRMED,
                'name' => get_lang('dict_vipcard_reserve_status_name.treat_confury'),
            ]
        ];

        if (!$type) return $status;

        return $status[$type];
    }

}