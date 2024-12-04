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

namespace app\service\admin\wxoplatform;

use app\dict\sys\CloudDict;
use app\model\weapp\WeappVersion;
use app\service\core\wxoplatform\CoreOplatformService;
use core\base\BaseAdminService;

/**
 */
class OplatformServerService extends BaseAdminService
{
    /**
     * @return array|null
     */
    public function server()
    {
        $app = CoreOplatformService::app();
        $server = $app->getServer();

        // 授权取消
        $server->handleUnauthorized(function($message, \Closure $next) {
            $authorizer_appid = $message['AuthorizerAppid'];

            $site_id = CoreOplatformService::getSiteIdByAuthorizerAppid($authorizer_appid);
            request()->siteId($site_id);

            (new OplatformService())->clearAuthorization($authorizer_appid);
            return $next($message);
        });

        // 授权更新
        $server->handleAuthorizeUpdated(function($message, \Closure $next) {
            $authorizer_appid = $message['AuthorizerAppid'];
            $authorization_code = $message['AuthorizationCode'];

            $site_id = CoreOplatformService::getSiteIdByAuthorizerAppid($authorizer_appid);
            request()->siteId($site_id);

            (new OplatformService())->authorization(['auth_code' => $authorization_code]);

            return $next($message);
        });

        return $server->serve();
    }

    /**
     *
     * @param $appid
     * @return \Psr\Http\Message\ResponseInterface
     * @throws \EasyWeChat\Kernel\Exceptions\BadRequestException
     * @throws \EasyWeChat\Kernel\Exceptions\InvalidArgumentException
     * @throws \EasyWeChat\Kernel\Exceptions\RuntimeException
     * @throws \ReflectionException
     * @throws \Throwable
     */
    public function message($appid) {
        $app = CoreOplatformService::app();
        $server = $app->getServer();

        $site_id = CoreOplatformService::getSiteIdByAuthorizerAppid($appid);

        $server->with(function($message, \Closure $next) {
            switch ($message->Event) {
                case 'weapp_audit_success':
                    $this->weappAuditSuccess($message);
                    break;
                case 'weapp_audit_fail':
                    $this->weappAuditFail($message);
                    break;
            }
            return $next($message);
        });

        return $server->serve();
    }

    /**
     * 小程序审核通过
     * @param $message
     * @return true
     */
    private function weappAuditSuccess($message) {
        $site_id = CoreOplatformService::getSiteIdByAuthorizerAppid($message['ToUserName']);
        CoreOplatformService::releaseWeapp($site_id);
        (new WeappVersion())->where(['site_id' => $site_id, 'status' => CloudDict::APPLET_AUDITING ])->update(['status' => CloudDict::APPLET_UPLOAD_SUCCESS ]);

        // 发布后重新设置下域名
        request()->siteId($site_id);
        (new WeappVersionService())->setDomain();
        return true;
    }

    /**
     * 小程序审核未通过
     * @param $message
     * @return true
     */
    private function weappAuditFail($message) {
        $site_id = CoreOplatformService::getSiteIdByAuthorizerAppid($message['ToUserName']);
        (new WeappVersion())->where(['site_id' => $site_id, 'status' => CloudDict::APPLET_AUDITING ])->update(['status' => CloudDict::APPLET_AUDIT_FAIL, 'fail_reason' => $message['Reason'] ]);
        return true;
    }
}
