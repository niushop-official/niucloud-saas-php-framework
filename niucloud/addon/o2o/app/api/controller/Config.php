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

namespace addon\o2o\app\api\controller;

use addon\o2o\app\service\admin\ConfigService;
use core\base\BaseApiController;

/**
 * 配置控制器
 * Class GoodsController
 * @package app\adminapi\controller
 */
class Config extends BaseApiController
{

    /**
     * 预约配置
     * @return \think\Response
     */
    public function getReserveConfig()
    {
        return success((new ConfigService())->getReserveConfig());
    }

}
