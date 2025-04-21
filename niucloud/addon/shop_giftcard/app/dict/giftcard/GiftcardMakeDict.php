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
 * 实体礼品卡制卡
 * Class GiftcardMakeDict
 * @package addon\shop_giftcard\app\dict\giftcard
 */
class GiftcardMakeDict
{
    // 在线制卡
    const AUTO = 'auto';

    // 导入
    const IMPORT = 'import';


    // 状态
    // 未开始
    const STATUS_WAIT = 'wait';

    // 进行中
    const STATUS_PROCEED = 'proceed';

    // 完成
    const STATUS_FINISH = 'finish';

    // 失败
    const STATUS_FAIL = 'fail';

    /**
     * 获取状态
     * @param $status
     * @return array|mixed|string
     */
    public static function getStatusList($status)
    {
        $data = [
            self::STATUS_WAIT => get_lang('dict_shop_giftcard_card_make.status_wait'),
            self::STATUS_PROCEED => get_lang('dict_shop_giftcard_card_make.status_proceed'),
            self::STATUS_FINISH => get_lang('dict_shop_giftcard_card_make.status_finish'),
            self::STATUS_FAIL => get_lang('dict_shop_giftcard_card_make.status_fail')
        ];
        if ($status == '') {
            return $data;
        }
        return $data[ $status ] ?? '';
    }

    /**
     * 获取制卡方式
     * @param $status
     * @return array|mixed|string
     */
    public static function getMakeCardWayList($status)
    {
        $data = [
            self::AUTO => get_lang('dict_shop_giftcard_card_make.auto'),
            self::IMPORT => get_lang('dict_shop_giftcard_card_make.import')
        ];
        if ($status == '') {
            return $data;
        }
        return $data[ $status ] ?? '';
    }
}
