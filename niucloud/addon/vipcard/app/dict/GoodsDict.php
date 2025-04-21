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
class GoodsDict
{
    CONST SERVICE = 'service';

    const CARD = 'card';

    const ONCECARD =  'oncecard';

    const TIMECARD =  'timecard';

    const COMMONCARD =  'commoncard';

    const PARMANENT = 0;

    const FIXED_DAYS = 1;

    const FIXED_TIME = 2;

    /**
     * 获取商品类型
     * @param string $type
     * @return array|array[]
     */
    public static function getGoodsType(string $type = '') {
        $goods_type = [
            self::SERVICE => [
                'type' => self::SERVICE,
                'name' => get_lang('dict_goods_type.service')
            ],
            self::CARD => [
                'type' => self::CARD,
                'name' => get_lang('dict_goods_type.card')
            ]
        ];

        if (!$type) return $goods_type;

        return $goods_type[$type];
    }

    /**
     * 获取卡项类型
     * @param string $type
     * @return array|array[]
     */
    public static function getCardType(string $type = '') {
        $card_type = [
            self::ONCECARD => [
                'type' => self::ONCECARD,
                'name' => get_lang('dict_card_type.oncecard'),
                'desc' => get_lang('dict_card_type.oncecard_desc')
            ],
            self::TIMECARD => [
                'type' => self::TIMECARD,
                'name' => get_lang('dict_card_type.timecard'),
                'desc' => get_lang('dict_card_type.timecard_desc')
            ],
            self::COMMONCARD => [
                'type' => self::COMMONCARD,
                'name' => get_lang('dict_card_type.commoncard'),
                'desc' => get_lang('dict_card_type.commoncard_desc')
            ]
        ];

        if (!$type) return $card_type;

        return $card_type[$type];
    }

    /**
     * 获取商品核销有效期类型
     * @param string|int $type
     * @return array|mixed
     */
    public static function getGoodsVerifyValidityType(string | int $type = '') {
        $verify_validity_type = [
            self::PARMANENT => [
                'type' => self::PARMANENT,
                'name' => get_lang('dict_vipcard_verify_validity_type.permanent')
            ],
            self::FIXED_DAYS => [
                'type' => self::FIXED_DAYS,
                'name' => get_lang('dict_vipcard_verify_validity_type.fixed_days')
            ],
            self::FIXED_TIME => [
                'type' => self::FIXED_TIME,
                'name' => get_lang('dict_vipcard_verify_validity_type.fixed_time')
            ]
        ];

        if ($type === '') return $verify_validity_type;

        return $verify_validity_type[$type];

    }
}