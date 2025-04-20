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
use app\service\core\sys\CoreConfigService;
use app\service\core\sys\CoreSysConfigService;
use core\base\BaseCoreService;
use think\Model;

/**
 * 微信配置模型
 * Class WechatConfigService
 * @package app\service\core\wechat
 */
class CoreOplatformConfigService extends BaseCoreService
{
    /**
     * 获取微信公众号配置
     * @return array
     */
    public function getConfig(){
        $info = (new CoreConfigService())->getConfigValue(0, ConfigKeyDict::WXOPLATFORM);
        return [
            'app_id'            => $info['app_id'] ?? '',// 开放平台账号的 appid
            'app_secret'        => $info['app_secret'] ?? '',// 开放平台账号的 secret
            'token'             => $info['token'] ?? '', // 开放平台账号的 token
            'aes_key'           => $info['aes_key'] ?? '',// 明文模式请勿填写 EncodingAESKey
            'develop_app_id'    => $info['develop_app_id'] ?? '',
            'develop_upload_private_key' => $info['develop_upload_private_key'] ?? ''
        ];
    }

    /**
     * 设置微信公众号配置
     * @param int $site_id
     * @param array $data
     * @return SysConfig|bool|Model
     */
    public function setConfig(array $data){
        $config = [
            'app_id'            => $data['app_id'] ?? '',// 开放平台账号的 appid
            'app_secret'        => $data['app_secret'] ?? '',// 开放平台账号的 secret
            'token'             => $data['token'] ?? '', // 开放平台账号的 token
            'aes_key'           => $data['aes_key'] ?? '',// 明文模式请勿填写 EncodingAESKey
            'develop_app_id'    => $data['develop_app_id'] ?? '',
            'develop_upload_private_key' => $data['develop_upload_private_key'] ?? ''
        ];
        return (new CoreConfigService())->setConfig(0, ConfigKeyDict::WXOPLATFORM, $config);
    }


    /**
     *查询微信需要的静态信息
     * @return array
     */
    public function getStaticInfo(){
        $wap_domain = (new CoreSysConfigService())->getSceneDomain(0)['wap_url'] ?? '';

        return [
            'auth_serve_url' => (string)url('/adminapi/wxoplatform/server',[],'', true), // 授权事件接收配置
            'message_serve_url' => (string)url('/adminapi/wxoplatform/message/$APPID$', [],'',true), // 消息与事件接收配置
            'auth_launch_domain' => parse_url(request()->domain())['host'] ?? '', // 授权发起页域名
            'wechat_auth_domain' => parse_url($wap_domain)['host'] ?? '', // 公众号开发域名
            'upload_ip' => gethostbyname('oss.niucloud.com')
        ];
    }
}
