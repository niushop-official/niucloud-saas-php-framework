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

namespace addon\shop_giftcard\app\dict\giftcard;

class GiftcardDict
{
    // 礼品卡类型

    // 电子卡
    const VIRTUAL = 'virtual';

    // 实体卡
    const REAL = 'real';

    // 有效期

    // 永久有效
    const FOREVER = 'forever';

    // 购买后x天有效
    const DAY = 'day';

    // 指定过期日期
    const DATE = 'date';

    // 权益类型：储值卡
    const cardRightTypeBalance = 'balance';

    // 权益类型：兑换卡
    const cardRightTypeGoods = 'goods';

    //提货方式：全部提货
    const ALL = 'all';

    //提货方式：分批提货
    const BATCH = 'batch';

    //礼品卡权益商品类型：全部
    const ALL_GOODS = 'all';

    //礼品卡权益商品类型：指定商品数量
    const DIY = 'diy';

    //礼品卡状态
    // 启用
    const ON = 1;
    // 关闭
    const OFF = 0;

    /**
     * 礼品卡类型
     * @param $type
     * @return array|mixed|string
     */
    public static function getType($type = '')
    {
        $list = [
            self::VIRTUAL => [
                'type' => self::VIRTUAL,
                'name' => get_lang('dict_shop_giftcard.virtual'),
                'desc' => get_lang('dict_shop_giftcard.virtual_desc'),
                'sort' => 1
            ],
            self::REAL => [
                'type' => self::REAL,
                'name' => get_lang('dict_shop_giftcard.real'),
                'desc' => get_lang('dict_shop_giftcard.real_desc'),
                'sort' => 2
            ]
        ];
        if ($type == '') {
            array_multisort(array_column($list, "sort"), SORT_ASC, $list);
            return $list;
        }
        return $list[ $type ];
    }

    /**
     * 礼品卡权益类型
     * @param $type
     * @return array|mixed|string
     */
    public static function getCardRightType($type = '')
    {
        $list = [
            self::cardRightTypeBalance => [
                'type' => self::cardRightTypeBalance,
                'name' => get_lang('dict_shop_giftcard_card_right.balance'),
                'sort' => 1
            ],
            self::cardRightTypeGoods => [
                'type' => self::cardRightTypeGoods,
                'name' => get_lang('dict_shop_giftcard_card_right.goods'),
                'sort' => 2
            ]
        ];
        if ($type == '') {
            array_multisort(array_column($list, "sort"), SORT_ASC, $list);
            return $list;
        }
        return $list[ $type ];
    }
}
