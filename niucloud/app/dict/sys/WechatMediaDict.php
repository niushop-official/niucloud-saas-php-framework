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

namespace app\dict\sys;

class WechatMediaDict
{
    public const IMAGE = 'image';
    public const VOICE = 'voice';
    public const VIDEO = 'video';
    public const NEWS = 'news';
    /**
     * 获取状态
     * @return array
     */
    public static function getTypeList()
    {
        return [
            self::IMAGE => get_lang('dict_wechat_media.type_image'),
            self::VOICE => get_lang('dict_wechat_media.type_voice'),
            self::VIDEO => get_lang('dict_wechat_media.type_video'),
            self::NEWS => get_lang('dict_wechat_media.type_news')
        ];
    }

}
