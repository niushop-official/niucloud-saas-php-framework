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

namespace addon\tourism\app\service\api\way;

use addon\tourism\app\service\core\way\CoreWayConfigService;
use core\base\BaseAdminService;

/**
 * 线路设置
 * Class WayConfigService
 * @package addon\tourism\app\service\admin\way
 */
class WayConfigService extends BaseAdminService
{
    /**
     * 获取线路设置
     */
    public function getConfig(){

        return (new CoreWayConfigService())->getConfig($this->site_id);
    }
}