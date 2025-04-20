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

use app\dict\sys\ConfigKeyDict;
use app\dict\sys\WxOplatform;
use app\job\wxoplatform\WeappAuthChangeAfter;
use app\job\wxoplatform\WechatAuthChangeAfter;
use app\model\sys\SysConfig;
use app\service\core\upload\CoreFetchService;
use app\service\core\weapp\CoreWeappConfigService;
use app\service\core\wechat\CoreWechatConfigService;
use app\service\core\wxoplatform\CoreOplatformService;
use core\base\BaseAdminService;
use core\exception\CommonException;

/**
 */
class OplatformService extends BaseAdminService
{
    /**
     * @return array|null
     */
    public function createPreAuthorizationUrl()
    {
        $app = CoreOplatformService::app();
        return $app->createPreAuthorizationUrl((string)url('/site/wxoplatform/callback', [],'',true));
    }

    /**
     *
     * @param array $data
     * @return void
     * @throws \EasyWeChat\Kernel\Exceptions\BadResponseException
     * @throws \EasyWeChat\Kernel\Exceptions\HttpException
     * @throws \Symfony\Contracts\HttpClient\Exception\ClientExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\DecodingExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\RedirectionExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\ServerExceptionInterface
     * @throws \Symfony\Contracts\HttpClient\Exception\TransportExceptionInterface
     */
    public function authorization(array $data) {
        $app = CoreOplatformService::app();
        $authorization = $app->getAuthorization($data['auth_code'])->toArray();

        // 授权账号信息 授权信息
        $result = CoreOplatformService::getAuthorizerInfo($app, $authorization['authorization_info']['authorizer_appid'])->toArray();
        $authorizer_info = $result['authorizer_info'];
        $authorization_info = $result['authorization_info'];
        $result['authorization_info']['auth_code'] = $data['auth_code'];

        // 小程序
        $qrcode_dir = 'file/image/'.$this->site_id.'/'.date('Ym').'/'.date('d');
        if (isset($authorizer_info['MiniProgramInfo'])) {
            $this->weappCheck($authorizer_info, $authorization_info);

            $service = new CoreWeappConfigService();
            $service->setWeappConfig($this->site_id, [
                'weapp_name' => $authorizer_info['nick_name'],
                'weapp_original' => $authorizer_info['user_name'],
                'app_id'            => $authorization_info['authorizer_appid'],
                'qr_code' => (new CoreFetchService())->image($authorizer_info['qrcode_url'], $this->site_id, $qrcode_dir)['url'],
                'is_authorization'  => 1
            ]);
            $service->setWeappAuthorizationInfo($this->site_id, $result);

            // 授权成功之后调用
            WeappAuthChangeAfter::dispatch(['site_id' => $this->site_id, 'event' => 'authorized' ]);
        } else { // 公众号
            $this->wechatCheck($authorizer_info, $authorization_info);

            $service = new CoreWechatConfigService();
            $service->setWechatConfig($this->site_id, [
                'wechat_name' => $authorizer_info['nick_name'],
                'wechat_original' => $authorizer_info['user_name'],
                'app_id'            => $authorization_info['authorizer_appid'],
                'qr_code' => (new CoreFetchService())->image($authorizer_info['qrcode_url'], $this->site_id, $qrcode_dir)['url'],
                'is_authorization'  => 1
            ]);
            $service->setWechatAuthorizationInfo($this->site_id, $result);

            // 授权成功之后调用
            WechatAuthChangeAfter::dispatch(['site_id' => $this->site_id, 'event' => 'authorized' ]);
        }
        return true;
    }

    /**
     * 清除授权
     * @param $app_id
     * @return void
     */
    public function clearAuthorization($app_id) {
        (new SysConfig())->where([ ['value', 'like', "%{$app_id}%"], ['config_key', 'in', [
            ConfigKeyDict::WEAPP, ConfigKeyDict::WECHAT, ConfigKeyDict::WEAPP_AUTHORIZATION_INFO, ConfigKeyDict::WECHAT_AUTHORIZATION_INFO
        ] ] ])->delete();

        WechatAuthChangeAfter::dispatch(['site_id' => $this->site_id, 'event' => 'unauthorized']);
        WeappAuthChangeAfter::dispatch(['site_id' => $this->site_id, 'event' => 'unauthorized']);

        return true;
    }

    /**
     * 授权的小程序检测
     * @param $authorizer_info
     * @param $authorization_info
     * @return void
     */
    private function weappCheck($authorizer_info, $authorization_info) {
        $is_exist = (new SysConfig())->where([ ['value', 'like', "%{$authorization_info['authorizer_appid']}%"], ['config_key', '=', ConfigKeyDict::WEAPP], ['site_id', '<>', $this->site_id] ])->count();
        if ($is_exist) throw new CommonException('WEAPP_EXIST');

        if ($authorizer_info['service_type_info']['id'] != 0 || $authorizer_info['verify_type_info']['id'] == -1) throw new CommonException('请使用已认证的小程序进行授权');

        // 授权的权限
        $authority = array_map(function ($item){
            return $item['funcscope_category']['id'];
        }, $authorization_info['func_info']);

        foreach (WxOplatform::WEAPP_MUST_AUTHORITY as $k => $v) {
            if (!in_array($k, $authority)) throw new CommonException("请将{$v}的权限授权给我们");
        }
    }

    /**
     * 授权的公众号检测
     * @param $authorizer_info
     * @param $authorization_info
     * @return void
     */
    private function wechatCheck($authorizer_info, $authorization_info) {
        $is_exist = (new SysConfig())->where([ ['value', 'like', "%{$authorization_info['authorizer_appid']}%"], ['config_key', '=', ConfigKeyDict::WECHAT], ['site_id', '<>', $this->site_id] ])->count();
        if ($is_exist) throw new CommonException('WECHAT_EXIST');

        if ($authorizer_info['service_type_info']['id'] != 2 || $authorizer_info['verify_type_info']['id'] == -1) throw new CommonException('请使用已认证的服务号进行授权');

        // 授权的权限
        $authority = array_map(function ($item){
            return $item['funcscope_category']['id'];
        }, $authorization_info['func_info']);

        foreach (WxOplatform::WECHAT_MUST_AUTHORITY as $k => $v) {
            if (!in_array($k, $authority)) throw new CommonException("请将{$v}的权限授权给我们");
        }
    }
}
