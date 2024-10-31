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

namespace app\service\core\sys;

use app\service\core\site\CoreSiteService;
use core\base\BaseCoreService;

/**
 * 配置服务层
 * Class BaseService
 * @package app\service
 */
class CoreSysConfigService extends BaseCoreService
{
    public function __construct()
    {
        parent::__construct();

    }

    /**
     * 暂用于单站点业务(不适用于命令行模式)
     * @param int $site_id
     * @return array
     */
    public function getSceneDomain(int $site_id)
    {
        $wap_domain = !empty(env("system.wap_domain")) ? preg_replace('#/$#', '', env("system.wap_domain")) : request()->domain();
        $web_domain = !empty(env("system.web_domain")) ? preg_replace('#/$#', '', env("system.web_domain")) : request()->domain();
        $site_domain = ( new CoreSiteService() )->getSiteCache($site_id)[ 'site_domain' ] ?? '';
        $service_domain = request()->domain();

        return [
            'wap_domain' => $site_domain ? ( request()->isSsl() ? "https://" : "http://" ) . $site_domain : $wap_domain,
            'wap_url' => $site_domain ? ( request()->isSsl() ? "https://" : "http://" ) . $site_domain . "/wap" : $wap_domain . "/wap/" . $site_id,
            'web_url' => $site_domain ? ( request()->isSsl() ? "https://" : "http://" ) . $site_domain . "/web" : $web_domain . "/web/" . $site_id,
            'service_domain' => $service_domain
        ];
    }

    /**
     * 获取版权信息(网站整体，不按照站点设置)
     * @return array|mixed
     */
    public function getCopyright($site_id)
    {
        $info = ( new CoreConfigService() )->getConfig($site_id, 'COPYRIGHT');
        if (empty($info)) {
            $info = [];
            $info[ 'value' ] = [
                'icp' => '',
                'gov_record' => '',
                'gov_url' => '',
                'market_supervision_url' => '',
                'logo' => '',
                'company_name' => '',
                'copyright_link' => '',
                'copyright_desc' => ''
            ];
        }
        return $info[ 'value' ];
    }

    /**
     * 获取手机端首页列表
     * @param array $data
     * @return array
     */
    public function getWapIndexList($data = [])
    {
        $result = array_filter(event("WapIndex", [ 'site_id' => $data[ 'site_id' ] ?? 0 ]));
        if (empty($result)) return [];

        $index_list = [];
        foreach ($result as $v) {
            $index_list = empty($index_list) ? $v : array_merge($index_list, $v);
        }

        foreach ($index_list as $k => $v) {
            if (!empty($data[ 'key' ]) && !in_array($v[ 'key' ], explode(',', $data[ 'key' ]))) {
                unset($index_list[ $k ]);
                continue;
            }
        }

        $index_list = array_values($index_list);
        return $index_list;
    }

    /**
     * 获取地图key
     * @param $site_id
     * @return array|mixed
     */
    public function getMap($site_id)
    {
        $info = ( new CoreConfigService() )->getConfig($site_id, 'MAPKEY');
        if (empty($info)) {
            $info = [];
            $info[ 'value' ] = [
                'is_open' => 1, // 是否开启定位
                'valid_time' => 5 // 定位有效期/分钟，过期后将重新获取定位信息，0为不过期
            ];
        }

        // 前端不展示关键信息
        if (!empty($info[ 'value' ][ 'key' ])) {
            unset($info[ 'value' ][ 'key' ]);
        }
        $info[ 'value' ][ 'is_open' ] = $info[ 'value' ][ 'is_open' ] ?? 1;
        $info[ 'value' ][ 'valid_time' ] = $info[ 'value' ][ 'valid_time' ] ?? 5;
        return $info[ 'value' ];
    }
}
