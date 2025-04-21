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

namespace addon\o2o\app\service\api;

use addon\o2o\app\service\core\CoreOrderConfigService;
use core\base\BaseApiService;

/**
 * 配置服务层
 * Class ConfigService
 * @package app\service\api
 */
class ConfigService extends BaseApiService
{
    /**
     * 获取预约配置信息
     * @return Response
     */
    public function getReserveConfig(){
        return success((new CoreOrderConfigService())->getReserveConfig($this->site_id));
    }
}