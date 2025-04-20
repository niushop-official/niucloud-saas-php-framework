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
namespace addon\shop_fenxiao\app\service\admin\sale;

use addon\shop_fenxiao\app\service\core\sale\CoreSaleConfigService;
use core\base\BaseAdminService;

/**
 * 销售奖励配置
 */
class ConfigService extends BaseAdminService
{

    /**
     * 设置
     * @param array $params
     * @return bool
     */
    public function setConfig($params)
    {
        return (new CoreSaleConfigService())->setConfig($this->site_id, $params);
    }

    /**
     * 获取设置
     * @return array
     */
    public function getConfig()
    {
        return (new CoreSaleConfigService())->getConfig($this->site_id);
    }
}