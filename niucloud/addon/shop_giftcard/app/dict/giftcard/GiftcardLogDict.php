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


/**
 * 礼品卡操作日志枚举类
 */
class GiftcardLogDict
{
    const CARD_MAKE_ACTION = 'card_make'; // 制卡
    const CARD_BUY_ACTION = 'card_buy'; // 购卡
    const CARD_USE_ACTION = 'card_use'; // 使用卡
    const CARD_ACTIVE_ACTION = 'card_active'; // 激活卡
    const CARD_GIVE_ACTION = 'card_give'; // 赠送卡
    const CARD_EXPIRE_ACTION = 'card_expire'; // 卡到期
    const CARD_DELETE_ACTION = 'card_delete'; // 删除卡
    const CARD_REFUND_ACTION = 'card_refund'; // 卡退款

    /**
     * 获取操作类型
     * @param string $type
     * @return array|mixed|string
     */
    public static function getActionType(string $type = '')
    {
        $data = [
            self::CARD_MAKE_ACTION => get_lang('dict_shop_giftcard_log.card_make_action'),
            self::CARD_BUY_ACTION => get_lang('dict_shop_giftcard_log.card_buy_action'),
            self::CARD_USE_ACTION => get_lang('dict_shop_giftcard_log.card_use_action'),
            self::CARD_ACTIVE_ACTION => get_lang('dict_shop_giftcard_log.card_active_action'),
            self::CARD_GIVE_ACTION => get_lang('dict_shop_giftcard_log.card_give_action'),
            self::CARD_EXPIRE_ACTION => get_lang('dict_shop_giftcard_log.card_expire_action'),
            self::CARD_DELETE_ACTION => get_lang('dict_shop_giftcard_log.card_delete_action'),
            self::CARD_REFUND_ACTION => get_lang('dict_shop_giftcard_log.card_refund_action'),
        ];
        if (!$type) {
            return $data;
        }
        return $data[ $type ] ?? '';
    }

}
