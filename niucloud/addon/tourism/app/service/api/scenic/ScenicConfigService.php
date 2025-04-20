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

namespace addon\tourism\app\service\api\scenic;

use addon\tourism\app\service\core\scenic\CoreScenicConfigService;
use core\base\BaseAdminService;

/**
 * 景点设置
 * Class ScenicConfigService
 * @package addon\tourism\app\service\admin\scenic
 */
class ScenicConfigService extends BaseAdminService
{
    /**
     * 获取景点设置
     */
    public function getConfig(){

        return (new CoreScenicConfigService())->getConfig($this->site_id);
    }
}