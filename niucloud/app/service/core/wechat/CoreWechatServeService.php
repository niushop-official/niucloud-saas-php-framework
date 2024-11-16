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

use core\base\BaseCoreService;
use core\exception\CommonException;
use EasyWeChat\Kernel\Exceptions\BadRequestException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\Kernel\Exceptions\InvalidConfigException;
use Overtrue\Socialite\Contracts\UserInterface;
use ReflectionException;
use Symfony\Component\HttpFoundation\Response;

/**
 * 微信服务提供
 * Class CoreWechatServeService
 * @package app\service\core\wechat
 */
class CoreWechatServeService extends BaseCoreService
{


    /**
     * 网页授权
     * @param int $site_id
     * @param string $url
     * @param string $scopes
     * @return string
     */
    public function authorization(int $site_id, string $url = '', string $scopes = 'snsapi_base')
    {
        $oauth = CoreWechatService::app($site_id)->getOauth();
        return $oauth->scopes([ $scopes ])->redirect($url);
    }

    /**
     * 处理授权回调
     * @param int $site_id
     * @param string $code
     * @return UserInterface
     */
    public function userFromCode(int $site_id, string $code)
    {
        try {
            $oauth = CoreWechatService::app($site_id)->getOauth();
            return $oauth->userFromCode($code);
        } catch (\Exception $e) {
            throw new CommonException($e->getCode() . '：' . $e->getMessage());
        }
    }

    public function getUser($user)
    {
        $user->getId(); //对应微信的 openid
        $user->getNickname(); //对应微信的 nickname
        $user->getName(); //对应微信的 nickname
        $user->getAvatar(); //头像地址
        $user->getRaw(); //原始 API 返回的结果
        $user->getAccessToken(); //access_token
        $user->getRefreshToken(); //refresh_token
        $user->getExpiresIn(); //expires_in，Access Token 过期时间
        $user->getTokenResponse(); //返回 access_token 时的响应值
        //user中没有openid,  可以用id取
        return $user;
    }

    /**
     * 事件推送
     * @param int $site_id
     * @return Response
     * @throws BadRequestException
     * @throws InvalidArgumentException
     * @throws ReflectionException
     * @throws InvalidConfigException
     */
    public function serve(int $site_id)
    {

        $app = CoreWechatService::app($site_id);
        $server = $app->getServer();
        $server->with(function($message, \Closure $next) use ($site_id) {
            // 你的自定义逻辑
            return ( new CoreWechatMessageService )->message($site_id, $message);
        });
        $response = $server->serve();
        return $response;

    }

    /**
     * 配置 生成 JS-SDK 签名
     * @param int $site_id
     * @param string $url
     * @return mixed[]
     * @throws InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\HttpException
     * @throws \Psr\SimpleCache\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function jssdkConfig(int $site_id, string $url = '')
    {
        $utils = CoreWechatService::app($site_id)->getUtils();
        return $utils->buildJsSdkConfig(
            url: $url,
            jsApiList: [],
            openTagList: [],
            debug: false,
        );
    }

    /**
     * 生成临时二维码
     * @param int $site_id
     * @param string $key
     * @param int $expire_seconds
     * @param $params
     * @return \EasyWeChat\Kernel\HttpClient\Response|\Symfony\Contracts\HttpClient\ResponseInterface
     * @throws InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function scan(int $site_id, string $key, int $expire_seconds = 6 * 24 * 3600, $params = [])
    {
        $api = CoreWechatService::appApiClient($site_id);
        if (is_int($key) && $key > 0) {
            $type = 'QR_SCENE';
            $sceneKey = 'scene_id';
        } else {
            $type = 'QR_STR_SCENE';
            $sceneKey = 'scene_str';
        }
        $scene = [ $sceneKey => $key ];
        $param = [
            'expire_seconds' => $expire_seconds,
            'action_name' => $type,
            'action_info' => [
                'scene' => $scene
            ],
        ];
        return $api->postJson('cgi-bin/qrcode/create', $param);
    }
}
