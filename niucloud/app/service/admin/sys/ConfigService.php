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

namespace app\service\admin\sys;

use app\service\admin\site\SiteService;
use app\service\core\channel\CoreH5Service;
use app\service\core\sys\CoreConfigService;
use app\service\core\sys\CoreSysConfigService;
use core\base\BaseAdminService;

/**
 * 配置服务层
 * Class ConfigService
 * @package app\service\core\sys
 */
class ConfigService extends BaseAdminService
{
    //系统配置文件
    public $core_config_service;

    public function __construct()
    {
        parent::__construct();
        $this->core_config_service = new CoreConfigService();
    }

    /**
     * 获取版权信息(网站整体，不按照站点设置)
     * @return array|mixed
     */
    public function getCopyright($site_id)
    {
        return ( new CoreSysConfigService() )->getCopyright($site_id);
    }

    /**
     * 设置版权信息(整体设置，不按照站点)
     * @param array $value
     * @return bool
     */
    public function setCopyright(array $value)
    {
        $data = [
            'icp' => $value[ 'icp' ],
            'gov_record' => $value[ 'gov_record' ],
            'gov_url' => $value[ 'gov_url' ],
            'market_supervision_url' => $value[ 'market_supervision_url' ],
            'logo' => $value[ 'logo' ],
            'company_name' => $value[ 'company_name' ],
            'copyright_link' => $value[ 'copyright_link' ],
            'copyright_desc' => $value[ 'copyright_desc' ]
        ];
        return $this->core_config_service->setConfig($this->site_id, 'COPYRIGHT', $data);
    }

    /**
     * 获取网站信息
     * @return array
     */
    public function getWebSite($site_id = 0)
    {
        $site_id = $site_id != 0 ? $site_id : $this->site_id;
        $info = ( new SiteService() )->getInfo($site_id);
        $service_info = $this->getService();
        $info['site_login_logo'] = $service_info[ 'site_login_logo' ];
        $info['site_login_bg_img'] = $service_info[ 'site_login_bg_img' ];
        return $info;
    }

    /**
     * 设置网站信息
     * @return bool
     */
    public function setWebSite($data)
    {
        return ( new SiteService() )->edit($this->site_id, $data);
    }

    /**
     * 获取前端域名
     * @return array|string[]
     */
    public function getSceneDomain()
    {
        return ( new CoreSysConfigService() )->getSceneDomain($this->site_id);
    }

    /**
     * 获取服务信息
     * @return array|mixed
     */
    public function getService()
    {
        $info = ( new CoreConfigService() )->getConfig(0, 'SERVICE_INFO')[ 'value' ] ?? [];
        return [
            'wechat_code' => $info[ 'wechat_code' ] ?? '',
            'enterprise_wechat' => $info[ 'enterprise_wechat' ] ?? '',
            'site_login_logo' => $info[ 'site_login_logo' ] ?? '',
            'site_login_bg_img' => $info[ 'site_login_bg_img' ] ?? 'static/resource/images/site/login_bg.jpg',
            'tel' => $info[ 'tel' ] ?? '',
        ];
    }

    /**
     * 设置服务信息
     * @param array $value
     * @return bool
     */
    public function setService(array $value)
    {
        $data = [
            "wechat_code" => $value[ 'wechat_code' ],
            "site_login_logo" => $value[ 'site_login_logo' ],
            "site_login_bg_img" => $value[ 'site_login_bg_img' ],
            "enterprise_wechat" => $value[ 'enterprise_wechat' ],
            "tel" => $value[ 'tel' ]
        ];
        return $this->core_config_service->setConfig(0, 'SERVICE_INFO', $data);
    }

    /**
     * 设置地图key
     * @param array $value
     * @return bool
     */
    public function setMap(array $value)
    {
        $data = [
            'key' => $value[ 'key' ],
            'amap_key' => $value['amap_key'],
            'is_open' => $value[ 'is_open' ], // 是否开启定位
            'valid_time' => $value[ 'valid_time' ] // 定位有效期/分钟，过期后将重新获取定位信息，0为不过期
        ];
        if ($this->site_id == request()->defaultSiteId()) {
            ( new CoreH5Service() )->mapKeyChange($value[ 'key' ]);
        }
        return $this->core_config_service->setConfig($this->site_id, 'MAPKEY', $data);
    }

    /**
     * 获取地图key
     */
    public function getMap()
    {
        $info = ( new CoreConfigService() )->getConfig($this->site_id, 'MAPKEY');
        if (empty($info)) {
            $info = [];
            $info[ 'value' ] = [
                'key' => '',
                'amap_key' => '',
                'is_open' => 1, // 是否开启定位
                'valid_time' => 5 // 定位有效期/分钟，过期后将重新获取定位信息，0为不过期
            ];
        }

        $info[ 'value' ][ 'is_open' ] = $info[ 'value' ][ 'is_open' ] ?? 1;
        $info[ 'value' ][ 'valid_time' ] = $info[ 'value' ][ 'valid_time' ] ?? 5;
        $info[ 'value' ][ 'amap_key' ] = $info[ 'value' ][ 'amap_key' ] ?? '';

        return $info[ 'value' ];
    }

    /**
     * 获取手机端首页列表
     * @param $data
     * @return array
     */
    public function getWapIndexList($data = [])
    {
        return ( new CoreSysConfigService() )->getWapIndexList($data);
    }

    /**
     * 获取开发者key
     * @return array
     */
    public function getDeveloperToken()
    {
        return ( new CoreConfigService() )->getConfigValue(0, "DEVELOPER_TOKEN");
    }

    /**
     * 设置开发者key
     * @param array $data
     * @return array
     */
    public function setDeveloperToken(array $data)
    {
        return ( new CoreConfigService() )->setConfig(0, "DEVELOPER_TOKEN", $data);
    }

    /**
     * 获取开发者key
     * @return array
     */
    public function getLayout()
    {
        return ( new CoreConfigService() )->getConfigValue(0, "LAYOUT_SETTING");
    }

    /**
     * 设置布局风格
     * @param array $data
     * @return array
     */
    public function setLayout(array $data)
    {
        $config_service = new CoreConfigService();
        $config = $config_service->getConfigValue(0, "LAYOUT_SETTING");
        $config[ $data[ 'key' ] ] = $data[ 'value' ];
        return ( new CoreConfigService() )->setConfig(0, "LAYOUT_SETTING", $config);
    }

    /**
     * 获取色调设置
     * @return array
     */
    public function getThemeColor()
    {
        return ( new CoreConfigService() )->getConfigValue(0, "THEMECOLOR_SETTING");
    }

    /**
     * 设置色调
     * @param array $data
     * @return array
     */
    public function setThemeColor(array $data)
    {
        $config_service = new CoreConfigService();
        $config = $config_service->getConfigValue(0, "THEMECOLOR_SETTING");
        $config[ $data[ 'key' ] ] = $data[ 'value' ];
        return ( new CoreConfigService() )->setConfig(0, "THEMECOLOR_SETTING", $config);
    }


}
