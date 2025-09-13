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

use app\service\core\channel\CoreAppService;
use app\service\core\wxoplatform\CoreOplatformService;
use core\base\BaseCoreService;
use core\exception\WechatException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use EasyWeChat\OfficialAccount\Application;
use GuzzleHttp\Exception\GuzzleException;

/**
 * 微信服务api提供
 * Class CoreWechatApiService
 * @package app\service\core\wechat
 */
class CoreWechatAppService extends BaseCoreService
{
    /**
     * 获取公众号的handle
     * @param int $site_id
     * @return Application
     * @throws InvalidArgumentException
     */
    public static function app(int $site_id)
    {
        $app_config = (new CoreAppService())->getConfig($site_id);

        if (empty($app_config['wechat_app_id']) || empty($app_config['wechat_app_secret'])) throw new WechatException('WECHAT_NOT_EXIST');//公众号未配置

        $config = array(
            'app_id' => $app_config['wechat_app_id'],
            'secret' => $app_config['wechat_app_secret'],
            'token' => "",
            'aes_key' => 'not_encrypt',
            'http' => [
                'timeout' => 5.0,
                'retry' => true, // 使用默认重试配置
            ]
        );
        return new Application($config);
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
     * 处理授权回调
     * @param int $site_id
     * @param string $code
     * @return UserInterface
     */
    public static function userFromCode(int $site_id, string $code)
    {
        try {
            $oauth = self::app($site_id)->getOauth();
            return $oauth->userFromCode($code);
        } catch (\Exception $e) {
            throw new CommonException($e->getCode() . '：' . $e->getMessage());
        }
    }
}
