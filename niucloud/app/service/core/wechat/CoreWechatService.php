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

namespace app\service\core\wechat;

use app\service\core\wxoplatform\CoreOplatformService;
use core\base\BaseCoreService;
use core\exception\WechatException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\OfficialAccount\Application;

/**
 * easywechat主体提供
 * Class CoreWechatService
 * @package app\service\core\wechat
 */
class CoreWechatService extends BaseCoreService
{
    /**
     * 获取公众号的handle
     * @param int $site_id
     * @return Application
     * @throws InvalidArgumentException
     */
    public static function app(int $site_id)
    {
        $core_wechat_service = new CoreWechatConfigService();
        $wechat_config = $core_wechat_service->getWechatConfig($site_id);

        if ($wechat_config['is_authorization']) {
            $authorization_info = $core_wechat_service->getWechatAuthorizationInfo($site_id)['authorization_info'];
            return CoreOplatformService::app()->getOfficialAccountWithRefreshToken($wechat_config['app_id'], $authorization_info['authorizer_refresh_token']);
        } else {
            if (empty($wechat_config['app_id']) || empty($wechat_config['app_secret'])) throw new WechatException('WECHAT_NOT_EXIST');//公众号未配置

            $config = array(
                'app_id' => $wechat_config['app_id'],
                'secret' => $wechat_config['app_secret'],
                'token' => $wechat_config['token'],
                'aes_key' => $wechat_config['encryption_type'] == 'not_encrypt' ? '' :$wechat_config['encoding_aes_key'],// 明文模式请勿填写 EncodingAESKey
                'http' => [
                    'timeout' => 5.0,
                    'retry' => true, // 使用默认重试配置
                ]
            );
            return new Application($config);
        }
    }

    /**
     * 微信实例接口调用
     * @param int $site_id
     * @return \EasyWeChat\Kernel\HttpClient\AccessTokenAwareClient
     * @throws InvalidArgumentException
     */
    public static function appApiClient(int $site_id)
    {
        return self::app($site_id)->getClient();
    }


    /**
     * 回复文本消息
     * @param string $content 文本内容
     * @return
     */
    public static function text($content)
    {
        return [
            'MsgType' => 'text',
            'Content' => $content,
        ];
    }

    /**
     * 回复图片消息
     * @param string $media_id 媒体资源 ID
     * @return
     */
    public static function image($media_id)
    {
    }

    /**
     * 回复视频消息
     */
    public static function video()
    {
    }

    /**
     * 回复声音消息
     * @return
     */
    public static function music()
    {
        return;
    }

    /**
     * 回复图文消息
     * @param string|array $title 图文消息标题
     * @param string $description 图文消息描述
     * @param string $picurl 图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
     * @param string $url 点击图文消息跳转链接
     */
    public static function news($title, $description = '', $picurl = '', $url = '')
    {
        $message = [
            'MsgType' => 'MsgType',
        ];
        if (is_array($title)) {
            if (isset($title[0]) && is_array($title[0])) {
                $newsList = [];
                foreach ($title as $news) {
                    $newsList[] = self::newsMessage($news);
                }
                return $newsList;
            } else {
                $data = [$title];
            }
        } else {
            $data = [
                [
                    'Title' => $title,
                    'Description' => $description,
                    'PicUrl' => $picurl,
                    'Url' => $url,
                ]
            ];
        }
        $message['MsgType'] = count($data);
        $message['Articles'] = $data;
        return $message;
    }
}
