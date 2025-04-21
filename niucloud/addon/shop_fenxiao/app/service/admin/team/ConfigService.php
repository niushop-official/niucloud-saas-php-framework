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


namespace addon\shop_fenxiao\app\service\admin\team;


use addon\shop_fenxiao\app\service\core\team\CoreTeamConfigService;
use core\base\BaseAdminService;

/**
 * 团队分红配置
 */
class ConfigService extends BaseAdminService
{

    /**
     * 团队分红以及奖励设置
     * @param array $params
     * @return bool
     */
    public function setConfig($params)
    {
        return (new CoreTeamConfigService())->setConfig($this->site_id, $params);
    }

    /**
     * 获取团队分红以及奖励设置
     * @return array
     */
    public function getConfig()
    {
        return (new CoreTeamConfigService())->getConfig($this->site_id);
    }
}