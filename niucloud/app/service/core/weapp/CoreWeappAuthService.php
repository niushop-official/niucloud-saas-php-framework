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

namespace app\service\core\weapp;

use app\service\core\wxoplatform\CoreOplatformService;
use core\base\BaseCoreService;
use EasyWeChat\Kernel\Exceptions\DecryptException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;

/**
 * 微信小程序服务提供
 * Class CoreWeappAuthService
 * @package app\service\core\weapp
 */
class CoreWeappAuthService extends BaseCoreService
{

    /**
     * 网页授权
     * @param int $site_id
     * @param string|null $code
     * @return array
     * @throws InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\HttpException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function session(int $site_id, ?string $code)
    {
        $config = ( new CoreWeappConfigService() )->getWeappConfig($site_id);
        if ($config[ 'is_authorization' ]) {
            return CoreOplatformService::codeToSession($site_id, $code);
        } else {
            $utils = CoreWeappService::app($site_id)->getUtils();
            return $utils->codeToSession($code);
        }
    }

    /**
     * 开发者后台校验与解密开放数据
     * @param int $site_id
     * @param string $session
     * @param string $iv
     * @param string $encrypted_data
     * @return array
     * @throws DecryptException
     * @throws InvalidArgumentException
     */
    public function decryptData(int $site_id, string $session, string $iv, string $encrypted_data)
    {
        $utils = CoreWeappService::app($site_id)->getUtils();
        return $utils->decryptSession($session, $iv, $encrypted_data);
    }

    /**
     * 获取用户手机号
     * @param int $site_id
     * @param string $code
     * @return \EasyWeChat\Kernel\HttpClient\Response|\Symfony\Contracts\HttpClient\ResponseInterface
     * @throws InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function getUserPhoneNumber(int $site_id, string $code)
    {
        $api = CoreWeappService::appApiClient($site_id);
        CoreWeappService::refreshToken($site_id); // 为防止多次拒绝手机号的情况，需要刷新token
        return $api->postJson('wxa/business/getuserphonenumber', [
            'code' => (string) $code
        ]);
    }

}
