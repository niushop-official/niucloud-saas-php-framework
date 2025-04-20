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

namespace addon\vipcard\app\service\api\reserve;

use addon\vipcard\app\service\core\CoreReserveConfigService;
use core\base\BaseApiService;

/**
 * 预约配置
 * Class ReserveConfigService
 * @package addon\vipcard\app\service\api\reserve
 */
class ReserveConfigService extends BaseApiService
{
    /**
     * 获取配置信息
     * @return array|null
     */
    public function getReserveConfig()
    {
        return (new CoreReserveConfigService())->getReserveConfig($this->site_id);
    }

}