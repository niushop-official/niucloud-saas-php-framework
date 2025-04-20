<?php
// +----------------------------------------------------------------------
// | Niucloud-admin 企业快速开发的多应用管理平台
// +----------------------------------------------------------------------
// | 官方网址：https://www.niucloud.com
// +----------------------------------------------------------------------
// | niucloud团队 版权所有 开源版本可自由商用
// +----------------------------------------------------------------------
// | Author: Niucloud Team
// +----------------------------------------------------------------------


namespace addon\shop_fenxiao\app\service\admin\fenxiao;


use addon\shop_fenxiao\app\service\core\fenxiao\CoreFenxiaoConfigService;
use core\base\BaseAdminService;

/**
 * 分销配置
 */
class ConfigService extends BaseAdminService
{

    /**
     * 分销设置
     * @param array $params
     * @return bool
     */
    public function setFenxiaoConfig($params)
    {
        return (new CoreFenxiaoConfigService())->setFenxiaoConfig($this->site_id, $params);
    }

    /**
     * 获取分销设置
     * @return array
     */
    public function getFenxiaoConfig()
    {
        return (new CoreFenxiaoConfigService())->getFenxiaoConfig($this->site_id);
    }

    /**
     * 获取分销海报配置
     * @return array
     */
    public function getFenxiaoPosterConfig()
    {
        return (new CoreFenxiaoConfigService())->getFenxiaoPosterConfig($this->site_id);
    }

    /**
     * 分销海报设置
     * @param array $params
     * @return true
     */
    public function setFenxiaoPosterConfig(array $params)
    {
        return (new CoreFenxiaoConfigService())->setFenxiaoPosterConfig($this->site_id, $params);
    }

}