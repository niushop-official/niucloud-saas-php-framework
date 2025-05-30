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

namespace app\service\core\wxoplatform;

use app\dict\sys\ConfigKeyDict;
use app\model\sys\SysConfig;
use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\weapp\CoreWeappService;
use core\base\BaseCoreService;
use core\exception\CommonException;
use EasyWeChat\OpenPlatform\Application;

/**
 * 微信配置模型
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class CoreOplatformService extends BaseCoreService
{
    /**
     * 获取微信开放平台工具类
     * @param int $site_id
     * @return Application
     * @throws InvalidArgumentException
     */
    public static function app()
    {
        $core_wechat_service = new CoreOplatformConfigService();
        $oplatform_config = $core_wechat_service->getConfig();
        if (empty($oplatform_config['app_id']) || empty($oplatform_config['app_secret'])) throw new CommonException('WECHAT_OPLATFORM_NOT_EXIST');//公众号未配置

        $config = array(
            'app_id' => $oplatform_config['app_id'],
            'secret' => $oplatform_config['app_secret'],
            'token' => $oplatform_config['token'],
            'aes_key' => $oplatform_config['aes_key'],// 明文模式请勿填写 EncodingAESKey
            'http' => [
                'timeout' => 5.0,
                'retry' => true, // 使用默认重试配置
            ]
        );
        return new Application($config);
    }

    public static function codeToSession($site_id, $js_code) {
        $app = self::app();
        $weapp_config = (new CoreWeappConfigService())->getWeappAuthorizationInfo($site_id);

        return $app->getClient()->get('sns/component/jscode2session', [
            'appid' => $weapp_config['authorization_info']['authorizer_appid'],
            'js_code' => $js_code,
            'grant_type' => $weapp_config['authorization_info']['auth_code'],
            'component_access_token' => $app->getComponentAccessToken(),
            'component_appid' => $app->getAccount()->getAppId()
        ])->toArray(false);
    }

    /**
     * 获取站点id
     * @param string $app_id
     * @return int|mixed
     */
    public static function getSiteIdByAuthorizerAppid(string $app_id) {
        $data = (new SysConfig())->where([ ['value', 'like', "%{$app_id}%"], ['config_key', 'in', [ConfigKeyDict::WEAPP, ConfigKeyDict::WECHAT] ] ])->field('site_id')->findOrEmpty()->toArray();
        return $data['site_id'] ?? 0;
    }

    /**
     * @param $app
     * @param $authorizer_appid
     * @return mixed
     */
    public static function getAuthorizerInfo($app, $authorizer_appid) {
        $api = $app->getClient();

        $response = $api->post('/cgi-bin/component/api_get_authorizer_info', [
            'json' => [
                "component_appid" => $app->getAccount()->getAppId(),
                "authorizer_appid" => $authorizer_appid
            ]
        ]);

        return $response;
    }

    /**
     * 获取草稿箱列表
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function getTemplateDraftList() {
        $app = self::app();
        return $app->getClient()->get('/wxa/gettemplatedraftlist')->toArray();
    }

    /**
     * 获取模板列表(普通模板)
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function getTemplateList() {
        $app = self::app();
        return $app->getClient()->get('/wxa/gettemplatelist', ['template_type' => 0])->toArray();
    }

    /**
     * 添加草稿箱到模板库(普通模板)
     * @param array $data
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function addToTemplate(array $data) {
        $app = self::app();
        return $app->getClient()->post('/wxa/addtotemplate', [
            'json' => [
                "draft_id" => $data['draft_id'],
                "template_type" => 0
            ]
        ])->toArray();
    }

    /**
     * 删除模板
     * @param string $template_id
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function deleteTemplate(string $template_id) {
        $app = self::app();
        return $app->getClient()->post('/wxa/deletetemplate', [
            'json' => [
                "template_id" => $template_id
            ]
        ])->toArray();
    }

    /**
     * 上传小程序代码
     * @param array $json
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function commitWeapp($site_id, array $json) {
        $app = CoreWeappService::app($site_id);
        return $app->getClient()->post('/wxa/commit', [
            'json' => $json
        ])->toArray();
    }

    /**
     * 提交审核
     * @param $site_id
     * @param array $json
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function submitAudit($site_id, array $json) {
        $app = CoreWeappService::app($site_id);
        return $app->getClient()->post('/wxa/submit_audit', [
            'json' => $json
        ])->toArray();
    }

    /**
     * 发布小程序
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function releaseWeapp($site_id) {
        $app = CoreWeappService::app($site_id);
        return $app->getClient()->post('/wxa/release', ['json' => []])->toArray();
    }

    /**
     * 获取隐私接口检测结果
     * @param $site_id
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function getCodePrivacyInfo($site_id) {
        $app = CoreWeappService::app($site_id);
        return $app->getClient()->get('/wxa/security/get_code_privacy_info')->toArray();
    }

    /**
     * 获取隐私接口
     * @param $site_id
     * @return array|mixed[]
     */
    public static function getPrivacySetting($site_id) {
        $app = CoreWeappService::app($site_id);
        return $app->getClient()->post('/cgi-bin/component/getprivacysetting', [
            'json' => [
                'privacy_ver' => 2
            ]
        ])->toArray();
    }

    /**
     * 设置隐私协议
     * @param $site_id
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function setPrivacySetting($site_id, $data) {
        $app = CoreWeappService::app($site_id);
        return $app->getClient()->post('/cgi-bin/component/setprivacysetting', [
            'json' => [
                'privacy_ver' => 2,
                'setting_list' => $data['setting_list'],
                'owner_setting' => $data['owner_setting'],
                'sdk_privacy_info_list' => $data['sdk_privacy_info_list'] ?? []
            ]
        ])->toArray();
    }

    /**
     * 获取服务器域名
     * @param $site_id
     * @param $data
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function getDomain($site_id) {
        $app = CoreWeappService::app($site_id);
        return $app->getClient()->post('/wxa/modify_domain_directly', [
            'json' => [
                'action' => 'get',
            ]
        ])->toArray();
    }

    /**
     * 设置域名
     * @param $site_id
     * @param $data
     * @return array|mixed[]
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public static function setDomain($site_id, $data) {
        $app = CoreWeappService::app($site_id);
        return $app->getClient()->post('/wxa/modify_domain_directly', [
            'json' => [
                'action' => 'set',
                'requestdomain' => $data['requestdomain'] ?? [],
                'wsrequestdomain' => $data['wsrequestdomain'] ?? [],
                'uploaddomain' => $data['uploaddomain'] ?? [],
                'downloaddomain' => $data['downloaddomain'] ?? [],
                'udpdomain' => $data['udpdomain'] ?? [],
                'tcpdomain' => $data['tcpdomain'] ?? [],
            ]
        ])->toArray();
    }

    /**
     * 撤回代码审核
     */
    public static function undocodeAudit($site_id) {
        $app = CoreWeappService::app($site_id);
        return $app->getClient()->get('/wxa/undocodeaudit')->toArray();
    }
}
