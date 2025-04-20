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

namespace addon\shop_giftcard\app\dict\card;

use addon\shop_giftcard\app\dict\giftcard\GiftcardDict;

class CardDict
{
    // 卡来源
    // 购买
    const ORDER = 'order';

    // 别人赠送
    const GIVE = 'give';

    // 系统生成
    const GENERATE = 'generate';

    // 激活
    const ACTIVATE = 'activate';

    //卡状态
    // 待激活
    const TO_ACTIVATE = 'to_activate';

    // 待使用
    const TO_USE = 'to_use';

    // 可使用
    const CAN_USE = 'can_use';

    // 已使用
    const USED = 'used';

    // 已失效
    const INVALID = 'invalid';

    /**
     * 获取卡的状态（查询字段转换用）
     * @param string $status
     * @return array|mixed
     */
    public static function getStatusList($status = '')
    {
        $list = [
            self::TO_USE => get_lang('dict_shop_giftcard_card.to_use'),
            self::CAN_USE => get_lang('dict_shop_giftcard_card.can_use'),
            self::USED => get_lang('dict_shop_giftcard_card.used'),
            self::TO_ACTIVATE => get_lang('dict_shop_giftcard_card.to_activate'),
            self::INVALID => get_lang('dict_shop_giftcard_card.invalid')
        ];
        if ($status == '') return $list;

        return $list[ $status ];
    }

    /**
     * 获取卡的状态（后台用）
     * @param string $card_type
     * @return array|mixed
     */
    public static function getStatusListByType($card_type = '')
    {
        $list = [
            // 电子卡
            GiftcardDict::VIRTUAL => [
                GiftcardDict::cardRightTypeBalance => [
                    self::TO_USE => get_lang('dict_shop_giftcard_card.to_use'),
                    self::USED => get_lang('dict_shop_giftcard_card.used'),
                    self::INVALID => get_lang('dict_shop_giftcard_card.invalid')
                ],
                GiftcardDict::cardRightTypeGoods => [
                    self::TO_USE => get_lang('dict_shop_giftcard_card.to_use'),
                    self::CAN_USE => get_lang('dict_shop_giftcard_card.can_use'),
                    self::USED => get_lang('dict_shop_giftcard_card.used'),
                    self::INVALID => get_lang('dict_shop_giftcard_card.invalid')
                ]
            ],
            // 实体卡
            GiftcardDict::REAL => [
                GiftcardDict::cardRightTypeBalance => [
                    self::TO_ACTIVATE => get_lang('dict_shop_giftcard_card.to_activate'),
                    self::TO_USE => get_lang('dict_shop_giftcard_card.to_use'),
                    self::USED => get_lang('dict_shop_giftcard_card.used'),
                    self::INVALID => get_lang('dict_shop_giftcard_card.invalid')
                ],
                GiftcardDict::cardRightTypeGoods => [
                    self::TO_ACTIVATE => get_lang('dict_shop_giftcard_card.to_activate'),
                    self::TO_USE => get_lang('dict_shop_giftcard_card.to_use'),
                    self::CAN_USE => get_lang('dict_shop_giftcard_card.can_use'),
                    self::USED => get_lang('dict_shop_giftcard_card.used'),
                    self::INVALID => get_lang('dict_shop_giftcard_card.invalid')
                ]
            ]
        ];

        if (!empty($card_type)) {
            return $list[ $card_type ];
        }

        return $list;
    }


    /**
     * 获取卡的状态（前端用）
     * @param string $status
     * @return array|mixed
     */
    public static function getStatusListByWap($status = '')
    {
        $list = [
            self::TO_USE => get_lang('dict_shop_giftcard_card.to_use'),
            self::CAN_USE => get_lang('dict_shop_giftcard_card.can_use'),
            self::USED => get_lang('dict_shop_giftcard_card.used'),
            self::INVALID => get_lang('dict_shop_giftcard_card.invalid')
        ];
        if ($status == '') return $list;

        return $list[ $status ];
    }

    /**
     * 获取卡的来源列表
     * @param $source
     * @return array|mixed
     */
    public static function getSourceList($source = '')
    {
        $list = [
            self::ORDER => get_lang('dict_shop_giftcard_card.order'),
            self::GIVE => get_lang('dict_shop_giftcard_card.give'),
            self::GENERATE => get_lang('dict_shop_giftcard_card.generate'),
            self::ACTIVATE => get_lang('dict_shop_giftcard_card.activate'),
        ];

        if ($source == '') return $list;
        return $list[ $source ];
    }
}
