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

namespace app\adminapi\controller\weapp;

use app\service\admin\weapp\WeappConfigService;
use core\base\BaseAdminController;
use think\Response;

/**
 * 微信小程序配置
 * Class Config
 * @description 微信小程序配置
 * @package app\adminapi\controller\weapp
 */
class Config extends BaseAdminController
{
    /**
     * 获取微信小程序配置信息
     * @description 获取微信小程序配置信息
     * @return Response
     */
    public function get()
    {
        return success((new WeappConfigService())->getWeappConfig());
    }

    /**
     * 设置微信小程序配置信息
     * @description 设置微信小程序配置信息
     * @return Response
     */
    public function set()
    {
        $data = $this->request->params([
            ['weapp_name', ''],
            ['weapp_original', ''],
            ['app_id', ''],
            ['app_secret', ''],
            ['token', ''],
            ['encoding_aes_key', ''],
            ['qr_code', ''],
            ['encryption_type', ''],
            ['upload_private_key', '']
        ]);
        $this->validate($data, 'app\validate\channel\Weapp.set');
        (new WeappConfigService())->setWeappConfig($data);
        return success('SET_SUCCESS');
    }

    /**
     * 设置微信小程序域名
     * @description 设置微信小程序域名
     * @return Response
     */
    public function setDomain() {
        $data = $this->request->params([
            ['requestdomain', ''],
            ['wsrequestdomain', ''],
            ['uploaddomain', ''],
            ['downloaddomain', ''],
            ['udpdomain', ''],
            ['tcpdomain', '']
        ]);
        (new WeappConfigService())->setDomain($data);
        return success('SET_SUCCESS');
    }

    /**
     * 获取微信小程序隐私协议
     * @description 获取微信小程序隐私协议
     * @return Response
     */
    public function getPrivacySetting() {
        return success((new WeappConfigService())->getPrivacySetting());
    }

    /**
     * 设置微信小程序隐私协议
     * @description 设置微信小程序隐私协议
     * @return Response
     */
    public function setPrivacySetting() {
        $data = $this->request->params([
            ['setting_list', []],
            ['owner_setting', []],
            ['sdk_privacy_info_list', []]
        ]);
        (new WeappConfigService())->setPrivacySetting($data);
        return success('SET_SUCCESS');
    }
}
