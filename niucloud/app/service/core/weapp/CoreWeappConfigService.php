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

use app\dict\sys\ConfigKeyDict;
use app\model\sys\SysConfig;
use app\service\core\sys\CoreConfigService;
use core\base\BaseCoreService;
use think\Model;

/**
 * 微信小程序配置
 * Class CoreWeappConfigService
 * @package app\service\core\weapp
 */
class  CoreWeappConfigService extends BaseCoreService
{
    /**
     * 获取微信小程序设置
     * @param int $site_id
     * @return array
     */
    public function getWeappConfig(int $site_id)
    {
        $info = ( new CoreConfigService() )->getConfig($site_id, ConfigKeyDict::WEAPP)[ 'value' ] ?? [];
        return [
            'weapp_name' => $info[ 'weapp_name' ] ?? '',//小程序名称
            'weapp_original' => $info[ 'weapp_original' ] ?? '',//原始ID
            'app_id' => $info[ 'app_id' ] ?? '',//AppID
            'app_secret' => $info[ 'app_secret' ] ?? '',//AppSecret
            'qr_code' => $info[ 'qr_code' ] ?? '',//小程序二维码
            'token' => $info[ 'token' ] ?? '',
            'encoding_aes_key' => $info[ 'encoding_aes_key' ] ?? '',
            'encryption_type' => $info[ 'encryption_type' ] ?? 'not_encrypt',//加解密模式   not_encrypt 明文   compatible 兼容  safe 安全
            'upload_private_key' => $info[ 'upload_private_key' ] ?? '',
            'is_authorization' => $info[ 'is_authorization' ] ?? 0
        ];
    }

    /**
     * 微信小程序配置
     * @param int $site_id
     * @param array $data
     * @return SysConfig|bool|Model
     */
    public function setWeappConfig(int $site_id, array $data)
    {
        $old = $this->getWeappConfig($site_id);
        $config = [
            'weapp_name' => $data[ 'weapp_name' ] ?? '',//小程序名称
            'weapp_original' => $data[ 'weapp_original' ] ?? '',//原始ID
            'app_id' => $data[ 'app_id' ] ?? '',//AppID
            'app_secret' => $data[ 'app_secret' ] ?? '',//AppSecret
            'qr_code' => $data[ 'qr_code' ] ?? '',//小程序二维码
            'token' => $data[ 'token' ] ?? '',
            'encoding_aes_key' => $data[ 'encoding_aes_key' ] ?? '',
            'encryption_type' => $data[ 'encryption_type' ] ?? 'not_encrypt',//加解密模式   not_encrypt 明文   compatible 兼容  safe 安全
            'upload_private_key' => $data[ 'upload_private_key' ] ?? '',
            'is_authorization' => $data[ 'is_authorization' ] ?? $old[ 'is_authorization' ]
        ];
        return ( new CoreConfigService() )->setConfig($site_id, ConfigKeyDict::WEAPP, $config);
    }

    /**
     * 获取小程序授权信息
     * @param int $site_id
     * @return mixed
     */
    public function getWeappAuthorizationInfo(int $site_id)
    {
        return ( new CoreConfigService() )->getConfigValue($site_id, ConfigKeyDict::WEAPP_AUTHORIZATION_INFO);
    }

    /**
     * 设置小程序授权信息
     * @param int $site_id
     * @param array $config
     * @return SysConfig|bool|Model
     */
    public function setWeappAuthorizationInfo(int $site_id, array $config)
    {
        return ( new CoreConfigService() )->setConfig($site_id, ConfigKeyDict::WEAPP_AUTHORIZATION_INFO, $config);
    }
}
