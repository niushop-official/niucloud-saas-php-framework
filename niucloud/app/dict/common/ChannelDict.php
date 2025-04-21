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

namespace app\dict\common;


/**
 * 渠道枚举类
 * Class ChannelDict
 * @package app\dict\common
 */
class ChannelDict
{
    //电脑端PC
    public const PC = 'pc';
    //手机端H5
    public const H5 = 'h5';
    //app端
    public const APP = 'app';
    //微信公众号
    public const WECHAT = 'wechat';
    //微信小程序
    public const WEAPP = 'weapp';

    public static function getType($type = '')
    {
        $data = [
            self::PC => get_lang('dict_channel.channel_pc'),//'电脑PC'
            self::H5 => get_lang('dict_channel.channel_h5'),//'手机H5'
            self::APP => get_lang('dict_channel.channel_app'),//'手机app'
            self::WECHAT => get_lang('dict_channel.channel_wechat'),//'微信公众号'
            self::WEAPP => get_lang('dict_channel.channel_weapp'),//微信小程序
        ];
        if (empty($type)) {
            return $data;
        }
        return $data[$type] ?? '';
    }
}
