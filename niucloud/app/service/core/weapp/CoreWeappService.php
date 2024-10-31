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
use core\exception\CommonException;
use core\exception\WechatException;
use EasyWeChat\Kernel\Exceptions\InvalidArgumentException;
use EasyWeChat\MiniApp\Application;


/**
 * easywechat主体提供
 * Class CoreWeappService
 * @package app\service\core\wechat
 */
class CoreWeappService extends BaseCoreService
{
    /**
     * 获取小程序的handle
     * @param int $site_id
     * @return Application
     * @throws InvalidArgumentException
     */
    public static function app(int $site_id)
    {
        $core_weapp_service = new CoreWeappConfigService();
        $weapp_config = $core_weapp_service->getWeappConfig($site_id);

        if ($weapp_config[ 'is_authorization' ]) {
            $authorization_info = $core_weapp_service->getWeappAuthorizationInfo($site_id)[ 'authorization_info' ];
            return CoreOplatformService::app()->getMiniAppWithRefreshToken($weapp_config[ 'app_id' ], $authorization_info[ 'authorizer_refresh_token' ]);
        } else {
            if (empty($weapp_config[ 'app_id' ]) || empty($weapp_config[ 'app_secret' ])) throw new WechatException('WEAPP_NOT_EXIST');//公众号未配置

            $config = array(
                'app_id' => $weapp_config[ 'app_id' ],
                'secret' => $weapp_config[ 'app_secret' ],
                'token' => $weapp_config[ 'token' ],
                'aes_key' => $weapp_config[ 'encryption_type' ] == 'not_encrypt' ? '' : $weapp_config[ 'encoding_aes_key' ],// 明文模式请勿填写 EncodingAESKey
                'http' => [
                    'throw' => true, // 状态码非 200、300 时是否抛出异常，默认为开启
                    'timeout' => 5.0,
                    'retry' => true, // 使用默认重试配置
                ],
            );
            return new Application($config);
        }
    }


    /**
     * 微信小程序实例接口调用
     * @param int $site_id
     * @return \EasyWeChat\Kernel\HttpClient\AccessTokenAwareClient
     * @throws InvalidArgumentException
     */
    public static function appApiClient(int $site_id)
    {
        return self::app($site_id)->getClient();
    }

    /**
     * 刷新token
     * @param int $site_id
     * @return \EasyWeChat\Kernel\HttpClient\AccessTokenAwareClient
     * @throws InvalidArgumentException
     */
    public static function refreshToken(int $site_id)
    {
        $core_weapp_service = new CoreWeappConfigService();
        $weapp_config = $core_weapp_service->getWeappConfig($site_id);

        if (!$weapp_config[ 'is_authorization' ]) {
            self::app($site_id)->getAccessToken()->refresh();
        }
    }

    /**
     * 生成小程序码
     * @param int $site_id
     * @param $page
     * @param $data
     * @param $filepath
     * @param int $width
     * @return mixed
     * @throws InvalidArgumentException
     */
    public function qrcode(int $site_id, $page, $data, $filepath, $width = 430)
    {
        $scene = [];
        foreach ($data as $v) {
            $scene[] = $v[ 'key' ] . '-' . $v[ 'value' ];
        }
        $response = self::appApiClient($site_id)->postJson('/wxa/getwxacodeunlimit', [
            'scene' => implode('&', $scene),
            'page' => $page,
            'width' => $width,
            'check_path' => false,
//            'env_version' => 'trial' // 要打开的小程序版本。正式版为"release"，体验版为"trial"，开发版为"develop"
        ]);
        if ($response->isFailed()) {
            // 出错了，处理异常
            throw new CommonException('WECHAT_MINI_PROGRAM_CODE_GENERATION_FAILED');
        }
        $response->saveAs($filepath);
        return $filepath;
    }

    /**
     * 获取小程序体验码
     * @param $site_id
     * @return void
     */
    public function getWeappPreviewImage($site_id)
    {
        $app = self::appApiClient($site_id);
        $response = $app->get('/wxa/get_qrcode');
        if ($response->isFailed()) {
            // 出错了，处理异常
            throw new CommonException('WECHAT_MINI_PROGRAM_CODE_GENERATION_FAILED');
        }
        $dir = public_path() . "qrcode/{$site_id}/";
        mkdirs_or_notexist($dir);
        $filepath = $dir . time() . '.png';
        file_put_contents($filepath, $response->getContent());
        return $filepath;
    }
}
